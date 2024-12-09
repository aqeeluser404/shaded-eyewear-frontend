<template>
  <div class="row q-pa-md justify-center q-gutter-md">

    <!--------------------------------------------------------------------- UPCOMING PICKUPS SECTION -------------------------------------------------->
    <q-card flat bordered class="q-pa-md col-12 col-md-3 full-height ">
      <q-card-section>
        <div class="font-size-responsive-lg"><b>Upcoming Pickups</b></div>
      </q-card-section>

      <div v-for="order in ordersPickup" :key="order._id">
        <q-card flat bordered v-if="order.status && order.status === 'paid' && order.orderType && order.orderType === 'pickup'" class="q-mb-md">
          <q-card-section class="row justify-between flex-center">
            <div>
              <div class="text-caption">Order ID: #{{ order._id }}</div>
              <div class="text-caption"><b>ORDERED {{ formatDate(order.orderDate) }}</b></div>
            </div>
          </q-card-section>
          <q-card-section v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0" class="q-gutter-sm">
            <div v-for="sunglass in order.sunglassesDetails" :key="sunglass._id" class="row items-center cursor-pointer" @click="viewSunglassesDetails(sunglass._id)">
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
          <q-separator />

          <q-card-section>
            <div class="text-caption">RECEIVE PAYMENT OF <span style="text-decoration: underline; color: black;">R {{ order.totalAmount }}.00</span></div>
            <div class="text-caption q-mb-md">ORDER FOR <span style="text-decoration: underline; color: black;">{{ order.userFirstName }}</span></div>
            <q-btn rounded dense color="black" text-color="white" icon="eva-shopping-bag-outline" label="Collected" @click="updatePickupOrder(order._id)" class="q-px-lg q-py-sm custom-button font-size-responsive-md" style="width: 100%;" />
          </q-card-section>
        </q-card>
      </div>
    </q-card>

    <!--------------------------------------------------------------------- ORDERS SECTION SECTION -------------------------------------------------->
    <q-card flat bordered class=" col-12 col-md-8 full-height">
      <div class="q-pa-md">

        <!-- chart for orders over time -->
        <q-card-section>
          <div class="font-size-responsive-lg"><b>Orders Over Time</b></div>
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
        <q-card-section class="canvas-container" >
          <canvas ref="canvas"></canvas>
        </q-card-section>
      </div>
      <q-separator />

      <!-- all orders table -->
      <div class="q-pa-md">
        <q-card-section>
          <div class="font-size-responsive-lg"><b>All Orders</b></div>
        </q-card-section>
        <div class="q-pa-md row justify-center q-gutter-md">
          <q-select
            filled
            v-model="selectedOrderType"
            :options="orderTypes"
            label="Order Type"
            @update:model-value="filterByOrderType"
            class="col-12 col-md-3"
          />
          <q-input filled v-model="search" placeholder="Search" @update:model-value="filterBySearch" class="col-12 col-md-8" />
        </div>
        <q-markup-table flat>
          <thead>
            <tr>
              <th></th>
              <th class="text-left">ORDER ID</th>
              <th class="text-left">Customer Username</th>
              <th class="text-left">Order Type</th>
              <th class="text-left">Order Status</th>
              <th class="text-left">Order Date</th>
              <th class="text-left">Quick Tools</th>
            </tr>
          </thead>
          <tbody v-for="(order, index) in filteredList" :key="order._id">
            <tr :class="{ 'refunded': order.returns == 'returned item(s)' }">
              <td class="text-left cursor-pointer">{{ index + 1 }}</td>
              <td class="text-left cursor-pointer">#{{ order._id }}</td>
              <td class="text-left cursor-pointer">{{ order.userFirstName }}</td>
              <td class="text-left cursor-pointer">{{ capitalizeFirstLetter(order.orderType) }}</td>
              <td class="text-left cursor-pointer">{{ capitalizeFirstLetter(order.status) }}</td>
              <td class="text-left cursor-pointer">{{ formatDate(order.orderDate) }}</td>
              <td class="text-left cursor-pointer">
                <q-btn rounded dense icon="eva-trash-2-outline" class="custom-button q-pa-sm custom-button font-size-responsive-sm" color="negative" @click="deleteOrder(order._id)" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>
  </div>
