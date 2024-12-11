<template>
  <q-page>
    <!-- constraints -->
    <div class="q-pa-md" style="width: 100%; height: 100%; background-color: #f0f0f0;">
      <div style="height: 50px;"></div>

      <!--------------------------------------------------------------------- ORDER DETAILS PANEL --------------------------------------------->
      <!-- if user has any orders -->

      <div v-if="currentOrderId !== null" class="row q-gutter-md justify-center">
        <q-card flat bordered class="col-12 col-md-6 full-height">

          <q-card-section class="q-gutter-md">
            <div class="font-size-responsive-lg">Order Details</div>
          </q-card-section>

          <q-separator  />

          <q-card-section v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0" class="q-gutter-md">
            <div v-for="sunglass in order.sunglassesDetails" :key="sunglass._id" class="row justify-start items-center cursor-pointer" @click="viewSunglassesDetails(sunglass._id)" >
              <q-item-section class="col-3 q-mr-md">
                <q-img :src="getImageUrl(sunglass.images[0].imageUrl)" alt="Sunglass Image" class="border" style="max-width: 130px; max-height: 130px;" />
              </q-item-section>
              <q-item-section class="col-8">
                <div class="font-size-responsive-md q-my-md"><b>{{ capitalizeFirstLetter(sunglass.model) }}</b></div>
                <div class="font-size-responsive-md limit-text-2 q-mb-sm">{{ capitalizeFirstLetter(sunglass.description) }}</div>
              </q-item-section>
            </div>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <q-btn rounded color="black" text-color="white" dense @click="cancelOrder(order._id)" class="q-px-lg q-py-sm custom-button font-size-responsive-md" label="Clear Cart" />
            <q-btn rounded dense flat to="/sunglasses" class="q-px-lg q-py-sm custom-button font-size-responsive-md" label="Continue Shopping" style="opacity: 0.9" />
          </q-card-section>
        </q-card>

        <!--------------------------------------------------------------------- CART SUMMARY PANEL --------------------------------------------->
        <div class="col-12 col-md-3">
          <div class="q-gutter-md">
            <q-card flat bordered>
              <q-card-section>
                <div class="font-size-responsive-lg">Cart Summary</div>
              </q-card-section>
              <q-separator />
              <div class="q-px-md">
                <q-card-section class="row items-center q-gutter-md justify-start">
                  <div class="text-caption"><b>TOTAL:</b> {{ order.totalItems }} item(s)</div>
                  <div class="text-h5">R {{ order.totalAmount }}.00</div>
                </q-card-section>
              </div>
              <q-card-section class="q-pa-none q-px-md q-pb-md">
                <q-btn rounded dense color="black" text-color="white" to="/buy/review" label="Proceed to checkout" class="q-px-lg q-py-sm custom-button font-size-responsive-md" style="width: 100%;" />
              </q-card-section>
            </q-card>
            <!-- qualities panel -->
            <q-card flat bordered class="q-pa-md">
              <q-card-section class="row items-center text-subtitle1">
                <q-icon name="credit_card" class="q-mr-md" />
                <div style="opacity: 0.9" class="">Payments made with Yoco</div>
              </q-card-section>
              <q-card-section class="row items-center text-subtitle1">
                <q-icon name="local_shipping" class="q-mr-md" />
                <div style="opacity: 0.9" class="">Fast and reliable</div>
              </q-card-section>
              <q-card-section class="row items-center text-subtitle1">
                <q-icon name="store" class="q-mr-md" />
                <div style="opacity: 0.9" class="">Pickup at our doorstep available</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!--------------------------------------------------------------------- CART IS EMPTY PANEL --------------------------------------------->
      <div v-else class="row q-py-xl justify-center full-height">
        <q-card flat bordered class="column flex-center" style="width: 300px;">
          <q-card-section>
            <div class="font-size-responsive-lg">Your cart is empty </div>
          </q-card-section>
          <q-card-section>
            <q-btn
              rounded dense
              color="black"
              text-color="white"
              to="/sunglasses"
              label="Order some stuff"
              class="q-py-sm q-px-lg custom-button font-size-responsive-md"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Helper from '../services/utils'
import UserService from 'src/services/UserService'
import OrderService from 'src/services/OrderService'
import SunglassesService from 'src/services/SunglassesService'
import Logger from 'src/services/Logger'

export default {
  data() {
    return {
      order: {},
      currentOrderId: localStorage.getItem('currentOrderId') || null,
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' }
    }
  },

  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },
    async cancelOrder(orderId) {
      this.$q.dialog({
        title: 'Confirm',
        message: `You are about to empty your cart, continue?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await OrderService.cancelOrder(orderId)
          await OrderService.deleteOrder(orderId)   // temporary to keep database clean

          localStorage.removeItem('currentOrderId')
          this.order = {}
          window.location.reload();
        } catch(error) {
          console.error(error);
        }
      }).onCancel(() => {}).onDismiss(() => {});
    },
    async getCurrentOrder() {
      if (this.currentOrderId) {
        const response = await OrderService.findOrderById(this.currentOrderId)
        this.order = response
        await this.getSunglasses()
      }
    },
    async getSunglasses() {
      if (this.order.sunglasses && this.order.sunglasses.length > 0) {
        this.order.sunglassesDetails = []
        for (const sunglass of this.order.sunglasses) {
          try {
            const response = await SunglassesService.findSunglassesById(sunglass._id)
            if (response && response.images && response.images.length > 0) {
              response.image = this.getImageUrl(response.images[0])
              this.order.sunglassesDetails.push(response)
            } else {
              console.error(`No images found for sunglasses with id ${sunglass._id}`);
            }
          } catch (error) {
            console.error(`Failed to fetch details for sunglasses with id ${sunglass._id}:`, error);
          }
        }
      }
    },
    async getUserDetails() {
        const token = await Helper.getCookie('token');
        if (token) {

          const id = await UserService.FindUserByToken()
          this.userTokenDetails = id
          const user = await UserService.findUserById(this.userTokenDetails._id)
          this.userDetails = user

          await this.getCurrentOrder()
        }
    }
  },
  created() {
    this.getUserDetails()
  },
};
</script>
