<template>
  <div class="row justify-start flex-wrap sunglasses-grid">
    <!------------------------------------------------ LOADING SKELETON ------------------------------------------------>
    <template v-if="loading">
      <q-card
        v-for="n in skeletonCount"
        :key="'skel-' + n"
        flat
        class="sunglass-card"
      >
        <div class="sunglass-image-wrap sunglass-image-wrap--loading">
          <div class="skeleton-line skeleton-line--hero no-radius-bottom"></div>
        </div>

        <q-item class="column sunglass-info">
          <div class="row items-start justify-between full-width no-wrap">
            <div class="skeleton-line skeleton-line--md "></div>
            <div class="skeleton-line skeleton-line--sm"></div>
          </div>
        </q-item>
      </q-card>
    </template>

    <!------------------------------------------------ REAL CONTENT ------------------------------------------------>
    <template v-else>
      <q-card
        v-for="sunglass in displayedSunglasses"
        :key="sunglass._id"
        flat
        @click="viewSunglassesDetails(sunglass._id)"
        class="cursor-pointer sunglass-card"
      >
        <div class="sunglass-image-wrap relative-position">
          <q-img
            v-if="sunglass.images && sunglass.images.length > 0"
            :src="getImageUrl(sunglass.images[0].imageUrl)"
            class="product-image"
          />
        </div>

        <q-item class="column sunglass-info">
          <div class="row items-start justify-between full-width no-wrap">
            <div class="text-subtitle1 text-white text-bold sunglass-model">
              {{ sunglass.model }}
            </div>
            <div class="text-subtitle2 text-primary text-bold q-pl-sm">
              R {{ sunglass.price }}.00
            </div>
          </div>
        </q-item>
      </q-card>

      <div
        v-if="displayedSunglasses.length === 0"
        class="text-center full-width q-pa-xl text-grey"
      >
        No sunglasses found.
      </div>
    </template>
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
      loading: true,
      skeletonCount: 3
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
      try {
        const response = await SunglassesService.findAllSunglasses()
        this.sunglasses = response || []
        // once we know the count, keep skeleton matched on subsequent loads
        this.skeletonCount = Math.max(this.sunglasses.length, 1)
      } finally {
        this.loading = false
      }
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
  flex: 0 1 380px
  max-width: 420px
  transition: border-color 0.4s ease, transform 0.4s ease
  &:hover
    border-color: rgba(255, 255, 255, 0.25)
    transform: translateY(-2px)

.sunglass-image-wrap
  background-color: #f0ede6
  padding: 24px

.sunglass-image-wrap--loading
  background-color: transparent
  padding: 0

.product-image
  border-radius: 0
  transition: border-color 0.4s ease, transform 0.4s ease
  &:hover
    border-color: rgba(255, 255, 255, 0.25)
    transform: scale(1.05)

.sunglass-info
  background-color: #141414
  padding: 16px

.sunglass-model
  letter-spacing: 0.03em
  text-transform: uppercase

@media (max-width: 480px)
  .sunglass-card
    flex: 1 1 100%
    max-width: 100%
</style>
