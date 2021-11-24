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
            >
              {{ header.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tag in tags"
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
    <!-- footer -->
  </div>
</template>

<script>
import TagService from '@/api/TagService'
import DropdownButton from '@/components/DropdownButton.vue'
import TagTableHeader from './TagTableHeader.vue'

export default {
  components: { TagTableHeader, DropdownButton },
  data() {
    return {
      tags: [],
      isLoading: false,
      search: null,
      headers: [
        {value: 'tag', name: 'Tag', class: 'ps-5'},
        {value: 'total', name: 'Total Images', class: 'text-center fw-normal'},
        {value: 'action', name: '', class: ''}
      ]
    }
  },
  created () {
    this.getTags()
  },
  methods: {
    async getTags () {
      this.isLoading = true
      try {
        const response = await TagService.list()
        this.tags = response.data
      } catch (error) {
        console.log(error)
      }    
      
      this.isLoading = false
    }, 
    setSearch (value) {
      this.search = value  || ''
    }
  },
}
</script>