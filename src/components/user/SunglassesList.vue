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
        class="cursor-pointer sunglass-card"
        @click="viewSunglassesDetails(sunglass._id)"
      >
        <div class="sunglass-image-wrap">
          <q-img
            v-if="sunglass.images && sunglass.images.length > 0"
            :src="getImageUrl(sunglass.images[0].imageUrl)"
            :ratio="1"
            fit="contain"
            class="product-image"
          />
          <div class="card-arrow btn-gradient-primary text-dark">
            <q-icon name="eva-arrow-forward-outline" size="18px" />
          </div>
        </div>

        <q-item class="column sunglass-info">
          <div class="row items-center justify-between full-width no-wrap">
            <div
              class="font-size-responsive-sm archivo text-light text-bold sunglass-model"
            >
              {{ sunglass.model }}
            </div>
            <div
              class="font-size-responsive-sm text-gradient-primary archivo text-bold q-pl-sm"
            >
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
    },
    // ADDED: The mode toggle ('all' or 'featured')
    mode: {
      type: String,
      default: 'all',
      validator: (value) => ['all', 'featured'].includes(value)
    },
    // ADDED: The array of model names to show when mode === 'featured'
    featuredNames: {
      type: Array,
      default: () => []
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
      let result = this.sunglasses
      // 1. If mode is 'featured', filter by the provided names array first
      if (this.mode === 'featured' && this.featuredNames.length > 0) {
        result = result.filter(sunglass =>
          this.featuredNames.includes(sunglass.model)
        )
      }

      // 2. Apply the search filter on top of the result
      if (this.search) {
        const term = this.search.toLowerCase()
        result = result.filter(sunglass =>
          sunglass.model.toLowerCase().includes(term) ||
          sunglass.description.toLowerCase().includes(term)
        )
      }

      return result
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

        // If featured mode, only load 3 skeletons. Otherwise, load actual count.
        if (this.mode === 'featured') {
          this.skeletonCount = 3
        } else {
          this.skeletonCount = Math.max(this.sunglasses.length, 1)
        }
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
  background-color: rgba(255, 255, 255, 0.03)
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 16px
  padding: 8px
  overflow: hidden

  // 3 columns with gaps
  flex: 0 0 calc(33.333% - 16px)
  max-width: none

  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease

  &:hover
    border-color: color-mix(in srgb, var(--q-primary) 60%, transparent)
    background-color: rgba(255, 255, 255, 0.05)
    transform: translateY(-4px)
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--q-primary) 25%, transparent), 0 24px 40px -20px color-mix(in srgb, var(--q-primary) 45%, transparent)

    .product-image
      transform: scale(1.06)

    .card-arrow
      opacity: 1
      transform: translateY(0)

.sunglass-image-wrap
  position: relative
  padding: 20px
  border-radius: 12px
  overflow: hidden
  // soft spotlight surface instead of a flat cream frame
  background: radial-gradient(circle at 50% 30%, #fbfbf9 0%, #e6e5e0 100%)

.sunglass-image-wrap--loading
  padding: 0
  background: transparent

.product-image
  border-radius: 0
  // the product photo's white background multiplies into the surface,
  // so the white box around the glasses disappears
  mix-blend-mode: multiply
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)

.card-arrow
  position: absolute
  right: 12px
  bottom: 12px
  width: 36px
  height: 36px
  display: flex
  align-items: center
  justify-content: center
  border-radius: 50%
  opacity: 0
  transform: translateY(8px)
  transition: opacity 0.3s ease, transform 0.3s ease

  // no hover on touch screens, so just show it
  @media (hover: none)
    opacity: 1
    transform: none

.sunglass-info
  background: transparent
  min-height: 0
  padding: 16px 8px 8px

.sunglass-model
  letter-spacing: 0.03em
  text-transform: uppercase

@media (max-width: 1023px)
  .sunglass-card
    flex: 0 0 calc(50% - 12px) // 2 per row on tablets

@media (max-width: 600px)
  .sunglass-card
    flex: 0 0 100% // 1 per row on phones
</style>
