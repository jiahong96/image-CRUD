<template>
  <nav>
    <ul class="pagination justify-content-center mb-0">
      <li :class="{'page-item': true, 'disabled': isPageOne || !validPageCount}">
        <a
          class="page-link"
          href="#"
          tabindex="-1"
          @click="onPrevious"
        >Previous</a>
      </li>
      <li
        v-for="i in visiblePages"
        :key="i"
        :class="{'page-item': true, 'active': i === currentPage}"
      >
        <a
          class="page-link"
          href="#"
          @click="onPageClick(i)"
        >{{ i }}</a>
      </li>      
      <li :class="{'page-item': true, 'disabled': isLastPage || !validPageCount}">
        <a
          class="page-link"
          href="#"
          @click="onNext"
        >Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pageCount: {
      type: Number,
      required: true 
    },
    currentPage: {
      type: Number,
      default: 1
    },
    visiblePageCount: {
      type: Number,
      default: 5
    },
  },
  computed: {
    isPageOne () {
      return  this.currentPage === 1 
    },
    isLastPage () {
      return  this.currentPage === this.pageCount 
    },
    validPageCount () {
      return this.pageCount > 0
    },
    visiblePages () {
      let pages = [];

      let half = Math.floor(this.visiblePageCount / 2);
      let start = this.currentPage - half + 1 - this.visiblePageCount % 2;
      let end = this.currentPage + half;

      let visibleCount = this.visiblePageCount;
      if (visibleCount > this.pageCount) {
        visibleCount = this.pageCount;
      }

      // handle boundary case
      if (start <= 0) {
        start = 1;
        end = visibleCount;
      }
      if (end > this.pageCount) {
        start = this.pageCount - visibleCount + 1;
        end = this.pageCount;
      }

      let itPage = start;
      while (itPage <= end) {
        pages.push(itPage);
        itPage++;
      }

      return pages
    }
  },
  methods: {
    onPrevious () {
      this.$emit('back')
    },
    onNext () {
      this.$emit('next')
    },
    onPageClick (page) {
      this.$emit('pageSelected', page)
    },
  },
}
</script>