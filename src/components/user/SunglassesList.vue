<template>
  <div class="row justify-start flex-wrap sunglasses-grid">
    <template v-if="!loading">
      <q-card
        v-for="(sunglass, index) in displayedSunglasses"
        :key="sunglass._id"
        flat
        @click="viewSunglassesDetails(sunglass._id)"
        class="cursor-pointer sunglass-card"
      >
        <!-- Image panel -->
        <div class="sunglass-image-wrap relative-position">
          <q-badge class="sunglass-index" rounded>
            {{ String(index + 1).padStart(2, '0') }}
          </q-badge>
          <q-img
            v-if="sunglass.images && sunglass.images.length > 0"
            :src="getImageUrl(sunglass.images[0].imageUrl)"
            class="product-image"
          />
        </div>

        <!-- Info bar -->
        <q-item class="column sunglass-info">
          <div class="row items-start justify-between full-width no-wrap">
            <div class="text-subtitle1 text-white text-bold sunglass-model">
              {{ sunglass.model }}
            </div>
            <div class="text-subtitle2 text-primary text-bold q-pl-sm">
              R {{ sunglass.price }}.00
            </div>
          </div>
          <!-- <div class="text-caption text-dimmed q-mt-xs">
            {{ sunglass.description }}
          </div> -->
        </q-item>
      </q-card>

      <div v-if="displayedSunglasses.length === 0" class="text-center full-width q-pa-xl text-grey">
        No sunglasses found.
      </div>
    </template>

    <div v-else class="full-width flex flex-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>
  </div>
</template>

<script>
import SunglassesService from 'src/services/SunglassesService'
import Helper from 'src/services/utils'

export default {
  name: 'SunglassesList',

  props: {
    search: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      sunglasses: [],
      loading: true
    }
  },

  computed: {
    filteredSunglasses() {
      if (!this.search) {
        return this.sunglasses
      }
      const term = this.search.toLowerCase()
      return this.sunglasses.filter(sunglass =>
        sunglass.model.toLowerCase().includes(term) ||
        sunglass.description.toLowerCase().includes(term)
      )
    },
    displayedSunglasses() {
      if (this.limit) {
        return this.filteredSunglasses.slice(0, this.limit)
      }
      return this.filteredSunglasses
    }
  },

  methods: {
    getImageUrl: Helper.getImageUrl,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router)
    },
    async fetchSunglasses() {
      this.loading = true
      const response = await SunglassesService.findAllSunglasses()
      this.sunglasses = response || []
      this.loading = false
    }
  },

  created() {
    this.fetchSunglasses()
  }
}
</script>

<style lang="sass" scoped>
.sunglasses-grid
  gap: 24px

.sunglass-card
  background: transparent
  border-radius: 4px
  overflow: hidden
  flex: 0 1 380px   // grow up to ~3 per row inside constrain, shrink+wrap below that
  max-width: 420px

.sunglass-image-wrap
  background-color: #f0ede6
  padding: 24px

.product-image
  border-radius: 0

.sunglass-index
  position: absolute
  top: 12px
  left: 12px
  z-index: 1
  background-color: rgba(0, 0, 0, 0.55)
  color: #fff
  font-size: 0.7rem
  padding: 4px 10px

.sunglass-info
  background-color: #141414
  padding: 16px

.sunglass-model
  letter-spacing: 0.03em
  text-transform: uppercase

// Below ~420px-per-card width the flex-basis math forces a wrap naturally,
// but on very small phones let cards take the full row width
@media (max-width: 480px)
  .sunglass-card
    flex: 1 1 100%
    max-width: 100%
</style>
