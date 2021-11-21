<template>
  <div class="card">
    <image-table-header />

    <div class="card-body table-responsive">
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
            v-for="image in images"
            :key="image.id"
          >
            <td
              class="d-flex justify-content-center"
            >
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
  </div>
</template>

<script>
import Tag from '../../../components/ImageTag.vue'
import ImageTableHeader from './ImageTableHeader.vue'
import ImageTableItem from './ImageTableItem.vue'
import ImageService from '@/api/ImageService'
export default {
  components: {
    Tag,
    ImageTableItem,
    ImageTableHeader,
  },
  data() {
    return {
      images: [],
      headers: [
        {name: 'Name', class: 'text-center w-45 fw-normal'},
        {name: 'Tag', class: 'w-25 fw-normal'},
        {name: 'Total Tags', class: 'text-center w-20 fw-normal'},
        {name: '', class: ''}
      ]
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      try {
        const response = await ImageService.list()

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
    } 
  },
}
</script>