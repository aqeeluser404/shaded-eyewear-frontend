<template>
  <!-- constrains -->
  <q-page>
    <div class="constrain window-height">

      <!-- =================================== SUNGLASSES DETAILS HEADER -->
      <q-card bordered flat class="column flex-center">
        <h4>Product Details</h4>
      </q-card>

      <!-- =================================== PRODUCT DETAILS -->
      <div class="row q-pa-md q-gutter-md justify-center">

        <!-- image -->
        <q-card bordered flat class="col-12 col-md-3 row justify-center full-height">
          <q-img v-if="sunglasses.images && sunglasses.images.length > 0" :src="getImageUrl(sunglasses.images[0])" class="image" />
        </q-card>

        <!-- description info -->
        <q-card bordered flat class="q-pa-md col-12 col-md-4">
          <q-card-section>
            <div class="text-h4">{{ sunglasses.model }}</div>
          </q-card-section>
          <q-card-section>
            <q-separator class="q-mb-xs" />
          </q-card-section>
          <q-card-section>
            <div class="text-h6">Product Details</div>
          </q-card-section>
          <q-card-section>
            <div>
              <b>Color</b>: {{ sunglasses.color }}
              <br>
              <b>Description</b>: {{ sunglasses.description }}
            </div>
          </q-card-section>
        </q-card>

        <!-- price and cart -->
        <q-card bordered flat class="q-pa-md col-12 col-md-3 full-height" >
          <q-card-section>
            <div class="text-h4">R {{ sunglasses.price }}.00</div>
          </q-card-section>

          <q-card-section>
            <p class="q-mb-md">Deliveries made in Cape Town</p>
            <q-separator class="q-mb-md" />
            <div class="q-mb-md"><b>ONLY {{ sunglasses.stock }} LEFT IN STOCK</b></div>
            <q-btn
              @click="addToCart"
              size="12px"
              icon="eva-plus-outline"
              label="Add to cart"
              bordered
              style="width: 100%;"
              class="q-mb-sm"
            />
            <q-btn
              v-if="currentOrderId && currentOrderId !== null"
              to="/cart"
              size="12px"
              icon="eva-shopping-cart"
              label="view cart"
              bordered
              style="width: 100%;"
            />
          </q-card-section>
        </q-card>
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
      userDetails: {},
      userTokenDetails: { _id: '', username: '', userType: '' }
    }
  },
  methods: {

    // =================================== FUNCTIONS
    async addToCart() {
      if (!this.userTokenDetails) {
        this.$q.notify({ type: 'negative', message: 'Please login to continue.' })
      } else {
        this.$q.dialog({
          title: 'Success',
          message: `You have added ${this.sunglasses.model}, to your cart!`,
          ok: 'OK'
        }).onOk(async () => {
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
        })
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
    async fetchSunglassesDetails() {
      const sunglassesId = this.$route.params.id;
      const response = await SunglassesService.findSunglassesById(sunglassesId);
      this.sunglasses = response;
    },

    async getUserDetails() {
      const id = await UserService.FindUserByToken();
      this.userTokenDetails = id;
      const user = await UserService.findUserById(this.userTokenDetails._id);
      this.userDetails = user;
    },

    getImageUrl(imagePath) {
      const serverUrl = 'http://localhost:5000/uploads/';
      // const localDir = 'C:\\Users\\TerrorX\\Downloads\\code\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\';
      const localDir = 'D:\\Work\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\';
      const relativePath = imagePath.replace(localDir, '');
      return serverUrl + relativePath;
    }
  },
  created() {
    this.getUserDetails();
    this.fetchSunglassesDetails();
    console.log('Current Order ID on created:', this.currentOrderId);
    console.log('Stored Order ID in localStorage on created:', localStorage.getItem('currentOrderId'));
  }
}
</script>


<style lang="sass" scoped>
.image
  width: 100%
</style>

