<template>
  <!-- constrains -->
  <q-page>
    <div class="constrain window-height">

      <!-- =================================== SUNGLASSES DETAILS HEADER -->
      <q-card bordered flat class="column flex-center">
        <h4>Cart</h4>
      </q-card>

      <!-- if user has any orders -->
      <div v-if="currentOrderId !== null" class="row q-pa-md q-gutter-md justify-center">
        <q-card class="col-12 col-md-6">
          <q-card-section class="q-gutter-md ">
            <div class="text-h5">Order Details</div>
            <q-separator class="q-mb-xs" />
            <q-btn
              @click="cancelOrder(order._id)"
              size="12px"
              label="Clear Cart"
              bordered
            />
            <q-btn
              to="/sunglasses"
              size="12px"
              label="Continue Shopping"
              bordered
            />
          </q-card-section>
        </q-card>
        <q-card class="q-pa-md col-12 col-md-3">
          <q-card-section >
            <div class="text-h5 q-mb-md">Cart Summary</div>
            <p>Total: <span class="q-ml-lg text-h5">R{{ order.totalAmount }}.00</span></p>
            <q-separator class="q-mb-md" />
            <q-btn
              to="/buy/review"
              size="12px"
              label="Proceed to checkout"
              bordered
            />
          </q-card-section>
        </q-card>

      </div>
      <!-- if user has no orders -->
      <div v-else class="row q-pa-md q-gutter-md justify-center">
        <q-card class="column flex-center q-mb-md">
          <q-card-section>
            <div class="text-h5">You haven't ordered anything</div>
          </q-card-section>
          <q-card-section>
            <q-btn
              to="/sunglasses"
              size="12px"
              label="Continue Shopping"
              bordered
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
// import Helper from '../services/utils'
import UserService from 'src/services/UserService'
import OrderService from 'src/services/OrderService'

export default {

  // beforeRouteEnter: Helper.beforeRouteEnterUser,
  data() {
    return {
      order: {},
      currentOrderId: localStorage.getItem('currentOrderId') || null,
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' }
    }
  },

  methods: {

    // =================================== FUNCTIONS
    async cancelOrder(orderId) {
      this.$q.dialog({
        title: 'Confirm',
        message: `You are about to empty your cart, continue?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await OrderService.cancelOrder(orderId)
          await OrderService.deleteOrder(orderId)   // temporary to keep database clean

          localStorage.removeItem('currentOrderId')
          // window.location.reload();
        } catch(error) {
          console.error(error);
        }
      }).onCancel(() => {}).onDismiss(() => {});
    },

    // =================================== GET DATA
    async getCurrentOrder() {
      const response = await OrderService.findOrderById(this.currentOrderId)
      this.order = response
    },

    async getUserDetails() {
      const id = await UserService.FindUserByToken()
      this.userTokenDetails = id
      const user = await UserService.findUserById(this.userTokenDetails._id)
      this.userDetails = user

      // reload orders
      this.getCurrentOrder()
    }
  },
  created() {
    this.getUserDetails()
  },
};
</script>
