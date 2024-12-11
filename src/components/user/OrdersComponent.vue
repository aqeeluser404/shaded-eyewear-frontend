<template>
  <q-card-section>
    <div class="text-h6 text-black">Order History</div>
  </q-card-section>

  <!--------------------------------------------------------------------- VIEW ORDER DETAILS SECTION -------------------------------------------------->
  <div v-if="orders.length > 0">

    <!-- Selected Order -->
    <div v-if="selectedOrder">
      <q-card flat bordered>
        <q-card-section class="row justify-between flex-center q-gutter-md">
          <div>
            <div class="text-subtitle1" v-if="selectedOrder.status==='paid'"><b>{{ capitalizeFirstLetter(selectedOrder.status) }} on {{ formatDate(selectedOrder.orderDate) }}</b></div>
            <div class="text-subtitle1" v-if="selectedOrder.status==='pending'"><b>{{ capitalizeFirstLetter(selectedOrder.status) }} payment, {{ formatDate(selectedOrder.orderDate) }}</b></div>
            <div class="text-subtitle1" v-if="selectedOrder.status==='paid & picked up'"><b>Collected by {{ selectedOrder.userFirstName }}</b></div>
          </div>
          <div>
            <div class="text-caption">Order ID: #{{ selectedOrder._id }}</div>
            <div class="text-caption"><b>ORDERED {{ formatDate(selectedOrder.orderDate) }}</b></div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-caption">Total Items: {{ selectedOrder.totalItems }} item(s)</div>
          <div class="text-caption">Total Amount: R {{ selectedOrder.totalAmount }}.00</div>
        </q-card-section>
        <q-card-section v-if="selectedOrder.sunglassesDetails && selectedOrder.sunglassesDetails.length > 0" class="q-gutter-md">
          <div v-for="sunglass in selectedOrder.sunglassesDetails" :key="sunglass._id" class="row items-center cursor-pointer" @click="viewSunglassesDetails(sunglass._id)">
            <q-item-section class="col-3 q-mr-md">
              <q-img :src="getImageUrl(sunglass.images[0].imageUrl)" alt="Sunglass Image" class="border" style="max-width: 100px; max-height: 100px;" />
            </q-item-section>
            <q-item-section class="col-6">
              <div class="font-size-responsive-md q-mb-sm"><b>{{ capitalizeFirstLetter(sunglass.model) }}</b> </div>
              <div class="text-caption">Item(s): 1</div>
              <div class="text-caption"><b>Price:</b> R {{ sunglass.price }}.00</div>
            </q-item-section>
          </div>
        </q-card-section>
        <q-separator v-if="selectedOrder.orderType === 'pickup'" /> 
        <div v-if="selectedOrder.orderType === 'pickup'">
          <q-card-section >
            <div class="row items-center">
              <div class="text-subtitle1 q-mr-md"><b>Pickup Location</b></div>
              <q-icon name="local_shipping" class="font-size-responsive-lg" />
            </div>
            <br>
            <div class="text-subtitle1"><b>65 Stockley Road</b></div>
            <div class="text-subtitle1">Kenwyn</div>
            <div class="text-subtitle1">Cape Town </div>
            <div class="text-subtitle1">7779</div><br>
            <div class="text-subtitle1"><b>Our store is open from 8:00 AM to 5:00 PM</b></div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="text-subtitle1 q-mb-md"><b>Pickup Instructions</b></div>
            <div class="text-subtitle1">For a smooth pickup experience, please remember to bring the order ID included in your order confirmation email. If you have any questions or need assistance, feel free to contact us. </div><br>
            <div class="text-subtitle1">Thank you for shopping with us!</div>
          </q-card-section>
        </div>
        <q-card-section class="q-gutter-sm">
          <q-btn rounded dense color="black" text-color="white" @click="closeDetails" label="Back" class="q-px-lg q-py-sm custom-button font-size-responsive-md" />
          <q-btn rounded dense color="white" text-color="black" @click="cancelOrder(selectedOrder._id)" v-if="selectedOrder.status === 'pending'" label="Cancel" class="q-px-lg q-py-sm custom-button font-size-responsive-md" />
          <q-btn rounded dense color="white" text-color="black" to="/cart" v-if="selectedOrder.status === 'pending'" label="Proceed to checkout" class="q-px-lg q-py-sm custom-button font-size-responsive-md" />
        </q-card-section>
      </q-card>
    </div>

    <!-- View all orders -->
    <div v-else class="q-gutter-md">
      <div @click="openDetails(order)" v-for="order in sortedOrders" :key="order._id" class="cursor-pointer">
        <q-card flat bordered>
          <q-card-section class="row justify-between flex-center q-gutter-md">
            <div>
              <div class="text-subtitle1" v-if="order.status==='paid'"><b>{{ capitalizeFirstLetter(order.status) }} on {{ formatDate(order.orderDate) }}</b></div>
              <div class="text-subtitle1" v-if="order.status==='pending'"><b>{{ capitalizeFirstLetter(order.status) }} payment, {{ formatDate(order.orderDate) }}</b></div>
              <div class="text-subtitle1" v-if="order.status==='paid & picked up'"><b>Collected by {{ order.userFirstName }}</b></div>
            </div>
            <div>
              <div class="text-caption">Order ID: #{{ order._id }}</div>
              <div class="text-caption"><b>ORDERED {{ formatDate(order.orderDate) }}</b></div>
            </div>
          </q-card-section>
          <q-separator  />
          <q-card-section>
            <div class="text-caption">Total Items: {{ order.totalItems }} item(s)</div>
            <div class="text-caption">Total Amount: R {{ order.totalAmount }}.00</div>
          </q-card-section>
          <q-card-section v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0">
            <q-img
              v-for="sunglass in order.sunglassesDetails"
              :key="sunglass._id"
              :src="getImageUrl(sunglass.images[0].imageUrl)"
              alt="Sunglass Image"
              class="border q-mr-md"
              style="max-width: 100px; max-height: 100px;"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

  <!--------------------------------------------------------------------- IF USER HAS NO ORDERS SECTION -------------------------------------------------->
  <div v-else>
    <q-card flat bordered class="q-py-xl">
      <q-card-section>
        You haven't ordered anything
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import UserService from 'src/services/UserService'
import OrderService from 'src/services/OrderService'
import SunglassesService from 'src/services/SunglassesService'
import Helper from 'src/services/utils'

