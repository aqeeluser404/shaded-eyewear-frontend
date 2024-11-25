<template>
  <q-page>

    <div class="row justify-center flex-center" >

      <q-card flat class="q-pa-md row justify-center items-center responsive-height">
        <q-card-section :class="['col-12 col-md-4', {'q-mr-lg': $q.screen.gt.sm}]">

          <div class="column">
            <q-img
              v-if="mainImage"
              :src="getImageUrl(mainImage)"
              class="product-image"
            />
          </div>
          <div class="row justify-around" style="transform: translateY(-25px);">
            <q-img
              v-if="sunglasses.images && sunglasses.images.length > 0"
              :src="getImageUrl(sunglasses.images[0])"
              class="product-image col-3 cursor-pointer"
              :class="{'active-image': mainImage === sunglasses.images[0]}"
              @click="updateMainImage(sunglasses.images[0])"
            />
            <q-img
              v-if="sunglasses.images && sunglasses.images.length > 1"
              :src="getImageUrl(sunglasses.images[1])"
              class="product-image col-3 cursor-pointer"
              :class="{'active-image': mainImage === sunglasses.images[1]}"
              @click="updateMainImage(sunglasses.images[1])"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pa-lg col-12 col-md-4">
          <p class="q-mb-md">Deliveries made in Cape Town</p>
          <div class="text-h3"><b>{{ sunglasses.model }}</b></div>
          <br>
          <div class="text-h6">R {{ sunglasses.price }}.00</div>
          <br>
          <div class="row items-center">
            <div class="q-mr-md">
              <q-btn
                @click="addToCart" color="white" text-color="black"
                rounded dense label="Add to cart"
                class="q-py-sm q-mr-sm q-px-lg custom-button font-size-responsive-sm"
              />
              <q-btn
                v-if="currentOrderId && currentOrderId !== null"
                to="/cart" label="View cart" rounded dense color="black" text-color="white"
                class="q-py-sm q-mr-sm q-px-lg custom-button font-size-responsive-sm"
              />
            </div>
            <div>
              <div class="text-h7"><b>{{ sunglasses.stock }} in stock</b></div>
            </div>
          </div>
          <br><br>
          <!-- <q-separator class="q-mb-xs" /> -->
          <div class="font-size-responsive-xxl"><b>Product Details</b></div>
          <br>
          <div>{{ sunglasses.description }}</div>
        </q-card-section>
      </q-card>
    </div>

    <div class="column constrain-sunglasses q-pa-xl responsive-height-2">
      <div class="font-size-responsive-xxl"><b>Related Products</b></div>
      <br>
      <div class="row justify-center items-center" style="height: fit-content;">
        <q-btn flat icon="arrow_back" @click="prevSlide" class="q-mr-none q-pr-sm" />

        <div class="row justify-center" style="flex-grow: 1; max-width: 85%;">
          <div v-for="(sunglass) in visibleSunglasses" :key="sunglass._id" class="carousel-container">
            <q-card flat @click="viewSunglassesDetails(sunglass._id)" class="cursor-pointer">
              <div>
                <q-img v-if="sunglass.images && sunglass.images.length > 0" :src="getImageUrl(sunglass.images[0])" class="product-image" />
              </div>
              <q-item class="column justify-between">
                <div class="font-size-responsive-md"><b>{{ sunglass.model }} ™</b></div>
                <div class="font-size-responsive-sm caveat">R {{ sunglass.price }}.00</div>
              </q-item>
            </q-card>
          </div>
        </div>

        <q-btn flat icon="arrow_forward" @click="nextSlide" class="q-ml-none q-pl-sm" />
      </div>

    </div>

  </q-page>
</template>

<script>
import SunglassesService from 'src/services/SunglassesService';
import UserService from 'src/services/UserService';
import OrderService from 'src/services/OrderService';
import Helper from 'src/services/utils';

