<template>
  <div class="row q-pa-md justify-center q-gutter-md">

    <!--------------------------------------------------------------------- UPCOMING PICKUPS SECTION -------------------------------------------------->
    <q-card flat bordered class="q-pa-md col-12 col-md-6 full-height" v-if="selectedOrder === null">

      <!-- view all orders card -->
      <q-card-section>
        <div class="font-size-responsive-lg"><b>Order History</b></div>
      </q-card-section>
      <q-card class="q-pa-md row justify-between">
        <q-input filled v-model="search" placeholder="Search" @update:model-value="filterBySearch" class="col-12 col-md-12" />
      </q-card>
      <q-markup-table>
        <thead>
          <tr>
            <th></th>
            <th class="text-left">ORDER ID</th>
            <th class="text-left">Customer Username</th>
            <th class="text-left">Amount</th>
            <th class="text-left">Returns</th>
          </tr>
        </thead>
        <tbody v-for="(order, index) in filteredOrders" :key="order._id">
          <tr @click="openDetails(order)" :class="{ 'refunded': order.returns == 'returned item(s)' }">
            <td class="text-left cursor-pointer">{{ index + 1 }}</td>
            <td class="text-left cursor-pointer">{{ order._id }}</td>
            <td class="text-left cursor-pointer">{{ order.userFirstName }}</td>
            <td class="text-left cursor-pointer">R {{ order.totalAmount }}.00</td>
            <td class="text-left cursor-pointer">
              <div v-if="order.returns">
                {{ capitalizeFirstLetter(order.returns) }}
              </div>
              <div v-else>
                No Returned item(s)
              </div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <!-- log return -->
    <q-card flat bordered class="col-12 col-md-6 full-height" v-if="selectedOrder">
      <div class="q-pa-md">
        <q-card-section>
          <div class="font-size-responsive-lg"><b>Log Return</b></div>
        </q-card-section>
      </div>
      <q-separator />
      <div class="q-pa-md">
        <q-card-section>
          <div class="text-subtitle1 q-mb-md">Order to be refunded: <b>#{{ selectedOrder._id }}</b></div>
          <div v-for="(sunglass, index) in selectedOrder.sunglassesDetails" :key="index">
            <q-checkbox
              v-model="selectedSunglasses"
              :val="getUniqueIdentifier(sunglass._id, index)"
              :label="`${sunglass.model}`"
              color="primary"
              @change="toggleSunglassSelection(sunglass._id, index)"
            />
          </div>
          <br>
          <div class="text-subtitle1">
            Please note that once a refund has been processed for an order, further refunds for the same order cannot be issued unless a new order is placed.
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn rounded dense class="q-px-lg q-py-sm custom-button font-size-responsive-md q-mr-sm" label="Close" color="primary" @click="closeDetails" style="height: 100%;" />
          <q-btn rounded dense class="q-px-lg q-py-sm custom-button font-size-responsive-md q-mr-sm" icon="eva-shopping-bag-outline" label="Log Return" @click="logReturn(selectedOrder.userFirstName)" style="height: 100%;" />
        </q-card-section>
      </div>
    </q-card>

    <!--------------------------------------------------------------------- UPCOMING PICKUPS SECTION -------------------------------------------------->
    <q-card flat bordered class="q-pa-md col-12 col-md-5 full-height" v-if="selectedReturn === null">

      <!-- return history -->
      <q-card-section>
        <div class="font-size-responsive-lg"><b>Return History</b></div>
      </q-card-section>
      <q-markup-table flat v-if="ordersRefunded.length > 0">
        <thead>
          <tr>
            <th></th>
            <th class="text-left">REFUND ID</th>
            <th class="text-left">REFERENCE ORDER</th>
            <th class="text-left">Amount</th>
          </tr>
        </thead>
        <tbody v-for="(order, index) in ordersRefunded" :key="order._id">
          <tr @click="openReturnDetails(order)">
            <td class="text-left cursor-pointer">{{ index + 1 }}</td>
            <td class="text-left cursor-pointer">{{ order._id }}</td>
            <td class="text-left cursor-pointer">{{ order.originalOrder }}</td>
            <td class="text-left cursor-pointer">R {{ order.totalAmount }}.00</td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-separator v-if="ordersRefunded.length === 0" />
      <div class="q-pa-md" v-if="ordersRefunded.length === 0">
        <q-card-section  >
          No returns were made.
        </q-card-section>
      </div>
    </q-card>

    <!-- return details panel -->
    <q-card flat bordered class=" col-12 col-md-5 full-height" v-if="selectedReturn">
      <div class="q-pa-md">
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
      <div class="q-pa-md">
        <q-card-section>
          <div class="text-subtitle1"><b>Reference Order:</b> #{{ selectedReturn.originalOrder }}</div><br>
          <div class="text-caption">Total items: {{ selectedReturn.totalItems }} item(s)</div>
          <div class="text-caption">Total amount: R {{ selectedReturn.totalAmount }}.00</div>
        </q-card-section>
      </div>
      <q-separator />
      <div class="q-px-md">
        <q-card-section v-if="selectedReturn.sunglassesDetails && selectedReturn.sunglassesDetails.length > 0" class="q-gutter-md">
          <div v-for="sunglass in selectedReturn.sunglassesDetails" :key="sunglass._id" class="row items-center cursor-pointer" @click="viewSunglassesDetails(sunglass._id)">
            <q-item-section class="col-3">
              <q-img :src="getImageUrl(sunglass.images[0].imageUrl)" alt="Sunglass Image" class="border" style="max-width: 100px; max-height: 100px;" />
            </q-item-section>
            <q-item-section class="col-6">
              <div class="font-size-responsive-md q-mb-sm"><b>{{ capitalizeFirstLetter(sunglass.model) }}</b> </div>
              <div class="text-caption">Item(s): 1</div>
              <div class="text-caption"><b>Price:</b> R {{ sunglass.price }}.00</div>
            </q-item-section>
          </div>
        </q-card-section>
      </div>
      <q-separator />
      <q-card-section>
        <q-btn rounded dense class="q-px-md q-py-sm custom-button font-size-responsive-md" label="Close" color="primary" @click="closeReturnDetails" style="width: 100%; height: 100%;" />
      </q-card-section>
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
      ordersRefunded: [],
      currentOrders: [],
      filteredOrders: [], // Define filteredOrders to hold search results
      selectedOrderStatus: 'All',
    }
  },
  async mounted() {
    await this.getAllOrders()
  },
  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },
    async getAllOrders() {
      try {
        const response = await OrderService.findAllOrders();

        // Add user details to all orders
        this.orders = await Promise.all(response.map(async order => {
          const user = await UserService.findUserById(order.user);
          return {
            ...order,
            userFirstName: user.username,
          }
        }))

        await this.getSunglasses();

        // Filter orders based on status and return criteria
        const filteredOrders = this.orders.filter(order => order.status === 'paid & picked up' || order.status === 'refunded')
        this.currentOrders = filteredOrders.filter(order => order.status === 'paid & picked up' || order.returns === 'returned item(s)' )
        this.ordersRefunded = filteredOrders.filter(order => order.status === 'refunded');

        // Initialize filteredOrders to currentOrders
        this.filteredOrders = this.currentOrders;

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
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
    filterBySearch() {
      if (this.search === '') {
        this.filteredOrders = this.currentOrders
        return
      }
      const searchTerm = this.search.toLowerCase();

      // Reset filteredList to combinedList before applying the search filter
      this.filteredOrders = this.currentOrders.filter(order =>
        order.userFirstName.toLowerCase().includes(searchTerm) ||
        order._id.toLowerCase().includes(searchTerm) ||
        order.totalAmount.toString().includes(searchTerm)
      );
    },

    getUniqueIdentifier(id, index) {
      return `${id}_${index}`
    },
    async logReturn(firstName) {
      try {
        const sunglassesToRefund = this.selectedSunglasses.map(identifier => {
          const [id] = identifier.split('_')
          return { _id: id, quantity: 1 }
        })
        // console.log(sunglassesToRefund)
        if (this.selectedSunglasses == '') {
          this.$q.notify({ type: 'negative', message: 'Choose a pair of sunglasses to refund.' })
        } else {
          this.$q.dialog({
            title: 'Refund Order', message: `You are about to refund ${firstName}'s order, continue?`, color: 'primary', cancel: true, persistent: true
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
      this.selectedReturn = null
      this.selectedSunglasses = []
    },
    toggleSunglassSelection(id, index) {
      const uniqueIdentifier = this.getUniqueIdentifier(id, index)
      const indexInArray = this.selectedSunglasses.indexOf(uniqueIdentifier)
      if (indexInArray > -1) {
        this.selectedSunglasses.splice(indexInArray, 1)
      } else {
        this.selectedSunglasses.push(uniqueIdentifier)
      }
    },
    closeDetails() {
      this.selectedOrder = null
    },
    openReturnDetails(order) {
      this.selectedReturn = order
      this.selectedOrder = null,
      this.selectedSunglasses = []
    },
    closeReturnDetails() {
      this.selectedReturn = null
    }
  },
}
</script>
