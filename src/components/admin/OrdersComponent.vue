<template>
  <div class="row q-pa-md q-gutter-md justify-center">

    <q-card class="q-pa-md col-12 col-md-11">
      <q-card>
        <q-card-section>
          <div class="text-h6">All Orders</div>
        </q-card-section>
        <q-markup-table>
          <thead>
            <tr>
              <th></th>
              <th class="text-left">User</th>
              <th class="text-left">Order Type</th>
              <th class="text-left">Delivery Date</th>
              <th class="text-left">Status</th>
              <th class="text-left">Tools</th>
            </tr>
          </thead>
          <tbody v-for="(order, index) in orders" :key="order._id">
            <tr>
              <td class="text-left cursor-pointer">{{ index + 1 }}</td>
              <td class="text-left cursor-pointer">{{ order.userFirstName }}</td>
              <td class="text-left cursor-pointer">{{ order.orderType }}</td>
              <td class="text-left cursor-pointer">{{ formatDate(order.deliveryDate) }}</td>
              <td class="text-left cursor-pointer">{{ capitalizeFirstLetter(order.status) }}</td>
              <td class="text-left cursor-pointer">
                <!-- delete -->
                <q-btn dense flat icon="eva-trash-2-outline" color="negative" v-if="order.status === 'cancelled'" @click="deleteOrder(order._id)" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
    </q-card>

  </div>
</template>

<script>
import OrderService from 'src/services/OrderService'
import UserService from 'src/services/UserService'
import { formatDate, capitalizeFirstLetter } from 'src/services/utils'

export default {
  data() {
    return {
      orders: []
    }
  },
  methods: {
    formatDate,
    capitalizeFirstLetter,
    async getAllOrders() {
      const response = await OrderService.findAllOrders()
      this.orders = await Promise.all(response.map(async order => {
        // find user by id
        const user = await UserService.findUserById(order.user)
        return {
          ...order,
          userFirstName: user.firstName,
        }
      }))
    },
    async deleteOrder(id) {
      this.$q.dialog({
        title: 'Delete order', message: `You are about to delete this order, continue?`, cancel: true, persistent: true
      }).onOk(async () => {
        await OrderService.deleteOrder(id)
        this.getAllOrders()
      }).onCancel(() => {}).onDismiss(() => {})
    }
  },
  created() {
    this.getAllOrders()
  }
}
</script>
