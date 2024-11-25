<template>
  <div class="row q-pa-md justify-center q-gutter-md">

    <!-- view all orders card -->
    <q-card flat bordered class="q-pa-md col-12 col-md-6 full-height" v-if="selectedOrder === null">
      <q-card-section>
        <div class="font-size-responsive-lg">Order History</div>
      </q-card-section>

      <!-- filter -->
      <q-card class="q-pa-md row justify-start">
        <q-select
          filled
          v-model="selectedOrderStatus"
          :options="orderStatus"
          label="Order Status"
          @update:model-value="filterByOrderStatus"
          class="col-12 col-md-3 q-mr-md"
        />
        <q-input filled v-model="search" placeholder="Search" @update:model-value="filterBySearch" class="col-12 col-md-8" />
      </q-card>

      <q-markup-table>
        <thead>
          <tr>
            <th></th>
            <th class="text-left">ORDER ID</th>
            <th class="text-left">Returns</th>
            <th class="text-left">Customer Name</th>
            <!-- <th class="text-left">Order Type</th> -->
            <th class="text-left">Order Status</th>
            <!-- <th class="text-left">Order Date</th> -->
          </tr>
        </thead>
        <tbody v-for="(order, index) in filteredList" :key="order._id">
          <tr @click="openDetails(order)" :class="{ 'refunded': order.status === 'refunded' }">
            <td class="text-left cursor-pointer">{{ index + 1 }}</td>
            <td class="text-left cursor-pointer">{{ order._id }}</td>
            <td class="text-left cursor-pointer">{{ capitalizeFirstLetter(order.returns) }}</td>
            <td class="text-left cursor-pointer">{{ order.userFirstName }}</td>
            <!-- <td class="text-left cursor-pointer">{{ capitalizeFirstLetter(order.orderType) }}</td> -->
            <td class="text-left cursor-pointer">{{ capitalizeFirstLetter(order.status) }}</td>
            <!-- <td class="text-left cursor-pointer">{{ formatDate(order.orderDate) }}</td> -->
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <!-- log return -->
    <q-card flat bordered class="q-pa-md col-12 col-md-6 full-height" v-if="selectedOrder">
      <q-card-section>
        <div class="font-size-responsive-lg">Log Return</div>
      </q-card-section>

      <q-separator class="q-my-md" />

      <!-- filter Sunglasses -->
      <q-card-section>
        <div class="font-size-responsive-sm">Order to be refunded: {{ selectedOrder._id }}</div>
        <br>
        <div v-for="(sunglass, index) in selectedOrder.sunglassesDetails" :key="index" class="q-my-sm">
          <q-checkbox
            v-model="selectedSunglasses"
            :val="getUniqueIdentifier(sunglass._id, index)"
            :label="`${sunglass.model} (ID: ${sunglass._id}, Index: ${index})`"
            color="primary"
            @change="toggleSunglassSelection(sunglass._id, index)"
          />
        </div>
      </q-card-section>

      <q-separator class="q-my-md" />

      <div>
        <q-btn rounded dense class="q-px-md q-py-sm custom-button font-size-responsive-sm q-mr-sm" label="Close" color="primary" @click="closeDetails" style="height: 100%;" />
        <q-btn rounded dense class="q-px-md q-py-sm custom-button font-size-responsive-sm q-mr-sm" label="Log Return" @click="logReturn" style="height: 100%;" />
      </div>
    </q-card>

    <!-- return history -->
    <q-card flat bordered class="q-pa-md col-12 col-md-5 full-height" v-if="selectedReturn === null">
      <q-card-section>
        <div class="font-size-responsive-lg">Return History</div>
      </q-card-section>

      <q-markup-table>
        <thead>
          <tr>
            <th></th>
            <th class="text-left">REFUND ID</th>
            <th class="text-left">REFERENCE ORDER</th>
            <th class="text-left">Customer Name</th>
            <!-- <th class="text-left">Order Status</th> -->
          </tr>
        </thead>
        <tbody v-for="(order, index) in ordersRefunded" :key="order._id">
          <tr @click="openReturnDetails(order)">
            <td class="text-left cursor-pointer">{{ index + 1 }}</td>
            <td class="text-left cursor-pointer">{{ order._id }}</td>
            <td class="text-left cursor-pointer">{{ order.originalOrder }}</td>
            <td class="text-left cursor-pointer">{{ order.userFirstName }}</td>
            <!-- <td class="text-left cursor-pointer">{{ capitalizeFirstLetter(order.status) }}</td> -->
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <q-card flat bordered class="q-pa-md col-12 col-md-5 full-height" v-if="selectedReturn">
      <q-card-section>
        <div class="font-size-responsive-lg">Return Details</div>
      </q-card-section>

      <q-separator class="q-my-md" />

      <div>
        <q-btn rounded dense class="q-px-md q-py-sm custom-button font-size-responsive-sm q-mr-sm" label="Close" color="primary" @click="closeReturnDetails" style="height: 100%;" />
        <!-- <q-btn rounded dense class="q-px-md q-py-sm custom-button font-size-responsive-sm q-mr-sm" label="Log Return" @click="logReturn" style="height: 100%;" /> -->
      </div>
    </q-card>

  </div>
