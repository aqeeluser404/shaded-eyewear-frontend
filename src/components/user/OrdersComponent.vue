<template>
  <q-card-section>
    <div class="text-h6 text-white">Your previous orders</div>
  </q-card-section>

  <q-card>

    <!-- view order details -->
    <div v-if="orders && orders !== null">
      <div v-if="selectedOrder">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle1">Order <b>#{{ selectedOrder._id }}</b> </div>
            <div class="text-caption">ORDERED {{ formatDate(selectedOrder.orderDate) }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-caption">Total Amount: R {{ selectedOrder.totalAmount }}.00</div>
            <div class="text-caption">Total Items: {{ selectedOrder.totalItems }} item(s)</div>
          </q-card-section>
          <q-separator class="" />
          <q-card-section v-if="selectedOrder.sunglassesDetails && selectedOrder.sunglassesDetails.length > 0">
            <div v-for="sunglass in selectedOrder.sunglassesDetails" :key="sunglass._id" class="row items-start cursor-pointer" @click="viewSunglassesDetails(sunglass._id)">
              <q-item-section class="col-3">
                <q-img :src="getImageUrl(sunglass.images[0])" alt="Sunglass Image" class="q-mb-sm border" style="max-width: 100px; max-height: 100px;" />
              </q-item-section>
              <q-item-section>
                <div class="text-caption">Model: {{ sunglass.model }}</div>
                <div class="text-caption">Color: {{ capitalizeFirstLetter(sunglass.color) }}</div>
                <div class="text-caption">Price: {{ sunglass.price }}</div>
              </q-item-section>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section v-if="selectedOrder.orderType === 'pickup'">
            <div class="text-h6 q-mb-md">
              <q-icon name="store" class="q-mr-md" />Pickup Location</div>
            <div class="q-md-md " >
              <p>Downtown Cape Town, Western Cape<br>
              123 Main Street<br>
              Downtown, Cape Town, 5247</p>
            </div>
            <br>
            <div class="text-h6 q-mb-md">Pickup Instructions</div>
            <p>Please bring a valid ID and your order confirmation email when you come to pick up your order. Our store is open from 9 AM to 6 PM, Monday to Saturday.</p>
          </q-card-section>
          <q-separator />
          <div class="q-pa-md q-gutter-md">
            <q-btn rounded dense @click="closeDetails" label="Back" size="12px" class="q-py-sm q-px-lg" />
            <q-btn rounded dense icon="eva-trash-outline" @click="cancelOrder(selectedOrder._id)" v-if="selectedOrder.status === 'pending'" label="Cancel Order" size="12px" class="q-py-sm q-px-lg" />
            <q-btn rounded dense to="/cart" v-if="selectedOrder.status === 'pending'" label="Proceed to checkout" size="12px" class="q-py-sm q-px-lg" />
          </div>
        </q-card>
      </div>

      <!-- all my orders in order -->
      <div v-else>
        <q-card flat @click="openDetails(order)" v-for="order in sortedOrders" :key="order._id" class="q-mb-md cursor-pointer">
          <q-card-section >
            <div class="text-subtitle1" v-if="order.status==='paid'"><b>{{ capitalizeFirstLetter(order.status) }} on {{ formatDate(order.orderDate) }}</b></div>
            <div class="text-subtitle1" v-if="order.status==='pending'"><b>{{ capitalizeFirstLetter(order.status) }} payment, {{ formatDate(order.orderDate) }}</b></div>
            <div class="text-subtitle1" v-if="order.status==='paid & picked up'"><b>Picked up on {{ formatDate(order.orderDate) }}</b></div>
            <q-separator class="q-my-sm" />
            <div class="text-caption">Total Amount: R {{ order.totalAmount }}.00</div>
            <div class="text-caption">Total Items: {{ order.totalItems }} item(s)</div>
          </q-card-section>
          <q-card-section v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0">
            <q-img
              v-for="sunglass in order.sunglassesDetails"
              :key="sunglass._id"
              :src="getImageUrl(sunglass.images[0])"
              alt="Sunglass Image"
              class="q-mr-md border"
              style="max-width: 100px; max-height: 100px;"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- if user has no orders -->
    <div v-else>You haven't ordered anything</div>
  </q-card>
</template>

<script>
import UserService from 'src/services/UserService'
import OrderService from 'src/services/OrderService'
import SunglassesService from 'src/services/SunglassesService'
import Helper from 'src/services/utils'

export default {
  data() {
    return {
      orders: [{}],
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' },
      selectedOrder: null,
    }
  },
  computed: {
    sortedOrders() {
      // The spread operator ([...]) is used to create a shallow copy of an array or object. In the context of your computed property, it ensures that you are sorting a new array rather than mutating the original orders array. This is important because computed properties should not directly modify the data they depend on.
      // const originalArray = [3, 1, 4, 1, 5];
      // const sortedArray = [...originalArray].sort((a, b) => a - b);

      // console.log(originalArray); // Output: [3, 1, 4, 1, 5]
      // console.log(sortedArray);   // Output: [1, 1, 3, 4, 5]
      return [...this.orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    }
  },
  methods: {
    formatDate: Helper.formatDate,                                                             // Validation functions
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,

    async cancelOrder(orderId) {                                                               // cancel current order function
      this.$q.dialog({
        title: 'Confirm', message: `You are about to delete your order, continue?`, cancel: true, persistent: true
      }).onOk(async () => {
        const response = await OrderService.cancelOrder(orderId)
        if (response) {
          await OrderService.deleteOrder(orderId)   // temporary to keep database clean
          localStorage.removeItem('currentOrderId')
          this.getAllMyOrders()
          this.closeDetails()
          this.$q.notify({ type: 'positive', color: 'primary', message: 'Cancel successful!' })
        } else {
          this.$q.notify({ type: 'negative', message: 'Cancel failed. Please try again.' })
        }
      })
    },
    async getAllMyOrders() {                                                                   // get all my orders function
      const response = await OrderService.findAllMyOrders(this.userDetails._id)
      this.orders = response
      await this.getSunglasses()
    },
    async getUserDetails() {                                                                  // get user by token function
      const id = await UserService.FindUserByToken()
      this.userTokenDetails = id
      const user = await UserService.findUserById(this.userTokenDetails._id)
      this.userDetails = user

      // reload orders
      this.getAllMyOrders()
    },
    async getSunglasses() {
      for (const order of this.orders) {
        if (order.sunglasses && order.sunglasses.length > 0) {
          order.sunglassesDetails = []
          for (const sunglass of order.sunglasses) {
            try {
              const response = await SunglassesService.findSunglassesById(sunglass._id)
              order.sunglassesDetails.push(response)
            } catch (error) {
              console.error(`Failed to fetch details for sunglasses with id ${sunglass._id}:`, error);
            }
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
    openDetails(order) {                                                                      // open details panel
      this.selectedOrder = order
    },
    closeDetails() {                                                                          // close details panel
      this.selectedOrder = null
    }
  },
  created() {
    this.getUserDetails()
    this.getAllMyOrders()
  }
}
</script>
