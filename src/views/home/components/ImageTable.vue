<template>
  <div class="card rounded-3 shadow-sm">
    <image-table-header
      @filter="setTag"
      @search="setSearch"
    />

    <div class="card-body table-responsive p-0">
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
            <td class="text-center">
              <button class="btn bg-white shadow-sm">
                Actions
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer border-top-0 bg-white pt-4 pb-5 px-2">
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
import Tag from '../../../components/ImageTag.vue'
import ImageTableHeader from './ImageTableHeader.vue'
import ImageTableItem from './ImageTableItem.vue'
import ImageService from '@/api/ImageService'
import Pagination from '../../../components/Pagination.vue'

export default {
  components: {
    Tag,
    ImageTableItem,
    ImageTableHeader,
    Pagination,
  },
  data() {
    return {
      images: [],
      rowsPerPage: 10,
      currentPage: 1,
      search: '',
      tag: '',
      sortDesc: true,
      sortBy: 'name',
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
      try {
        const response = await ImageService.list(this.search, this.tag)

        this.images = response.data
      } catch (error) {
        console.log(error)
      }     
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