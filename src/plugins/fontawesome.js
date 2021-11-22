import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faImage, faHashtag, faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

// select and import specific icons that you need
// so that the final bundled file only includes the selected icons
library.add(faImage, faHashtag, faSearch, faChevronDown, faChevronUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)