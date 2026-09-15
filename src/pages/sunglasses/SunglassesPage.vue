<template>
  <q-page>
    <section
      class="bg-dark q-px-md text-light q-md-px-0"
      style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
    >
      <div class="section-spacer-xl"></div>
      <div class="constrain">
        <div class="overline text-dimmed text-caption">CATALOGUE</div>
        <div class="row justify-between">
          <div class="font-size-responsive-giant archivo">EVERY FRAME</div>
        </div>
        <div>
          <p class="text-subtitle1 text-dimmed">
            3 frames in stock. Each one polarised, UV400 and hand-checked
            <br class="break-desktop" />
            before dispatch.
          </p>
        </div>

        <div class="section-spacer-sm"></div>
        <div>
          <SunglassesList :search="search" />
        </div>
      </div>
      <div class="section-spacer-md"></div>
    </section>

    <!------------------------------------------------------------ HERO AND SEARCH PANEL --------------------------------------------->
    <!-- <q-img src="~src/assets/cataloguepage/stock3.jpg" alt="Hero Image" class="hero-img" style="" >
      <q-card class="absolute-full column justify-center items-center">
        <div style="height: 25%;"></div>
        <p class="font-size-responsive-hero anton-regular">OUR CATALOGUE</p>
        <div style="" class="search-box">
          <q-input borderless class="bg-white  q-px-md caveat font-size-responsive-xxl"
          v-model="search" placeholder="Search sunglasses" style="border-radius: 40px; border: 3px solid white; " />
        </div>
      </q-card>
    </q-img> -->

    <!------------------------------------------------------------ PRODUCT LIST PANEL --------------------------------------------->
    <!-- <div style="background-color: #f0f0f0;">
      <div class="row q-pa-md justify-center constrain-sunglasses flex-wrap " >
        <q-list v-for="sunglass in filteredSunglasses" :key="sunglass._id" class="list-container">
          <q-card flat
            @click="viewSunglassesDetails(sunglass._id)"
            class="cursor-pointer"
            style="border-radius: 5px; "
          >
            <div>
              <q-img v-if="sunglass.images && sunglass.images.length > 0" :src="getImageUrl(sunglass.images[0].imageUrl)"
                class="product-image" style="border-radius: 25px;" />
            </div>
            <q-item class="column" style="background-color: #f0f0f0;">
              <div class="font-size-responsive-md"><b>{{ sunglass.model }} ™</b></div>
              <div class="font-size-responsive-md caveat">R {{ sunglass.price }}.00</div>
            </q-item>
          </q-card>
        </q-list>
      </div>
    </div> -->
  </q-page>
</template>

<script>
import SunglassesList from "src/components/user/SunglassesList.vue";

import SunglassesService from "src/services/SunglassesService";
import Helper from "src/services/utils";

export default {
  name: "SunglassesPages",

  data() {
    return {
      search: "",
      sunglasses: [],
    };
  },
  components: {
    SunglassesList,
  },
  computed: {
    filteredSunglasses() {
      if (!this.search) {
        return this.sunglasses;
      }
      return this.sunglasses.filter(
        (sunglass) =>
          sunglass.model.toLowerCase().includes(this.search.toLowerCase()) ||
          sunglass.description.toLowerCase().includes(this.search.toLowerCase())
      );
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

<style lang="sass">
.search-box
  width: 50%
  @media (max-width: 1024px)
    width: 100%

.hero-img
  width: 100%
  height: 75vh
  @media (max-width: 1024px)
    height: 40vh
</style>
