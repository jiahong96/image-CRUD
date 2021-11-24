<template>
  <div class="card card-shadow">
    <image-table-header
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
            v-for="image in sortedImages"
            :key="image.id"
          >
            <td>
              <image-table-item
                :image-url="image.image_path"
                :title="image.name"
                :file-size="image.image_size_in_byte"
              />
            </td>
            <td> 
              <tag
                v-for="(name, key) in imageTags(image.tags)"
                :key="key"
                :text="name"
              />
            </td>
            <td class="text-center">
              {{ Object.keys(imageTags(image.tags)).length }}
            </td>
            <td class="text-center dropdown">
              <button
                class="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                Actions
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item"
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
                  >Delete</a>
                </li>
              </ul>
            </td> 
          </tr>
        </tbody>

        <image-modal-edit
          :image-id="currentImage.id || ''"
          :image-name="currentImage.name || ''"
          :is-visible.sync="showEditModal"
          @updated="getImages"
        />           
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
  </div>
</template>

<script>
import Tag from '@/components/ImageTag.vue'
import ImageTableHeader from './ImageTableHeader.vue'
import ImageTableItem from './ImageTableItem.vue'
import ImageService from '@/api/ImageService'
import Pagination from '@/components/Pagination.vue'
import ImageModalEdit from '../../../components/ImageModalEdit.vue'

export default {
  components: {
    Tag,
    ImageTableItem,
    ImageTableHeader,
    Pagination,
    ImageModalEdit,
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
      headers: [
        {value: 'name', name: 'Name', class: 'text-center w-35 sortable'},
        {value: 'tag', name: 'Tag', class: 'w-30 fw-normal'},
        {value: 'total', name: 'Total Tags', class: 'text-center w-15 fw-normal'},
        {value: 'action', name: '', class: ''}
      ]
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.images.length / this.rowsPerPage)
    },
    sortedImages () {
      return [...this.filteredImages].sort((a, b) => {
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
      })
    },
    filteredImages () {
      const start = (this.currentPage - 1) * this.rowsPerPage
      const end = start + this.rowsPerPage
      
      return this.images.slice(start, end)
    },
    sortIcon () {
      return this.sortDesc ? 'chevron-down' : 'chevron-up'
    }
  },
  watch: {
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
    imageTags (tags) {
      return tags.reduce((accumulated, currentValue) => {
        accumulated[currentValue.tag_id] = currentValue.concept_name
        return accumulated
      }, {}) || {}
    },
    setTag (tag) {
      this.resetPagination()
      this.tag = (tag.name || '').toLowerCase() === 'all' ? '' : tag.name
    },
    setSearch (value) {
      this.resetPagination()
      this.search = value || ''
    },
    sort () {    
      this.sortDesc = !this.sortDesc
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
  outline: 0;
}
</style>