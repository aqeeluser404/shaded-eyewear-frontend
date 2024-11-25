<template>
  <div class="row q-pa-md justify-center q-gutter-md">

    <q-card flat bordered class="q-pa-md col-12 col-md-3 full-height">
      <q-card-section>
        <div class="font-size-responsive-lg">Upcoming Pickups</div>
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
    <q-card flat bordered class="q-pa-md col-12 col-md-8 full-height">
      <q-card-section>
        <div class="font-size-responsive-lg">Orders Over Time</div>
      </q-card-section>
      <q-card-section class="row">
        <q-select
          filled
          v-model="selectedTimePeriod"
          :options="timePeriods"
          label="Select Time Period"
          class="col-12 col-md-3"
          @update:model-value="filterOrders"

        />
      </q-card-section>

      <q-card-section class="canvas-container">
        <canvas ref="canvas"></canvas>
      </q-card-section>

      <q-card-section>
        <div class="font-size-responsive-lg">All Orders</div>
      </q-card-section>

      <!-- filter -->
      <q-card class="q-pa-md row justify-start">
        <q-select
          filled
          v-model="selectedOrderType"
          :options="orderTypes"
          label="Order Type"
          @update:model-value="filterByOrderType"
          class="col-12 col-md-3 q-mr-md"
        />
        <q-input filled v-model="search" placeholder="Search" @update:model-value="filterBySearch" class="col-12 col-md-8" />
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
import { Chart, LinearScale, BarController, BarElement, CategoryScale, TimeScale, TimeSeriesScale, registerables } from 'chart.js'
Chart.register(LinearScale, BarController, BarElement, CategoryScale, TimeScale, TimeSeriesScale, ...registerables)
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
  async mounted() {
    await this.getAllOrders()
  },
  beforeUnmount() {
    // Cleanup: destroy chart
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  },
  methods: {
    formatDate: Helper.formatDate,                                                        // Validation functions
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,

    createChart(filteredOrders) {
      const canvas = this.$refs.canvas
      console.log(canvas)
      if (!canvas) {
        console.error('Canvas element not found!');
        return;
      }
      const ctx = canvas.getContext('2d');
      console.log(ctx)
      if (!ctx) {
        console.error('Failed to get canvas context!');
        return;
      }

      // Destroy the chart if it exists
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      // Count the number of orders on each date
      const orderCounts = filteredOrders.reduce((acc, order) => {
        const date = new Date(order.orderDate)
          .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          .replace(/ /g, ' ');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const dates = Object.keys(orderCounts);
      const counts = Object.values(orderCounts);

      const config = {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: '# of Orders',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',  // Always horizontal bars
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                precision: 0
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                precision: 0
              }
            },
          },
        }
      };

      // Create the chart instance
      this.chart = new Chart(ctx, config);
    },

    filterOrders() {
      const now = new Date();

      let filteredOrders = [...this.ordersDelivery, ...this.ordersPickup].filter(order =>
        order.status !== 'refunded'
      );

      switch (this.selectedTimePeriod) {
        case 'Today':
          filteredOrders = filteredOrders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.toDateString() === now.toDateString();
          });
          break;
        case 'Yesterday':
          filteredOrders = filteredOrders.filter(order => {
            const orderDate = new Date(order.orderDate);
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            return orderDate.toDateString() === yesterday.toDateString();
          });
          break;
        case 'This Week':
          filteredOrders = filteredOrders.filter(order => {
            const orderDate = new Date(order.orderDate);
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            return orderDate >= startOfWeek && orderDate <= now;
          });
          break;
        case 'This Month':
          filteredOrders = filteredOrders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
          });
          break;
        case 'This Year':
          filteredOrders = filteredOrders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getFullYear() === now.getFullYear();
          });
          break;
        case 'All Time':
        default:
          // No need to filter further, use initial filteredOrders
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
      this.ordersPickup = this.orders.filter(order => order.orderType === 'pickup' && order.status !== 'refunded')
      this.ordersDelivery = this.orders.filter(order => order.orderType === 'delivery' && order.status !== 'refunded')
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
}
</script>

<style lang="sass">
.canvas-container
  position: relative
  width: 100%
  height: 50vh

.canvas
  width: 100% !important
  height: 100% !important

</style>
