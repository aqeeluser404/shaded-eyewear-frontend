<template>
  <q-page>
    <div class="q-pa-md" style="width: 100%; height: 100%;">

      <div style="height: 50px;"></div>

      <!-- if user has any orders -->
      <div v-if="currentOrderId !== null" class="row q-gutter-md justify-center">
        <q-card flat bordered class="col-12 col-md-6 full-height">
          <q-card-section class="q-gutter-md ">
            <div class="text-h5">Order Details</div>
          </q-card-section>
          <q-separator class="q-mb-xs" />
          <q-card-section v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0">
            <div v-for="sunglass in order.sunglassesDetails" :key="sunglass._id" class="row items-center justify-center cursor-pointer" @click="viewSunglassesDetails(sunglass._id)" >
              <q-item-section class="col-3">
                <q-img :src="getImageUrl(sunglass.images[0])" alt="Sunglass Image" class="q-mb-sm border" style="max-width: 120px; max-height: 120px;" />
              </q-item-section>
              <q-item-section>
                <div class="text-h6">{{ sunglass.model }}</div>
                <div class="text-caption limit-text-2">Product Details: {{ sunglass.description }}</div>
                <br>

                <div class="text-caption">Color: {{ capitalizeFirstLetter(sunglass.color) }} <span class="q-ml-lg">Price: R {{ sunglass.price }}.00</span> </div>
                <br>
                <q-separator class="q-mb-xs" />
              </q-item-section>
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn flat icon="eva-trash-outline" @click="cancelOrder(order._id)" size="12px" label="Clear Cart" />
            <q-btn flat icon="eva-shopping-bag-outline" to="/sunglasses" size="12px" label="Continue Shopping" />
          </q-card-section>
        </q-card>

        <div class=" col-12 col-md-3 full-height">
          <q-card flat bordered class="q-pa-md q-mb-md">
            <q-card-section>
              <div class="text-h5 q-mb-md">Cart Summary</div>
              <div class="text-caption">
                <b>TOTAL:</b> {{ order.totalItems }} item(s)
                <span class="q-ml-lg text-h5">R{{ order.totalAmount }}.00</span>
              </div>
              <div class="q-mt-md">
                <q-btn
                  rounded dense
                  to="/buy/review"
                  size="12px"
                  label="Proceed to checkout"
                  class="q-py-sm q-px-lg"
                  style="width: 100%;"
                />
              </div>
            </q-card-section>

          </q-card>
          <q-card flat bordered class="q-pa-md">
            <q-card-section class="row items-center">
              <q-icon name="credit_card" class="q-mr-sm" />
              <div>Payments made with Yoco</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <q-icon name="local_shipping" class="q-mr-sm" />
              <div>Fast and reliable</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <q-icon name="store" class="q-mr-sm" />
              <div>Pickup at our doorstep available</div>
            </q-card-section>
          </q-card>
        </div>

      </div>
      <!-- if user has no orders -->
      <div v-else class="row q-pa-md q-gutter-md justify-center">
        <q-card flat bordered class="column flex-center q-mb-md">
          <q-card-section>
            <div class="text-h5">Your cart is empty </div>
          </q-card-section>
          <q-card-section>
            <q-btn
              rounded dense
              to="/sunglasses"
              size="12px"
              label="Order some stuff"
              class="q-py-sm q-px-lg"
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

  // beforeRouteEnter: Helper.beforeRouteEnterUser,
  data() {
    return {
      order: {},
      currentOrderId: localStorage.getItem('currentOrderId') || null,
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' }
    }
  },

  methods: {
    formatDate: Helper.formatDate,                                                        // Validation functions
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,

    // =================================== FUNCTIONS
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

    // =================================== GET DATA
    async getCurrentOrder() {
      const response = await OrderService.findOrderById(this.currentOrderId)
      this.order = response

      await this.getSunglasses()
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

    async getUserDetails() {
      try {
        const id = await UserService.FindUserByToken()
        this.userTokenDetails = id
        const user = await UserService.findUserById(this.userTokenDetails._id)
        this.userDetails = user

        // reload orders
        await this.getCurrentOrder()
      } catch (error) {
        Logger.error(error)
      }

    }
  },
  created() {
    this.getUserDetails()
  },
};
</script>
