<template>
  <q-page>
    <!------------------------------------------------------------ VIDEO HERO PANEL --------------------------------------------->
    <section>
      <div class="video-hero-wrapper">
        <video
          class="video-hero"
          :src="videoSrc"
          autoplay
          loop
          muted
          playsinline
        ></video>

        <!-- Dark gradient overlay so text is readable -->
        <div class="video-overlay"></div>

        <!-- Text Content -->
        <div
          class="full-height column justify-end items-start constrain video-content"
          :class="$q.screen.gt.sm ? 'q-px-none ' : 'q-px-md'"
        >
          <div
            class="font-size-responsive-giant archivo text-light text-bold"
            style="filter: drop-shadow(14px 6px 24px rgba(0, 0, 0, 0.9))"
          >
            OUR <span class="text-gradient-primary">CATALOGUE</span>
          </div>
          <div class="section-spacer-xs"></div>
          <p
            class="font-size-responsive-md text-light"
            style="line-height: 1.6"
          >
            Every frame is polarised, UV400-rated, and hand-checked
            <br class="break-desktop" />
            before dispatch.
          </p>

          <div class="section-spacer-sm large-screen-only"></div>
          <div class="section-spacer-xs small-screen-only"></div>

          <!-- SEARCH AND PRICE FILTER ROW -->
          <div class="row items-center full-width">
            <!-- Search -->
            <div class="col-12 col-sm-4">
              <q-input
                v-model="search"
                placeholder="Search frames"
                dense
                outlined
                dark
                class="customer-search full-width"
                :class="$q.screen.gt.sm ? 'q-pr-md' : 'q-pr-none'"
              >
                <template #prepend>
                  <q-icon name="eva-search-outline" size="18px" />
                </template>
              </q-input>
            </div>

            <!-- Price Filter -->
            <div class="col-12 col-sm-2">
              <q-select
                :class="$q.screen.gt.sm ? 'q-mt-none' : 'q-mt-sm'"
                v-model="selectedPriceRange"
                :options="priceOptions"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                dense
                borderless
                dark
                class="customer-search full-width"
                popup-content-class="period-select-menu"
                :popup-content-style="{
                  boxShadow: 'none',
                  background: '#111111',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  marginTop: '6px',
                }"
              >
                <template #prepend>
                  <div style="width: 8px"></div>
                </template>
              </q-select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!------------------------------------------------------------ PRODUCTS SECTION --------------------------------------------->
    <section class="bg-dark q-px-md text-light q-md-px-0 q-mt-sm">
      <div class="constrain">
        <div>
          <SunglassesList :sunglasses-data="filteredSunglasses" />
        </div>
      </div>
      <div class="section-spacer-md"></div>
    </section>

    <section>

    </section>
  </q-page>
</template>

<script>
import SunglassesList from "src/components/user/SunglassesList.vue";
import SunglassesService from "src/services/SunglassesService";
import Helper from "src/services/utils";
import heroVideo from "src/assets/gallery/videos/vecteezy_stylish-model-with-brown-hair-wearing-sunglasses-against-a_46780580.mp4";

export default {
  name: "SunglassesPages",

  components: {
    SunglassesList,
  },

  data() {
    return {
      search: "",
      sunglasses: [],
      videoSrc: heroVideo,

      // Price Filter Data
      selectedPriceRange: "all",
      priceOptions: [
        { label: "All Prices", value: "all" },
        { label: "Under R 1 000", value: "under-1000" },
        { label: "R 1 000 - R 1 500", value: "1000-1500" },
        { label: "R 1 500 - R 2 000", value: "1500-2000" },
        { label: "Over R 2 000", value: "over-2000" },
      ],
    };
  },

  computed: {
    filteredSunglasses() {
      let result = this.sunglasses;

      // 1. Apply Search Filter
      if (this.search) {
        const term = this.search.toLowerCase();
        result = result.filter(
          (sunglass) =>
            sunglass.model.toLowerCase().includes(term) ||
            sunglass.description.toLowerCase().includes(term)
        );
      }

      // 2. Apply Price Filter
      if (this.selectedPriceRange !== "all") {
        result = result.filter((sunglass) => {
          const price = Number(sunglass.price);
          switch (this.selectedPriceRange) {
            case "under-1000":
              return price < 1000;
            case "1000-1500":
              return price >= 1000 && price <= 1500;
            case "1500-2000":
              return price > 1500 && price <= 2000;
            case "over-2000":
              return price > 2000;
            default:
              return true;
          }
        });
      }

      return result;
    },
  },

  methods: {
    getImageUrl: Helper.getImageUrl,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },
    async fetchSunglasses() {
      const response = await SunglassesService.findAllSunglasses();
      this.sunglasses = response;
    },
  },

  created() {
    this.fetchSunglasses();
  },
};
</script>

<style lang="sass" scoped>
// ---------- VIDEO HERO ----------
.video-hero-wrapper
  position: relative
  width: 100%
  height: 50vh
  overflow: hidden
  background-color: #000000

  @media (max-width: 1023px)
    height: 40vh

.video-hero
  position: absolute
  top: 50%
  left: 50%
  min-width: 100%
  min-height: 100%
  width: auto
  height: auto
  transform: translate(-50%, -50%)
  object-fit: cover
  z-index: 0

.video-overlay
  position: absolute
  inset: -20px 0 0 0
  z-index: 1
  pointer-events: none
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), linear-gradient(to top, #000000 0%, #000000 20%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.4) 55%, rgba(0, 0, 0, 0) 85%)

.video-content
  position: relative
  z-index: 2
  width: 100%
  height: 100%
  padding-bottom: 24px

  @media (max-width: 1023px)
    padding-bottom: 20px

    p
      margin-bottom: 0

// ---------- SEARCH & FILTER ----------
.customer-search
  width: 100%

  :deep(.q-field__control)
    background-color: #121212
    border-radius: 6px
    box-shadow: none !important
    height: 40px !important
    min-height: 40px !important
    // Removed the padding hacks here

  :deep(.q-field__control:before)
    border: 1px solid rgba(255, 255, 255, 0.2) !important

  :deep(.q-field__control:hover:before)
    border-color: rgba(255, 255, 255, 0.35) !important

  :deep(.q-field__control:after)
    border-color: transparent !important
    box-shadow: none !important

  :deep(.q-field--focused .q-field__control:before)
    border-color: rgba(255, 255, 255, 0.5) !important

  :deep(.q-field__native)
    color: #f0f0f0
    padding-top: 0 !important
    padding-bottom: 0 !important

  :deep(.q-field__marginal)
    color: #9b9b9b
</style>
