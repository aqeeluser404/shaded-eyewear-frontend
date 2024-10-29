<template>
  <q-page>

    <div class="row justify-center flex-center" >

    <q-card flat class="q-pa-md row justify-center items-center" style="width: 100%; height: 102vh;" >

      <q-card-section class="q-mr-lg col-md-4">
        <div class="column">
          <q-img
            v-if="mainImage"
            :src="getImageUrl(mainImage)"
            class="product-image"
          />
        </div>
        <div class="row justify-around" style="border: 1px solid grey;">
          <q-img
            v-if="sunglasses.images && sunglasses.images.length > 0"
            :src="getImageUrl(sunglasses.images[0])"
            class="product-image col-4 cursor-pointer"
            @click="updateMainImage(sunglasses.images[0])"
          />
          <q-img
            v-if="sunglasses.images && sunglasses.images.length > 1"
            :src="getImageUrl(sunglasses.images[1])"
            class="product-image col-4 cursor-pointer"
            @click="updateMainImage(sunglasses.images[1])"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pa-lg col-md-3">
        <p class="q-mb-md">Deliveries made in Cape Town</p>
        <div class="text-h3"><b>{{ sunglasses.model }}</b></div>
        <br>
        <div class="text-h6">R {{ sunglasses.price }}.00</div>
        <br>
        <div class="row items-center">
          <div class="q-mr-md">
            <q-btn
              v-if="currentOrderId && currentOrderId !== null"
              to="/cart" label="view cart" rounded dense size="12px"
              class=" q-py-sm q-px-lg"
            />
            <q-btn
              @click="addToCart" rounded dense label="Add to cart" size="12px"
              class=" q-py-sm q-px-lg"
            />
          </div>
          <div>
            <div class="text-h7"><b>{{ sunglasses.stock }} in stock</b></div>
          </div>
        </div>
        <br>
        <!-- <q-separator class="q-mb-xs" /> -->
        <div class="text-h6">Product Details</div>
        <br>
        <div>{{ sunglasses.description }}</div>
      </q-card-section>
    </q-card>
    </div>

    <div class="column constrain-sunglasses">
      <div class="text-h4"><b>Related Products</b></div>
      <div class="row q-pa-md justify-center items-center"  >
        <q-btn flat icon="arrow_back" @click="prevSlide" class="q-mr-sm" />
        <div class="row q-pa-md justify-center" style="width: 85%;">
          <div v-for="(sunglass) in visibleSunglasses" :key="sunglass._id" class="carousel-container">
            <q-card flat @click="viewSunglassesDetails(sunglass._id)" class="cursor-pointer">
              <div>
                <q-img style="border: 1px dotted grey;" v-if="sunglass.images && sunglass.images.length > 0" :src="getImageUrl(sunglass.images[0])" class="product-image" />
              </div>
              <q-item class="row justify-between">
                <div class="model-text"><b>{{ sunglass.model }}</b></div>
                <div>R {{ sunglass.price }}.00</div>
              </q-item>
            </q-card>
          </div>
        </div>
        <q-btn flat icon="arrow_forward" @click="nextSlide" class="q-ml-sm" />
      </div>
    </div>

  </q-page>
</template>

<script>
import SunglassesService from 'src/services/SunglassesService';
import UserService from 'src/services/UserService';
import OrderService from 'src/services/OrderService';

export default {
  name: "SunglassesDetailsPage",

  data() {
    return {

      // ORDER DATA STRUCTURE
      orderData: {
        sunglasses: [{ _id: '', quantity: 1 }],
        user: ''
      },
      orderTypeData: { priceThreshold: 1200 },
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
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % Math.ceil(this.allSunglasses.length / this.itemsPerPage);
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + Math.ceil(this.allSunglasses.length / this.itemsPerPage)) % Math.ceil(this.allSunglasses.length / this.itemsPerPage);
    },
    updateItemsPerPage() {
      this.itemsPerPage = window.innerWidth <= 600 ? 1 : 3;
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
        const response = await OrderService.createOrder(this.userDetails._id, this.orderData, this.orderTypeData)
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
        await OrderService.updateOrder(orderId, this.orderData, this.orderTypeData);
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

    getImageUrl(imagePath) {
      const serverUrl = 'http://localhost:5000/uploads/'
      // const localDir = 'C:\\Users\\TerrorX\\Downloads\\code\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\'
      // const localDir = 'D:\\Work\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\'
      const localDir = 'C:\\Users\\TerrorX\\Downloads\\WLV\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\'
      const relativePath = imagePath.replace(localDir, '')
      return serverUrl + relativePath
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
</style>

