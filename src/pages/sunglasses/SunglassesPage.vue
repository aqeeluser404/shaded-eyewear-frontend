<template>
  <!-- constrains -->
  <q-page>
    <div class="constrain window-height">

      <!-- =================================== SUNGLASSES DETAILS HEADER -->
      <q-card bordered flat class="column flex-center">
        <h4>Products</h4>
        <!-- search box -->
        <div bordered class="q-mb-md" style="width: 50%; border-radius: 2%; border: 1px solid grey; ">
          <q-input v-model="search" placeholder="Search sunglasses" />
        </div>
      </q-card>

      <!-- =================================== LIST OF SUNGLASSES -->
      <div class="row q-pa-md q-gutter-md justify-center">
        <!-- list -->
        <q-list v-for="sunglass in filteredSunglasses" :key="sunglass._id">
          <!-- sunglass card -->
          <q-card bordered flat
            @click="viewSunglassesDetails(sunglass._id)"
            class="cursor-pointer"
          >
            <!-- sunglass image -->
            <div>
              <q-img v-if="sunglass.images && sunglass.images.length > 0" :src="getImageUrl(sunglass.images[0])" class="image" />
            </div>
            <!-- sunglass details -->
            <q-item class="row justify-between ">
              <div  class="model-text">{{ sunglass.model }}</div>
              <div>R {{ sunglass.price }}.00</div>
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