export default {
  data() {
    return {
      orders: [],
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' },
      selectedOrder: null,
    }
  },
  computed: {
    sortedOrders() {
      return [...this.orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
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
    async getAllMyOrders() {
      if (!this.userDetails || !this.userDetails._id) {
        return
      }
      try {
        const response = await OrderService.findAllMyOrders(this.userDetails._id) || [] // Default to empty array if response is null/undefined

        this.orders = await Promise.all(
          response
          // .filter(order => order.returns !== 'returned item(s)')
          .map(async (order) => {
            const user = await UserService.findUserById(order.user).catch(() => null) // Handle user fetch errors
            return {
              ...order,
              userFirstName: user?.username || "Unknown",
            };
          })
        )
      } catch (error) {
        console.error("Error fetching orders:", error)
        this.orders = []
      }
      // this.orders = response.filter(order => order.returns !== 'returned item');
      await this.getSunglasses()
    },

    async getUserDetails() {
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
              console.error(`Failed to fetch details for sunglasses with id ${sunglass._id}:`, error)
            }
          }
        }
      }
    },
    openDetails(order) {
      this.selectedOrder = order
    },
    closeDetails() {
      this.selectedOrder = null
    }
  },
  created() {
    this.getUserDetails()
    this.getAllMyOrders()
  }
}
</script>
