<template>
  <q-page>
    <div class="constrain">

      <q-card bordered flat class="column flex-center">
        <h4>Product Details</h4>
      </q-card>

      <div class="row q-pa-md q-gutter-md justify-center">

        <!-- image -->
        <q-card bordered flat class="col-12 col-md-3 row justify-center">
          <q-img v-if="sunglasses.images && sunglasses.images.length > 0" :src="getImageUrl(sunglasses.images[0])" class="image" />
        </q-card>

        <!-- middle -->
        <q-card bordered flat class="q-pa-md col-12 col-md-4">

          <q-card-section>
            <div class="text-h4">{{ sunglasses.model }}</div>
          </q-card-section>

          <q-separator class="q-mb-xs" style="width: 40%;" />

          <q-card-section>
            <div><b>ONLY {{ sunglasses.stock }} LEFT IN STOCK</b></div>
            <ul>
              <li>Color: {{ sunglasses.color }}</li>
              <li>Description: {{ sunglasses.description }}</li>
            </ul>
          </q-card-section>
        </q-card>

        <!-- price and cart -->
        <q-card bordered flat class="q-pa-md col-12 col-md-3">
          <q-card-section>
            <div class="text-h4">R {{ sunglasses.price }}.00</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <p>Deliveries made in Cape Town</p>
            <q-separator class="q-mb-xs" />
            <q-btn
              to="/cart"
              size="12px"
              icon="eva-shopping-cart large-screen-only"
              label="Add to cart"
              bordered
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import SunglassesService from 'src/services/SunglassesService';


export default {
  name: "SunglassesDetailsPage",

  data() {
    return {
      sunglasses: {}
    }
  },
  methods: {
    async fetchSunglassesDetails() {
      const sunglassesId = this.$route.params.id

      const response = await SunglassesService.findSunglassesById(sunglassesId)
      this.sunglasses = response
      console.log(this.sunglasses)
    },
    getImageUrl(imagePath) {
      const serverUrl = 'http://localhost:5000/uploads/';
      const localDir = 'C:\\Users\\TerrorX\\Downloads\\code\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\';
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
    this.fetchSunglassesDetails()
  }
}
</script>
