<template>
  <q-card-section>
    <div class="text-h6 text-black">Return History</div>
  </q-card-section>

  <!--------------------------------------------------------------------- RETURN LIST SECTION -------------------------------------------------->
  <div v-if="ordersRefunded.length > 0" >
    <div v-if="selectedReturn === null" class="q-gutter-md">
      <div class="cursor-pointer" @click="openReturnDetails(order)" v-for="order in ordersRefunded" :key="order._id">
        <q-card flat bordered>
          <q-card-section class="row justify-between flex-center q-gutter-md">
            <div>
              <div class="text-subtitle1"><b>Returned by {{ capitalizeFirstLetter(order.userFirstName) }}</b></div>
            </div>
            <div>
              <div>
                <div class="text-caption">Refund ID: #{{ order._id }}</div>
                <div class="text-caption"><b>RETURNED {{ formatDate(order.orderDate) }}</b></div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0">
              <q-img
                v-for="sunglass in order.sunglassesDetails"
                :key="sunglass._id"
                :src="getImageUrl(sunglass.images[0])"
                alt="Sunglass Image"
                class="border q-mr-md"
                style="max-width: 100px; max-height: 100px;"
              />
            </q-card-section>
        </q-card>
      </div>
    </div>

    <!--------------------------------------------------------------------- RETURN DETAILS SECTION -------------------------------------------------->
    <q-card flat bordered class=" col-12 col-md-5 full-height" v-if="selectedReturn">
      <div>
        <q-card-section class="row justify-between flex-center q-gutter-md">
          <div>
            <div class="text-subtitle1"><b>Returned by {{ capitalizeFirstLetter(selectedReturn.userFirstName) }}</b></div>
          </div>
          <div>
            <div class="text-caption">Refund ID: #{{ selectedReturn._id }}</div>
            <div class="text-caption"><b>RETURNED {{ formatDate(selectedReturn.orderDate) }}</b></div>
          </div>
        </q-card-section>
      </div>
      <q-separator />
      <div>
        <q-card-section>
          <div class="text-subtitle1"><b>Reference Order:</b> #{{ selectedReturn.originalOrder }}</div><br>
          <div class="text-caption">Total items: {{ selectedReturn.totalItems }} item(s)</div>
          <div class="text-caption">Total amount: R {{ selectedReturn.totalAmount }}.00</div>
        </q-card-section>
      </div>
      <q-separator />
      <div class="">
        <q-card-section v-if="selectedReturn.sunglassesDetails && selectedReturn.sunglassesDetails.length > 0" class="q-gutter-md">
          <div v-for="sunglass in selectedReturn.sunglassesDetails" :key="sunglass._id" class="row items-center cursor-pointer" @click="viewSunglassesDetails(sunglass._id)">
            <q-item-section class="col-3 q-mr-md">
              <q-img :src="getImageUrl(sunglass.images[0])" alt="Sunglass Image" class="border" style="max-width: 100px; max-height: 100px;" />
            </q-item-section>
            <q-item-section class="col-6">
              <div class="font-size-responsive-md q-mb-sm"><b>{{ capitalizeFirstLetter(sunglass.model) }}</b> </div>
              <div class="text-caption">Item(s): 1</div>
              <div class="text-caption"><b>Price:</b> R {{ sunglass.price }}.00</div>
            </q-item-section>
          </div>
        </q-card-section>
      </div>
      <q-card-section>
        <q-btn rounded dense class="q-px-lg q-py-sm custom-button font-size-responsive-md" label="Back" color="primary" @click="closeReturnDetails" />
      </q-card-section>
    </q-card>
  </div>

  <div v-else>
    <q-card flat bordered class="q-py-xl">
      <q-card-section>
        You haven't refunded anything
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import UserService from 'src/services/UserService'
import OrderService from 'src/services/OrderService'
import Helper from 'src/services/utils'
import SunglassesService from 'src/services/SunglassesService'

export default {
  data() {
    return {
      orders: [],
      ordersRefunded: [],
      selectedReturn: null,
      selectedSunglasses: [],
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' },
    }
  },
  async mounted() {
    await this.getUserDetails()
  },
  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },
    async getAllMyOrders() {
      const response = await OrderService.findAllMyReturns(this.userDetails._id)
      this.ordersRefunded = await Promise.all(response.map(async order => {
        const user = await UserService.findUserById(order.user);
        return {
          ...order,
          userFirstName: user.username,
        }
      }))

      await this.getSunglasses()
    },
    async getSunglasses() {
      for (const order of this.ordersRefunded) {
        if (order.sunglasses && order.sunglasses.length > 0) {
          order.sunglassesDetails = []
          for (const sunglass of order.sunglasses) {
            try {
              const response = await SunglassesService.findSunglassesById(sunglass._id)
              order.sunglassesDetails.push({ ...response, quantity: sunglass.quantity })
            } catch (error) {
              console.error(`Failed to fetch details for sunglasses with id ${sunglass._id}:`, error)
            }
          }
        }
      }
    },
    async getUserDetails() {
      const id = await UserService.FindUserByToken()
      this.userTokenDetails = id
      const user = await UserService.findUserById(this.userTokenDetails._id)
      this.userDetails = user

      // reload orders
      this.getAllMyOrders()
    },
    openReturnDetails(order) {
      this.selectedReturn = order
      this.selectedSunglasses = []
    },
    closeReturnDetails() {
      this.selectedReturn = null
    }
  }
}
</script>
