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
            >
              {{ header.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="image in filteredImages"
            :key="image.id"
          >
            <td>
              <image-table-item
                :image-url="image.image_path"
                :title="image.name"
                :file-size="5.2"
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
      headers: [
        {name: 'Name', class: 'text-center w-35 fw-normal'},
        {name: 'Tag', class: 'w-30 fw-normal'},
        {name: 'Total Tags', class: 'text-center w-15 fw-normal'},
        {name: '', class: ''}
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
      
      return this.images.slice(start, end)
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