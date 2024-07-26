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
          </tr>
        </thead>
        <tbody v-for="order in orders" :key="order._id">
          <tr>
            <td class="text-left" >{{ order._id }}</td>
            <td class="text-left" >{{ order.status }}</td>
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
      userTokenDetails: {
        _id : '',
        username: '',
        userType: ''
      }
    }
  },
  methods: {
    async getUserDetails() {
      // token details
      const id = await UserService.FindUserByToken()
      this.userTokenDetails = id
      // user details
      const user = await UserService.findUserById(this.userTokenDetails._id)
      this.userDetails = user
      // get all orders
      this.getAllMyOrders()
    },
    async getAllMyOrders() {
      const response = await OrderService.findAllMyOrders(this.userDetails._id)
      this.orders = response
    }
  },
  created() {
    this.getUserDetails()
  }
}
</script>
