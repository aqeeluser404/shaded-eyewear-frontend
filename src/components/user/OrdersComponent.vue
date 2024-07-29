<template>
  <q-card-section>
    <div class="text-h6">Your previous orders</div>
  </q-card-section>

  <!-- my orders -->
  <q-card>
    <!-- if user has any orders -->
    <div v-if="orders && orders !== null">
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Order ID</th>
            <th class="text-left">Status</th>
            <th class="text-left">totalAmount</th>
            <th class="text-left">totalItems</th>
          </tr>
        </thead>
        <tbody v-for="order in orders" :key="order._id">
          <tr>
            <td class="text-left" >{{ order._id }}</td>
            <td class="text-left" >{{ order.status }}</td>
            <td class="text-left" >{{ order.totalAmount }}</td>
            <td class="text-left" >{{ order.totalItems }}</td>
            <td>
              <!-- add button to pay now -->
              <q-btn
                @click="cancelOrder(order._id)"
                v-if="order.status === 'pending'"
                size="12px"
                label="Cancel Order"
                bordered
              />
              <q-btn
                v-if="order.status === 'paid'"
                size="12px"
                label="View"
                bordered
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
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
      userTokenDetails: { _id : '', username: '', userType: '' }
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
          localStorage.removeItem('currentOrderId')

          // reload orders
          this.getAllMyOrders()
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
    }
  },
  created() {
    this.getUserDetails()
  }
}
</script>
