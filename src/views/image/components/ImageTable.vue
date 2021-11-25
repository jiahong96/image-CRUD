<template>
  <div class="card card-shadow">
    <image-table-header
      :tag-filter="tagFilter"
      @filter="setTag"
      @search="setSearch"
      @created="getImages"
    />

    <div
      v-show="!isLoading"
      class="card-body table-responsive p-0"
    >
      <table class="table w-100">        
        <thead>
          <tr>
            <th
              v-for="(header, i) in headers"
              :key="i"
              :class="header.class"
              scope="col"
              @click="sortBy === header.value ? sort() : {}"
            >
              {{ header.name }}
              <font-awesome-icon
                v-if="sortBy === header.value"
                :icon="['fas', sortIcon]"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="image in filteredImages"
            :key="image.id"
          >
            <td class="ps-6">
              <image-table-item
                :image-url="image.image_path"
                :title="image.name"
                :file-size="image.image_size_in_byte"
              />
            </td>
            <td> 
              <div class="row g-2">
                <div
                  v-for="(name, key) in imageTags(image.tags)"
                  :key="key"
                  class="col-auto"
                >
                  <tag                
                    :text="name"
                    @click="showTag"
                  />
                </div>
              </div>
            </td>
            <td class="text-center">
              {{ Object.keys(imageTags(image.tags)).length }}
            </td>
            <td class="text-end dropdown pe-6">
              <dropdown-button title="Actions"> 
                <template v-slot:item>
                  <li>
                    <a
                      class="dropdown-item"
                      @click="show(image.id)"
                    >View</a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      @click="edit(image)"                  
                    >Edit</a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"   
                      @click="remove(image)"               
                    >Delete</a>
                  </li>
                </template>
              </dropdown-button>
            </td> 
          </tr>
        </tbody>               
      </table>
    </div>
    <div class="card-footer bg-white border-top-0 pt-4 pb-5">
      <pagination
        :page-count="pageCount"
        :current-page="currentPage"
        @back="back"
        @next="next"
        @pageSelected="setPage"
      />
    </div>

    <image-modal-edit
      :image-id="currentImage.id || ''"
      :image-name="currentImage.name || ''"
      :is-visible.sync="showEditModal"
      @updated="getImages"
    />   

    <image-modal-delete 
      :image-id="currentImage.id || ''"
      :image-name="currentImage.name || ''"
      :is-visible.sync="showDeleteModal"
      @deleted="getImages"
    /> 
  </div>
</template>

<script>
import ImageService from '@/api/ImageService'
import Tag from '@/components/ImageTag.vue'
import DropdownButton from '@/components/DropdownButton.vue'
import ImageTableHeader from './ImageTableHeader.vue'
import ImageTableItem from './ImageTableItem.vue'
import Pagination from '@/components/Pagination.vue'
import ImageModalEdit from './ImageModalEdit.vue'
import ImageModalDelete from './ImageModalDelete.vue'

export default {
  components: {
    Tag,
    ImageTableItem,
    ImageTableHeader,
    ImageModalEdit,
    Pagination,
    DropdownButton,
    ImageModalDelete
  },
  props: {
    tagFilter: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      images: [],
      rowsPerPage: 10,
      currentPage: 1,
      search: '',
      tag: '',
      isLoading: false,
      sortDesc: true,
      sortBy: 'name',
      currentImage: {},
      showEditModal: false,
      showDeleteModal: false,
      headers: [
        {value: 'name', name: 'Name', class: 'header-name text-center sortable'},
        {value: 'tag', name: 'Tag', class: 'header-tag fw-normal'},
        {value: 'total', name: 'Total Tags', class: 'header-total text-center fw-normal'},
        {value: 'action', name: '', class: ''}
      ]
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.images.length / this.rowsPerPage)
    },    
    filteredImages () {
      const start = (this.currentPage - 1) * this.rowsPerPage
      const end = start + this.rowsPerPage
      
      return [...this.sortedImages].slice(start, end)
    },
    sortedImages () {
      return [...this.images].sort(this.compareNames)
    },
    sortIcon () {
      return this.sortDesc ? 'chevron-down' : 'chevron-up'
    }
  },
  watch: {
    tagFilter: {
      immediate: true,
      handler (newValue) {
        this.tag = newValue
      }
    },
    tag () {
      this.getImages()
    },
    search () {
      this.getImages()
    },    
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      this.resetPagination()
      this.isLoading = true

      try {
        const response = await ImageService.list(this.search, this.tag)
        this.images = response.data
      } catch (error) {
        console.log(error)
      }    
      
      this.isLoading = false
    },    
    edit (image) {
      this.currentImage = image
      this.showEditModal = true
    },
    remove (image) {
      this.currentImage = image
      this.showDeleteModal = true
    },
    imageTags (tags) {
      return tags.reduce((accumulated, currentValue) => {
        accumulated[currentValue.tag_id] = currentValue.concept_name
        return accumulated
      }, {}) || {}
    },
    show (id) {
      this.$router.push(`/image/${id}`)
    },
    showTag (name) {
      this.$router.push(`/tag/${name}`)
    },
    setTag (tag) {      
      this.tag = (tag.name || '').toLowerCase() === 'all' ? '' : tag.name
    },
    setSearch (value) {
      this.search = value || ''
    },
    sort () {    
      this.sortDesc = !this.sortDesc
    },
    compareNames (a, b) {
      const nameA = a.name.toUpperCase(); 
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return this.sortDesc ? 1 : -1;
      }
      if (nameA > nameB) {
        return this.sortDesc ? -1 : 1;
      }
  
      // names must be equal
      return 0;
    },
    next () {
      this.currentPage += 1
    },
    back () {
      this.currentPage -= 1
    },
    setPage (page) {
      this.currentPage = page
    },    
    resetPagination () {
      this.currentPage = 1
    }
  },
}
</script>

<style scoped>
th.sortable {
  pointer-events: auto;
  cursor: pointer;
}

th.header-name, th.header-tag {
  width: 35%
}

th.header-total{
  width: 15%
}
</style>