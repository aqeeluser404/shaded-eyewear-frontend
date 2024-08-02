<template>
  <!-- constrains -->
   <q-page>
    <div class="constrain window-height">

      <!-- =================================== SUNGLASSES DETAILS HEADER -->
      <q-card bordered flat class="column flex-center">
        <h4>Review your order</h4>
      </q-card>

      <div class="row q-pa-md q-gutter-md justify-center">
        <!-- review -->
        <q-card class="q-pa-md col-12 col-md-6">
          test
        </q-card>
        <!-- order summary -->
        <q-card class="q-pa-md col-12 col-md-3">
          <q-card-section>
            <div class="text-h5 q-mb-md">Order Summary</div>
            <p>{{ order.sunglasses ? order.sunglasses.length : 0 }} item(s)</p>
            <p>Delivery info</p>

            <!-- <p v-if="orderType.type === 'delivery'">Delivery: Free</p> -->
            <!-- <p v-if="orderType.type === 'delivery'">Delivery: Free</p> -->
            <q-separator class="q-mb-md" />
            <p>To Pay: <span class="q-ml-lg text-h5">R{{ order.totalAmount }}.00</span></p>
            <q-btn
              size="12px"
              label="Pay with Yoco"
              style="width: 100%; height: 50px;"
              class="q-mb-md"
            />
            <q-btn
              size="12px"
              icon="eva-lock-outline"
              label="Secure Checkout"
              flat
              style="width: 100%;"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
   </q-page>
</template>

<script>
import UserService from 'src/services/UserService'
import OrderService from 'src/services/OrderService'

export default {
  data() {
    return {
      order: {},
      currentOrderId: localStorage.getItem('currentOrderId') || null,
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' }
    }
  },

  methods: {

    // if delivery type = delivery
    // delivery = free

    // if delivery type = pickup
    // delivery = must pay for delivery

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
  }
}
</script>

