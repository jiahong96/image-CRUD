<template>
  <div class="card card-shadow">
    <tag-table-header @search="setSearch" />
    
    <div
      v-show="!isLoading"
      class="card-body table-responsive p-0"
    >
      <table class="table">
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
            v-for="tag in sortedTags"
            :key="tag.id"
          >
            <td class="ps-5">
              {{ tag.name }}
            </td>
            <td class="text-center">
              {{ tag.images_count }}
            </td>
            <td class="dropdown text-end pe-5">
              <dropdown-button title="Actions">
                <template v-slot:item>
                  <li>
                    <a
                      class="dropdown-item"
                    >View</a>
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
  </div>
</template>

<script>
import TagService from '@/api/TagService'
import DropdownButton from '@/components/DropdownButton.vue'
import TagTableHeader from './TagTableHeader.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  components: { TagTableHeader, DropdownButton, Pagination },
  data() {
    return {
      tags: [],
      isLoading: false,
      search: '',
      rowsPerPage: 10,
      currentPage: 1,
      sortDesc: true,
      sortBy: 'tag',
      headers: [
        {value: 'tag', name: 'Tag', class: 'ps-5 sortable'},
        {value: 'total', name: 'Total Images', class: 'text-center fw-normal'},
        {value: 'action', name: '', class: ''}
      ]
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.tags.length / this.rowsPerPage)
    },
    sortedTags () {
      return [...this.filteredTags].sort((a, b) => {
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
    filteredTags () {
      const start = (this.currentPage - 1) * this.rowsPerPage
      const end = start + this.rowsPerPage
      
      return this.tags.slice(start, end)
    },
    sortIcon () {
      return this.sortDesc ? 'chevron-down' : 'chevron-up'
    }
  },
  watch: {
    search () {
      this.getTags()
    },    
  },
  created () {
    this.getTags()
  },
  methods: {
    async getTags () {
      this.resetPagination()
      this.isLoading = true

      try {
        const response = await TagService.list(this.search)
        this.tags = response.data
      } catch (error) {
        console.log(error)
      }    
      
      this.isLoading = false
    }, 
    setSearch (value) {
      this.search = value  || ''
    },
    setPage (page) {
      this.currentPage = page
    },
    resetPagination () {
      this.currentPage = 1
    },
    next () {
      this.currentPage += 1
    },
    back () {
      this.currentPage -= 1
    },
    sort () {    
      this.sortDesc = !this.sortDesc
    },
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