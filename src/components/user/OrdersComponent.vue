<template>
  <q-card-section>
    <div class="text-h6">Your previous orders</div>
  </q-card-section>

  <!-- my orders -->
  <q-card>

    <!-- if user has any orders -->
    <div v-if="orders && orders !== null">

      <div v-if="selectedOrder">
        <q-markup-table flat>
          <thead>
            <tr>
              <th class="text-left">Order #{{ selectedOrder._id }}</th>
              <th class="text-left">ORDERED {{ selectedOrder._orderDate }}</th>
              <th v-if="selectedOrder.status === 'paid'" class="text-left text-uppercase">{{ selectedOrder.status }}</th>
              <th v-else class="text-left text-uppercase">PAYMENT {{ selectedOrder.status }}</th>
            </tr>
          </thead>
        </q-markup-table>
        <q-markup-table flat>
          <thead>
            <tr>
            </tr>
          </thead>
        </q-markup-table>
        <q-card-actions>
          <q-btn bordered @click="closeDetails" label="Back" size="12px" />
          <q-btn bordered @click="cancelOrder(selectedOrder._id)" v-if="selectedOrder.status === 'pending'" label="Cancel Order" size="12px"  />
          <q-btn bordered to="/cart" icon="eva-shopping-cart" v-if="selectedOrder.status === 'pending'" label="Proceed to checkout" size="12px" />
        </q-card-actions>
      </div>

      <div v-else>
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Order ID</th>
              <th class="text-left">Status</th>
              <th class="text-left">Total amount</th>
              <th class="text-left">Total items</th>
            </tr>
          </thead>
          <tbody v-for="order in orders" :key="order._id">
            <tr @click="openDetails(order)">
              <td class="text-left" >{{ order._id }}</td>
              <td class="text-left text-uppercase" >{{ order.status }}</td>
              <td class="text-left" >{{ order.totalAmount }}</td>
              <td class="text-left" >{{ order.totalItems }}</td>
              <td>
                <!-- add button to pay now -->
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>



    <!-- if user has no orders -->
    <div v-else>You haven't ordered anything</div>

  </q-card>
</template>

<script>
import UserService from 'src/services/UserService'
import OrderService from 'src/services/OrderService';

export default {
  data() {
    return {
      orders: [{}],
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' },
      selectedOrder: null
    }
  },
  methods: {

    // =================================== FUNCTIONS
    async cancelOrder(orderId) {
      this.$q.dialog({
        title: 'Confirm',
        message: `You are about to delete your order, continue?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await OrderService.cancelOrder(orderId)
          await OrderService.deleteOrder(orderId)   // temporary to keep database clean

          localStorage.removeItem('currentOrderId')
          // window.location.reload();
          // reload orders
          // this.getAllMyOrders()
        } catch(error) {
          console.error(error);
        }
      }).onCancel(() => {
        this.getAllMyOrders()
        return
      }).onDismiss(() => {});
    },

    // =================================== GET DATA
    async getAllMyOrders() {
      const response = await OrderService.findAllMyOrders(this.userDetails._id)
      this.orders = response
    },

    async getUserDetails() {
      const id = await UserService.FindUserByToken()
      this.userTokenDetails = id
      const user = await UserService.findUserById(this.userTokenDetails._id)
      this.userDetails = user

      // reload orders
      this.getAllMyOrders()
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
  }
}
</script>
