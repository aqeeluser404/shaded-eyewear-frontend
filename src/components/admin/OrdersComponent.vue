<template>
  <div class="row q-pa-md justify-center q-gutter-md">

    <q-card class="q-pa-md col-12 col-md-3 full-height">
      <q-card-section>
        <div class="text-h6">Upcoming Pickups</div>
      </q-card-section>

      <q-card v-for="order in ordersPickup" :key="order._id" class="q-mb-md">
        <div v-if="order.status && order.status === 'paid' && order.orderType && order.orderType === 'pickup'">

          <q-card-section>
            <div class="text-subtitle2">ID <b>#{{ order._id }}</b> </div>
            <div class="text-caption">ORDERED {{ formatDate(order.orderDate) }}
              <span></span>
            </div>
          </q-card-section>

          <q-card-section v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0">
            <div v-for="sunglass in order.sunglassesDetails" :key="sunglass._id" class="row items-start cursor-pointer" >
              <q-item-section class="col-3">
                <q-img :src="getImageUrl(sunglass.images[0])" alt="Sunglass Image" class="q-mb-sm border" style="max-width: 50px; max-height: 50px;" />
              </q-item-section>
              <q-item-section class="row items-center justify-center">
                <div class="text-caption q-mb-sm">{{ sunglass.model }} </div>
                <!-- <q-btn rounded dense icon="eva-shopping-bag-outline" label="Collected" @click="updatePickupOrder(order._id)" size="10px" class="q-py-sm q-px-md" /> -->
              </q-item-section>
            </div>
          </q-card-section>
          <q-separator class="q-mb-md" style="width: 100%;"></q-separator>
          <div class="row justify-end">
            <q-btn rounded dense icon="eva-shopping-bag-outline" label="Collected" @click="updatePickupOrder(order._id)" size="12px" class="q-py-sm q-px-md" />
          </div>


        </div>

      </q-card>
    </q-card>

    <!-- view all card -->
    <q-card class="q-pa-md col-12 col-md-8 full-height">
      <q-card-section>
        <div class="text-h6">Orders Over Time</div>
      </q-card-section>
      <q-card-section>
        <q-select
          filled
          v-model="selectedTimePeriod"
          :options="timePeriods"
          label="Select Time Period"
          @update:model-value="filterOrders"
          style="width: 200px;"
        />
      </q-card-section>

      <q-card-section style="height: 50vh; width: 100%;">
        <canvas ref="canvas"></canvas>
      </q-card-section>

      <q-card-section>
        <div class="text-h6">All Orders</div>
      </q-card-section>

      <!-- filter -->
      <q-card class="q-pa-md row justify-between">
        <q-select
          filled
          v-model="selectedOrderType"
          :options="orderTypes"
          label="Order Type"
          @update:model-value="filterByOrderType"
          style="width: 15%"
          class="q-mr-md"
        />
        <q-input filled v-model="search" placeholder="Search" @update:model-value="filterBySearch" style="width: 80%;" />
      </q-card>

      <q-markup-table>
        <thead>
          <tr>
            <th></th>
            <th class="text-left">ORDER ID</th>
            <th class="text-left">Customer Name</th>
            <th class="text-left">Order Type</th>
            <th class="text-left">Order Status</th>
            <th class="text-left">Order Date</th>
          </tr>
          </thead>
        <tbody v-for="(order, index) in filteredList" :key="order._id">
          <tr>
            <td class="text-left cursor-pointer">{{ index + 1 }}</td>
            <td class="text-left cursor-pointer">{{ order._id }}</td>
            <td class="text-left cursor-pointer">{{ order.userFirstName }}</td>
            <td class="text-left cursor-pointer">{{ capitalizeFirstLetter(order.orderType) }}</td>
            <td class="text-left cursor-pointer">{{ capitalizeFirstLetter(order.status) }}</td>
            <td class="text-left cursor-pointer">{{ formatDate(order.orderDate) }}</td>
              <!-- <td class="text-left cursor-pointer">
                <q-btn dense flat icon="eva-trash-2-outline" color="negative" v-if="order.status === 'cancelled'" @click="deleteOrder(order._id)" />
              </td> -->
          </tr>
        </tbody>
      </q-markup-table>

    </q-card>
  </div>
</template>

<script>
import OrderService from 'src/services/OrderService'
import UserService from 'src/services/UserService'
import Helper from 'src/services/utils'
import SunglassesService from 'src/services/SunglassesService'
import { Chart, LinearScale, BarController, BarElement, CategoryScale, TimeScale, TimeSeriesScale } from 'chart.js'
Chart.register(LinearScale, BarController, BarElement, CategoryScale, TimeScale, TimeSeriesScale)
import 'chartjs-adapter-date-fns'

