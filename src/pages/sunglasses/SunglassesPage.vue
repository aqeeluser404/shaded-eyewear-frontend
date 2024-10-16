<template>
  <q-page>
    <div>                                                                                               <!---------------- SUNGLASSES DETAILS HEADER ----------------->
      <q-img
        src="~src/assets/stock2-copy.png"
        alt="Hero Image"
        style="width: 100%; height: 50vh;"
      >
        <q-card class="absolute-full column justify-center items-center">
          <p class="font-size-responsive-hero anton-regular">OUR CATALOGUE</p>                                                                                   <!-- title -->
          <div style="width: 50%;">                                                                            <!-- search box -->
            <q-input borderless class="bg-white q-pa-xs q-px-md caveat font-size-responsive-xxl" v-model="search" placeholder="Search sunglasses" style="border-radius: 25px; border: 3px solid white; " />
          </div>
        </q-card>
      </q-img>
    </div>

    <div class="row q-pa-md q-gutter-md justify-center">                                                  <!---------------- FILTER SUNGLASSES ----------------->
      <q-list v-for="sunglass in filteredSunglasses" :key="sunglass._id">                                                               <!-- list -->
        <q-card bordered flat
          @click="viewSunglassesDetails(sunglass._id)"
          class="cursor-pointer"
        >                                                                                                                               <!-- sunglass card -->
          <div>                                                                                                                         <!-- sunglass image -->
            <q-img v-if="sunglass.images && sunglass.images.length > 0" :src="getImageUrl(sunglass.images[0])" class="image" />
          </div>
          <q-item class="row justify-between ">                                                                                          <!-- sunglass details -->
            <div  class="model-text">{{ sunglass.model }}</div>
            <div>R {{ sunglass.price }}.00</div>
          </q-item>
        </q-card>
      </q-list>
    </div>
  </q-page>
</template>

<script>
  import Logger from 'src/services/Logger';
  import SunglassesService from 'src/services/SunglassesService';

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
      getImageUrl(imagePath) {
        const serverUrl = 'http://localhost:5000/uploads/';
        // const localDir = 'C:\\Users\\TerrorX\\Downloads\\code\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\';
        const localDir = 'D:\\Work\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\';
        const relativePath = imagePath.replace(localDir, '');
        return serverUrl + relativePath;
      }
      // getImageUrl(imagePath) {
      //   // replace this with hosted url
      //   const serverUrl = 'http://localhost:5000/uploads/';
      //   return serverUrl + imagePath;
      // }
    },
    created() {
      this.fetchSunglasses()
    },
  }
</script>

<style lang="sass">

</style>
