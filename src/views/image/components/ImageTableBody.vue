<template>
  <tbody>
    <tr
      v-for="image in images"
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
                class="dropdown-item btn"
                role="button"
                @click="show(image.id)"
              >View</a>
            </li>
            <li>
              <a
                class="dropdown-item btn"
                role="button"
                @click="edit(image)"                  
              >Edit</a>
            </li>
            <li>
              <a
                class="dropdown-item btn"
                role="button"   
                @click="remove(image)"               
              >Delete</a>
            </li>
          </template>
        </dropdown-button>
      </td> 
    </tr>

    <!-- Edit & Delete Modals -->
    <image-modal-edit
      :image-id="currentImage.id || ''"
      :image-name="currentImage.name || ''"
      :is-visible.sync="showEditModal"
      @updated="updated"
    />   
    <image-modal-delete 
      :image-id="currentImage.id || ''"
      :image-name="currentImage.name || ''"
      :is-visible.sync="showDeleteModal"
      @deleted="deleted"
    />
  </tbody>
</template>

<script>
import Tag from '@/components/ImageTag.vue'
import DropdownButton from '@/components/DropdownButton.vue'
import ImageTableItem from './ImageTableItem.vue'
import ImageModalEdit from './ImageModalEdit.vue'
import ImageModalDelete from './ImageModalDelete.vue'

export default {
  components: {
    Tag,
    DropdownButton,
    ImageTableItem,
    ImageModalEdit,
    ImageModalDelete
  },
  props: {
    images: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      showEditModal: false,
      showDeleteModal: false,
      currentImage: {},
    }
  },
  methods: {
    showTag (name) {
      this.$router.push(`/tag/${name}`)
    },
    edit (image) {
      this.currentImage = image
      this.showEditModal = true
    },
    remove (image) {
      this.currentImage = image
      this.showDeleteModal = true
    },    
    show (id) {
      this.$router.push(`/image/${id}`)
    },    
    updated () {
      this.$emit('updated')
    },
    deleted () {
      this.$emit('deleted')
    },
    imageTags (tags) {
      return tags.reduce((accumulated, currentValue) => {
        accumulated[currentValue.tag_id] = currentValue.concept_name
        return accumulated
      }, {}) || {}
    },
  },
}
</script>