export default {
  name: "SunglassesDetailsPage",


  data() {
    return {

      // ORDER DATA STRUCTURE
      orderData: {
        sunglasses: [{ _id: '', quantity: 1 }],
        user: ''
      },
      currentOrderId: localStorage.getItem('currentOrderId') || null,

      // GET DATA
      sunglasses: {},
      allSunglasses: [],
      userDetails: {},
      userTokenDetails: { _id: '', username: '', userType: '' },

      // CAROUSEL
      currentSlide: 0,
      itemsPerPage: 3,

      mainImage: ''
    }
  },
  computed: {
    visibleSunglasses() {
      const start = this.currentSlide * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const totalItems = this.allSunglasses.length;

      if (totalItems <= this.itemsPerPage) {
        return this.allSunglasses;
      }

      const visibleItems = [];
      for (let i = start; i < end; i++) {
        visibleItems.push(this.allSunglasses[i % totalItems]);
      }
      return visibleItems;
    },
  },
  beforeMount() {
    this.fetchSunglassesDetails()
    this.fetchAllSunglasses()
    this.updateItemsPerPage();
    window.addEventListener('resize', this.updateItemsPerPage);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateItemsPerPage);
  },
  watch: {
    '$route.params.id': 'fetchSunglassesDetails',
    sunglasses: {
      handler(newValue) {
        if (newValue.images && newValue.images.length > 0) {
          this.mainImage = newValue.images[0];
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getImageUrl: Helper.getImageUrl,
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % Math.ceil(this.allSunglasses.length / this.itemsPerPage);
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + Math.ceil(this.allSunglasses.length / this.itemsPerPage)) % Math.ceil(this.allSunglasses.length / this.itemsPerPage);
    },
    updateItemsPerPage() {
      this.itemsPerPage = window.innerWidth <= 1024 ? 1 : 3;
    },

    async fetchAllSunglasses() {
      const response = await SunglassesService.findAllSunglasses()
      this.allSunglasses = response
    },
    async fetchSunglassesDetails() {
      const sunglassesId = this.$route.params.id;
      const response = await SunglassesService.findSunglassesById(sunglassesId);
      this.sunglasses = response;
      console.log('Sunglasses Details:', this.sunglasses);
    },
    viewSunglassesDetails(id) {
      if (!id) {
        Logger.error("Invalid sunglasses ID")
        return;
      }
      try {
        this.$router.push(`/sunglasses/view/${id}`)
        // this.$nextTick(() => {
        //   this.$forceUpdate()
        // })
      } catch (error) {
        Logger.error(error);
      }
    },

    // =================================== FUNCTIONS
    async addToCart() {
      if (!this.userTokenDetails) {
        this.$q.notify({ type: 'negative', message: 'Please login to continue.' })
      } else {
        this.$q.notify({ type: 'positive', color: 'primary', message: `Added to cart` })
        if (!this.currentOrderId) {
          console.log('No current order ID found. Creating a new order.');
          await this.createOrder();
          return;
        }
        const orderExists = await this.checkOrderExists(this.currentOrderId);
        if (orderExists) {
          await this.updateOrder();
        } else {
          await this.createOrder();
        }
        this.fetchSunglassesDetails();
      }
    },

    async checkOrderExists(orderId) {
      if (!orderId) {
        console.log('Order ID is null or undefined.');
        return false;
      }
      try {
        const response = await OrderService.findOrderById(orderId);
        return response !== null;
      } catch (error) {
        console.log('Order does not exist or an error occurred:', error);
        return false;
      }
    },

    async createOrder() {
      this.orderData.user = this.userDetails._id
      this.orderData.sunglasses[0]._id = this.sunglasses._id;
      try {
        const response = await OrderService.createOrder(this.userDetails._id, this.orderData)
        this.currentOrderId = response.order._id
        localStorage.setItem('currentOrderId', this.currentOrderId)
      }
      catch (error) {
        console.error('Error creating order: ', error)
      }
    },

    async updateOrder() {
      const orderId = this.currentOrderId;
      try {
        this.orderData.sunglasses[0]._id = this.sunglasses._id;
        await OrderService.updateOrder(orderId, this.orderData);
      }
      catch (error) {
        console.error('Error updating order:', error);
      }
    },

    // =================================== GET DATA

    async getUserDetails() {
      const id = await UserService.FindUserByToken();
      this.userTokenDetails = id;
      const user = await UserService.findUserById(this.userTokenDetails._id);
      this.userDetails = user;
    },

    updateMainImage(image) {
      this.mainImage = image;
    }
  },

  created() {
    this.getUserDetails()
    console.log('Current Order ID on created:', this.currentOrderId);
    console.log('Stored Order ID in localStorage on created:', localStorage.getItem('currentOrderId'));
  }
}
</script>


<style lang="sass" scoped>
.image
  width: 100%

.active-image
  border: 2px solid lightgrey

.responsive-height
  width: 100%
  height: 100vh
  @media (max-width: 1024px)
    height: auto

.responsive-height-2
  width: 100%
  height: 100%
  @media (max-width: 1024px)
    height: 62vh
  @media (max-width: 750px)
    height: 50vh
  @media (max-width: 600px)
    height: 40vh
  @media (max-width: 500px)
    height: 32vh

</style>