</template>

<script>
import OrderService from 'src/services/OrderService'
import UserService from 'src/services/UserService'
import Helper from 'src/services/utils'
import SunglassesService from 'src/services/SunglassesService'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
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
      filteredOrders: [],
      combinedList: [],
      filteredList: [],
      selectedOrderType: 'All',
      orderTypes: ['All', 'Pickup', 'Delivery']
    }
  },
  mounted() {
    this.getAllOrders()
  },
  beforeUnmount() {
    this.destroyChart(); // Destroy the chart on unmount
  },
  watch: {
    filterOrders() {
      this.renderChart()
    }
  },
  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },
    destroyChart() {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
    },
    // Create or update the chart with filteredOrders
    renderChart() {
      const canvas = this.$refs.canvas;
      if (!canvas) {
        console.error("Canvas element not found!");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context!");
        return;
      }

      // Destroy existing chart
      this.destroyChart();

      // Prepare chart data
      const orderCounts = this.filteredOrders.reduce((acc, order) => {
        const date = new Date(order.orderDate)
          .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const dates = Object.keys(orderCounts);
      const counts = Object.values(orderCounts);

      // Create the chart
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dates,
          datasets: [
            {
              label: "# of Orders",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                precision: 0
              }
            },
          },
        },
      });
    },
    // Filter orders and update the chart
    filterOrders() {
      const now = new Date();
      switch (this.selectedTimePeriod) {
        case "Today":
          this.filteredOrders = this.combinedList.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.toDateString() === now.toDateString();
          });
          break;
        case "Yesterday":
          this.filteredOrders = this.combinedList.filter(order => {
            const orderDate = new Date(order.orderDate);
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            return orderDate.toDateString() === yesterday.toDateString();
          });
          break;
        case "This Week":
          this.filteredOrders = this.combinedList.filter(order => {
            const orderDate = new Date(order.orderDate);
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            return orderDate >= startOfWeek && orderDate <= now;
          });
          break;
        case "This Month":
          this.filteredOrders = this.combinedList.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
          });
          break;
        case "This Year":
          this.filteredOrders = this.combinedList.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getFullYear() === now.getFullYear();
          });
          break;
        case "All Time":
        default:
          this.filteredOrders = [...this.combinedList];
          break;
      }

      // Render the chart with the new filteredOrders
      this.renderChart();
    },
    async getAllOrders() {
      const response = await OrderService.findAllOrders()
      this.orders = await Promise.all(response.map(async order => {
        // find user by id
        const user = await UserService.findUserById(order.user)
        return {
          ...order,
          userFirstName: user.username,
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
    async deleteOrder(id) {
      this.$q.dialog({
        title: 'Delete order', message: `Warning: Deleting this order will remove all records of existing payments associated with it, continue?`, color: 'negative', cancel: true, persistent: true
      }).onOk(async () => {
        const order = await OrderService.findOrderById(id)
        if (order.returns || order.returns === 'returned item(s)') {
          this.$q.dialog({
            title: 'Delete order', message: `This order has a refund associated with it. Deleting this order will also delete that refund, continue?`, color: 'primary', cancel: true, persistent: true
          }).onOk(async () => {
            const response = await OrderService.deleteOrder(order._id)
            if(response) {
              this.$q.notify({ type: 'positive', color: 'primary', message: 'Delete successful!' })
              this.getAllOrders()
            } else {
              this.$q.notify({ type: 'negative', message: 'Delete failed. Please try again.' })
              this.getAllOrders()
            }
          })
        } else {
          this.$q.dialog({
            title: 'Delete order', message: `You are about to delete this order, continue?`, color: 'primary', cancel: true, persistent: true
          }).onOk(async () => {
            const response = await OrderService.deleteOrder(order._id)
            if(response) {
              this.$q.notify({ type: 'positive', color: 'primary', message: 'Delete successful!' })
              this.getAllOrders()
            } else {
              this.$q.notify({ type: 'negative', message: 'Delete failed. Please try again.' })
              this.getAllOrders()
            }
          })
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
