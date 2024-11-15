<template>
  <q-page>
    <div>
      <q-img src="~src/assets/stock6.jpg" alt="Hero Image" style="width: 100%; height: 75vh;" >
        <q-card class="absolute-full column justify-center items-center">
          <div style="height: 25%;"></div>
          <p class="font-size-responsive-hero anton-regular">OUR CATALOGUE</p>
          <div style="width: 50%;" class="">
            <q-input borderless class="bg-white q-pa-xs q-px-md caveat font-size-responsive-xxl" v-model="search" placeholder="Search sunglasses" style="border-radius: 25px; border: 3px solid white; " />
          </div>
        </q-card>
      </q-img>
    </div>
    <div style="background-color: #f0f0f0;">
      <div class="row q-pa-md justify-center constrain-sunglasses flex-wrap " >
      <q-list v-for="sunglass in filteredSunglasses" :key="sunglass._id" class="list-container">
        <q-card flat
          @click="viewSunglassesDetails(sunglass._id)"
          class="cursor-pointer"
          style="border-radius: 5px; "
        >
          <div>
            <q-img v-if="sunglass.images && sunglass.images.length > 0" :src="getImageUrl(sunglass.images[0])" class="product-image" style="border-radius: 25px;" />
          </div>
          <q-item class="column" style="background-color: #f0f0f0;">
            <div class="font-size-responsive-md"><b>{{ sunglass.model }} ™</b></div>
            <!-- <div class="font-size-responsive-xs">{{ capitalizeFirstLetter(sunglass.color) }}</div> -->
            <div class="font-size-responsive-sm caveat">R {{ sunglass.price }}.00</div>
          </q-item>
        </q-card>
      </q-list>
    </div>
    </div>

  </q-page>
</template>

<script>
  import Logger from 'src/services/Logger';
  import SunglassesService from 'src/services/SunglassesService';
  import Helper from 'src/services/utils';

  export default {
    name: "SunglassesPages",

    data() {
      return {
        search: '',
        sunglasses: []
      }
    },
    computed: {
      filteredSunglasses() {

        // if search box is empty, display all sunglasses
        if (!this.search) {
          return this.sunglasses;
        }
        // filter sunglasses based on search
        return this.sunglasses.filter(sunglass =>
          sunglass.model.toLowerCase().includes(this.search.toLowerCase()) ||
          sunglass.description.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
    methods: {
      getImageUrl: Helper.getImageUrl,
      capitalizeFirstLetter: Helper.capitalizeFirstLetter,
      async fetchSunglasses() {
        const response = await SunglassesService.findAllSunglasses()
        this.sunglasses = response
      },
      viewSunglassesDetails(id) {
        if(!id) {
          Logger.error("Invalid sunglasses ID")
          return
        }
        try {
          this.$router.push(`/sunglasses/view/${id}`)
        } catch (error) {
          Logger.error(error)
        }
      },

    },
    created() {
      this.fetchSunglasses()
    },
  }
</script>

<style lang="sass">

</style>