export default {
  data() {
    return {
      chart: null,
      selectedTimePeriod: 'Today',
      timePeriods: ['Today', 'Yesterday', 'This Week', 'This Month', 'This Year', 'All Time'],
      search: '',
      orders: [],
      ordersPickup: [],
      ordersDelivery: [],

      combinedList: [],
      filteredList: [],
      selectedOrderType: 'All',
      orderTypes: ['All', 'Pickup', 'Delivery']
    }
  },
  methods: {
    formatDate: Helper.formatDate,                                                        // Validation functions
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,

    createChart(filteredOrders) {
      const ctx = this.$refs.canvas.getContext('2d');

      // Count the number of orders on each date
      const orderCounts = filteredOrders.reduce((acc, order) => {
        const date = new Date(order.orderDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      // Extract the dates and counts
      const dates = Object.keys(orderCounts);
      const counts = Object.values(orderCounts);

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dates, // Use formatted order dates as labels
          datasets: [{
            label: 'Number of Orders',
            data: counts, // Use order counts as data
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Order Date'
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1 // Ensure y-axis has whole numbers only
              },
              title: {
                display: true,
                text: 'Number of Orders'
              }
            }
          }
        }
      });
    },

    filterOrders() {
      let filteredOrders = this.orders;
      const now = new Date();

      switch (this.selectedTimePeriod) {
        case 'Today':
          filteredOrders = this.orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.toDateString() === now.toDateString();
          });
          break;
        case 'Yesterday':
          filteredOrders = this.orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            return orderDate.toDateString() === yesterday.toDateString();
          });
          break;
        case 'This Week':
          filteredOrders = this.orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            return orderDate >= startOfWeek && orderDate <= now;
          });
          break;
        case 'This Month':
          filteredOrders = this.orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
          });
          break;
        case 'This Year':
          filteredOrders = this.orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getFullYear() === now.getFullYear();
          });
          break;
        case 'All Time':
        default:
          filteredOrders = this.orders;
          break;
      }

      this.createChart(filteredOrders);
    },

    async getAllOrders() {                                                               // Get all orders
      const response = await OrderService.findAllOrders()
      this.orders = await Promise.all(response.map(async order => {
        // find user by id
        const user = await UserService.findUserById(order.user)
        return {
          ...order,
          userFirstName: user.firstName,
        }
      }))
      await this.getSunglasses()
      this.ordersPickup = this.orders.filter(order => order.orderType === 'pickup')
      this.ordersDelivery = this.orders.filter(order => order.orderType === 'delivery')
      this.combinedList = [...this.ordersPickup, ...this.ordersDelivery]
      this.filteredList = this.combinedList
      this.filterOrders()
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
    filterByOrderType() {
      if (this.selectedOrderType === 'All') {
        this.filteredList = this.combinedList
      } else if (this.selectedOrderType === 'Pickup') {
        this.filteredList = this.ordersPickup
      } else if (this.selectedOrderType === 'Delivery') {
        this.filteredList = this.ordersDelivery
      }
    },
    filterBySearch() {
      if (this.search === '') {
        this.selectedOrderType === 'All'
        this.filterByOrderType()
        return
      }
      const searchTerm = this.search.toLowerCase()
      this.filteredList = this.filteredList.filter(order =>
        order.user.toLowerCase().includes(searchTerm) ||
        order._id.toLowerCase().includes(searchTerm)
      )
    },
    async updatePickupOrder(id) {
      this.$q.dialog({
        title: 'Ordered Collected', message: `You are about to mark this order as collected. Do you want to continue?`, color: 'primary', cancel: true, persistent: true
      }).onOk(async () => {
        try {
          const response = await OrderService.updatePickupOrder(id);
          if (response) {
            this.$q.notify({ type: 'positive', color: 'primary', message: 'Update successful!' });
            this.getAllOrders(); // Refresh the orders list
          } else {
            this.$q.notify({ type: 'negative', message: 'Update failed. Please try again.' });
          }
        } catch (error) {
          this.$q.notify({ type: 'negative', message: 'Update failed. Please try again.' });
        }
      })
    },
    async deleteOrder(id) {                                                              // Delete order
      this.$q.dialog({
        title: 'Delete order', message: `You are about to delete this order, continue?`, color: 'primary', cancel: true, persistent: true
      }).onOk(async () => {
        const response = await OrderService.deleteOrder(id)
        if(response) {
          this.$q.notify({ type: 'positive', color: 'primary', message: 'Delete successful!' })
          this.getAllOrders()
        } else {
          this.$q.notify({ type: 'negative', message: 'Delete failed. Please try again.' })
          this.getAllOrders()
        }
      })
    }
  },
  async mounted() {
    await this.getAllOrders()
  }
}
</script>
