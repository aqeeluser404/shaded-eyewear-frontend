<template>
  <q-page>
    <div class="constrain">

      <q-card bordered flat class="q-pa-md column flex-center">
        <h4>Products</h4>

        <!-- search box -->
        <div bordered style="width: 50%; border-radius: 2%; border: 1px solid grey; ">
          <q-input v-model="search" placeholder="Search sunglasses" />
        </div>

      </q-card>

      <!-- list of sunglasses -->
      <div class="row q-pa-md q-gutter-md justify-center">
        <q-list v-for="sunglass in filteredSunglasses" :key="sunglass._id">

          <q-card bordered flat>
            <q-card-section
              @click="viewSunglassesDetails(sunglass._id)"
              class="q-gutter-sm cursor-pointer"
            >
              <div><q-img v-if="sunglass.images && sunglass.images.length > 0" :src="getImageUrl(sunglass.images[0])" class="image" /></div>
              <div>{{ sunglass.model }}</div>
              <div>{{ sunglass.description }}</div>
            </q-card-section>
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
        if (!this.search) {
          return this.sunglasses;
        }
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
        const localDir = 'C:\\Users\\TerrorX\\Downloads\\code\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\';

        const relativePath = imagePath.replace(localDir, '');
        return serverUrl + relativePath;
      }
    },
    created() {
      this.fetchSunglasses()
    }
  }
</script>
