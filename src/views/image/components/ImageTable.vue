<template>
  <div class="card card-shadow">
    <image-table-header
      :tag-filter="tagFilter"
      @filter="setTag"
      @search="setSearch"
      @created="getImages"
    />

    <!-- Table Body -->
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
        
        <image-table-body 
          :images="filteredImages"
          @updated="getImages"
          @deleted="getImages"
        />             
      </table>
    </div>

    <!-- Table Footer (pagination) -->
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
import ImageService from '@/api/ImageService'
import ImageTableHeader from './ImageTableHeader.vue'
import Pagination from '@/components/Pagination.vue'
import ImageTableBody from './ImageTableBody.vue'

export default {
  components: {    
    ImageTableHeader,    
    ImageTableBody,
    Pagination,
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
      headers: [
        {value: 'name', name: 'Name', class: 'header-name text-center sortable'},
        {value: 'tag', name: 'Tag', class: 'header-tag fw-normal'},
        {value: 'total', name: 'Total Tags', class: 'header-total text-center fw-normal'},
        {value: 'action', name: '', class: ''}
      ]
    }
  },
  computed: {
    filteredImages () {
      const start = (this.currentPage - 1) * this.rowsPerPage
      const end = start + this.rowsPerPage
      
      return [...this.sortedImages].slice(start, end)
    },
    sortedImages () {
      return [...this.images].sort(this.compareNames)
    },
    pageCount () {
      return Math.ceil(this.images.length / this.rowsPerPage)
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
    resetPagination () {
      this.currentPage = 1
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