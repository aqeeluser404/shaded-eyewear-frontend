<template>
  <q-page>
    <!------------------------------------------------------------ IMAGES + DUO IMAGES PANEL --------------------------------------------->
    <div class="row justify-center flex-center" >
      <q-card flat class="row justify-center items-center responsive-height">
        <q-card-section :class="['col-12 col-md-4', {'q-mr-xl': $q.screen.gt.sm}]">
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

        <!------------------------------------------------------------ PRODUCT DETAILS PANEL --------------------------------------------->
        <div class="col-12 col-md-4">

          <q-card-section class="font-size-responsive-md">Deliveries made in Cape Town</q-card-section>

          <q-card-section class="q-gutter-md">
            <div class="text-h3"><b>{{ sunglasses.model }}</b></div>
            <div class="text-h5">R {{ sunglasses.price }}.00</div>
          </q-card-section>

          <q-card-section class="row items-center q-gutter-md">
            <div class="">
              <q-btn
                @click="addToCart" color="white" text-color="black"
                rounded dense label="Add to cart"
                class="q-mr-sm q-py-sm q-px-lg custom-button font-size-responsive-md"
              />
              <q-btn
                v-if="currentOrderId && currentOrderId !== null"
                @click="navigateToCart" label="View cart" rounded dense color="black" text-color="white"
                class="q-py-sm q-px-lg custom-button font-size-responsive-md"
              />
            </div>
            <div>
              <div class="text-caption"><b>{{ sunglasses.stock }} in stock</b></div>
            </div>
          </q-card-section>
          <br>
          <q-card-section>
            <div class="font-size-responsive-xxl"><b>Product Details</b></div>
            <br>
            <div class="text-subtitle1">{{ sunglasses.description }}</div>
          </q-card-section>
        </div>
      </q-card>
    </div>
    <br><br>
    <!------------------------------------------------------------ RELATED PRODUCTS PANEL --------------------------------------------->
    <div class="column constrain-sunglasses responsive-height-2">
      <q-card-section>
        <div class="font-size-responsive-xxl"><b>Related Products</b></div>
      </q-card-section>

      <q-card-section class="row justify-center items-center" style="height: fit-content;">

        <q-btn flat icon="arrow_back" @click="prevSlide" class="q-mr-none q-pr-sm" />

        <div class="row justify-center" style="flex-grow: 1; max-width: 85%;">
          <div v-for="(sunglass) in visibleSunglasses" :key="sunglass._id" class="carousel-container">

            <q-card flat @click="viewSunglassesDetails(sunglass._id)" class="cursor-pointer">
              <div>
                <q-img v-if="sunglass.images && sunglass.images.length > 0" :src="getImageUrl(sunglass.images[0])"
                  class="product-image" />
              </div>
              <q-item class="column justify-between">
                <div class="font-size-responsive-md"><b>{{ sunglass.model }} ™</b></div>
                <div class="font-size-responsive-md caveat">R {{ sunglass.price }}.00</div>
              </q-item>
            </q-card>

          </div>
        </div>

        <q-btn flat icon="arrow_forward" @click="nextSlide" class="q-ml-none q-pl-sm" />
      </q-card-section>
    </div>
  </q-page>
</template>

<script>
import SunglassesService from 'src/services/SunglassesService';
import UserService from 'src/services/UserService';
import OrderService from 'src/services/OrderService';
import Helper from 'src/services/utils';
import CryptoJS from 'crypto-js'

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
    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },
    navigateToCart() {
      this.$router.push('/cart');
    },
    getImageUrl: Helper.getImageUrl,
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % Math.ceil(this.allSunglasses.length / this.itemsPerPage)
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + Math.ceil(this.allSunglasses.length / this.itemsPerPage)) % Math.ceil(this.allSunglasses.length / this.itemsPerPage)
    },
    updateItemsPerPage() {
      this.itemsPerPage = window.innerWidth <= 1024 ? 1 : 3;
    },
    async fetchAllSunglasses() {
      const response = await SunglassesService.findAllSunglasses()
      this.allSunglasses = response
    },
    async fetchSunglassesDetails() {
      const encryptedId = this.$route.params.id
      const decryptedBytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedId), 'secret-key');
      const decryptedId = decryptedBytes.toString(CryptoJS.enc.Utf8);

      const response = await SunglassesService.findSunglassesById(decryptedId)
      this.sunglasses = response;
    },
    async addToCart() {
      if (!this.userTokenDetails._id) {
        this.$q.notify({ type: 'negative', message: 'Please login to continue.' })
      } else {
        this.$q.notify({ type: 'positive', color: 'primary', message: `Added to cart` })
        if (!this.currentOrderId) {
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
        return false;
      }
      try {
        const response = await OrderService.findOrderById(orderId);
        return response !== null;
      } catch (error) {
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
    async getUserDetails() {
      const token = Helper.getCookie('token')
      if(token) {
        const id = await UserService.FindUserByToken();
        this.userTokenDetails = id;
        const user = await UserService.findUserById(this.userTokenDetails._id);
        this.userDetails = user;
      }
    },
    updateMainImage(image) {
      this.mainImage = image;
    }
  },
  created() {
    this.getUserDetails()
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