</template>

<script>
import OrderService from 'src/services/OrderService'
import UserService from 'src/services/UserService'
import Helper from 'src/services/utils'
import SunglassesService from 'src/services/SunglassesService'

export default {
  data() {
    return {
      search: '',
      orders: [],

      selectedOrder: null,
      selectedReturn: null,

      selectedSunglasses: [],

      ordersPaid: [],
      ordersPaidAndPickedup: [],
      ordersRefunded: [],

      combinedList: [],
      filteredList: [],

      selectedOrderStatus: 'All',
      orderStatus: ['All', 'Paid', 'Paid & picked up']
    }
  },
  async mounted() {
    await this.getAllOrders()
  },
  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,

    async getAllOrders() {
      const response = await OrderService.findAllOrders()
      this.orders = await Promise.all(response.map(async order => {
        const user = await UserService.findUserById(order.user)
        return {
          ...order,
          userFirstName: user.firstName,
        }
      }))
      await this.getSunglasses()
      this.ordersPaid = this.orders.filter(order => order.status === 'paid')
      this.ordersPaidAndPickedup = this.orders.filter(order => order.status === 'paid & picked up')
      this.ordersRefunded = this.orders.filter(order => order.status === 'refunded')

      this.combinedList = [...this.ordersPaid, ...this.ordersPaidAndPickedup]
      this.filteredList = this.combinedList
    },
    async getSunglasses() {
      for (const order of this.orders) {
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
    filterByOrderStatus() {
      if (this.selectedOrderStatus === 'All') {
        this.filteredList = this.combinedList
      } else if (this.selectedOrderStatus === 'Pending') {
        this.filteredList = this.ordersPending
      } else if (this.selectedOrderStatus === 'Paid') {
        this.filteredList = this.ordersPaid
      } else if (this.selectedOrderStatus === 'Paid & picked up') {
        this.filteredList = this.ordersPaidAndPickedup
      } else if (this.selectedOrderStatus === 'Refunded') {
        this.filteredList = this.ordersRefunded
      }
    },
    filterBySearch() {
      if (this.search === '') {
        this.selectedOrderStatus = 'All'
        this.filterByOrderStatus()
        return
      }
      const searchTerm = this.search.toLowerCase()
      this.filteredList = this.filteredList.filter(order =>
        order.userFirstName.toLowerCase().includes(searchTerm) ||
        order._id.toLowerCase().includes(searchTerm)
      )
    },
    getUniqueIdentifier(id, index) {
      return `${id}_${index}`
    },
    async logReturn() {
      try {
        const sunglassesToRefund = this.selectedSunglasses.map(identifier => {
          const [id] = identifier.split('_')
          return { _id: id, quantity: 1 }
        })
        // console.log(sunglassesToRefund)
        if (sunglassesToRefund) {
          this.$q.dialog({
            title: 'Refund Order', message: `You are about to refund ${sunglassesToRefund.userFirstName}'s order, continue?`, color: 'primary', cancel: true, persistent: true
          }).onOk(async () => {
            const response = await OrderService.refundOrder(this.selectedOrder._id, sunglassesToRefund)
            if (response) {
              this.$q.notify({ type: 'positive', color: 'primary', message: 'Refund successful!' })
              this.getAllOrders()
              this.selectedSunglasses = []
              this.selectedOrder = null
            } else {
              this.$q.notify({ type: 'negative', message: 'Refund failed. Please try again.' })
            }
          })

        }

      } catch (error) {
        console.error('Refund failed:', error)
      }
    },
    openDetails(order) {
      if (order.status === 'refunded' || order.returns) {
        this.$q.notify({ type: 'negative', message: 'This order has already been issued a refund.' });
        return
      }
      this.selectedOrder = order
      this.selectedSunglasses = [] // Reset selected sunglasses when a new order is selected
    },
    toggleSunglassSelection(id, index) {
      const uniqueIdentifier = this.getUniqueIdentifier(id, index)
      const indexInArray = this.selectedSunglasses.indexOf(uniqueIdentifier)
      if (indexInArray > -1) {
        this.selectedSunglasses.splice(indexInArray, 1) // Deselect if already selected
      } else {
        this.selectedSunglasses.push(uniqueIdentifier) // Select if not already selected
      }
    },
    closeDetails() {
      this.selectedOrder = null
    },

    openReturnDetails(order) {
      this.selectedReturn = order
      this.selectedSunglasses = []
    },
    closeReturnDetails() {
      this.selectedReturn = null
    }
  },
}
</script>

<style scoped>
/* Add any custom styles you need here */
</style>
