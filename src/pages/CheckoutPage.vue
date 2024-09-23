<template>
  <!-- constrains -->
   <q-page>
    <div class="constrain">

      <!-- =================================== SUNGLASSES DETAILS HEADER -->
      <q-card bordered flat class="column flex-center">
        <h4>Review your order</h4>
      </q-card>

      <div class="row q-pa-md q-gutter-md justify-center">
        <!-- review -->
        <div class="col-12 col-md-6">

          <!-- card to change delivery -->
          <q-card class="row items-center justify-between q-pa-md q-mb-md" >
            <q-card-section>
              Change Address
            </q-card-section>
            <q-card-section>
              <q-btn
                size="12px"
                label="Change"
                @click="toggleDeliveryPanel"
              />
            </q-card-section>
          </q-card>

          <!-- Current Address Details -->
          <q-card class="q-pa-md" v-if="addAddressPanel === false">
            <q-card-section class="text-h6">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="eva-car-outline" />
                </q-item-section>
                <q-item-section>
                  Delivery Address
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section>
              <!-- <div class="text-h5 q-mb-md">Order Summary</div> -->

              <div v-if="userDetails && userDetails.location.streetAddress !== 'Not Provided' && userDetails.location.suburb !== 'Not Provided' && userDetails.location.city !== 'Not Provided' && userDetails.location.province !== 'Not Provided' && userDetails.location.postalCode !== 0">
                <p>{{ userDetails.firstName }}</p>
                <p>{{ userDetails.location.streetAddress }}</p>
                <p>{{ userDetails.location.suburb }}</p>
                <p>{{ userDetails.location.city }}</p>
                <p>{{ userDetails.location.province }}</p>
                <p>{{ userDetails.location.postalCode }}</p>
              </div>
              <div v-else>
                <p>Please provide your complete address to proceed with your order.</p>
              </div>
              <!-- <p v-if="orderType.type === 'delivery'">Delivery: Free</p> -->
              <!-- <p v-if="orderType.type === 'delivery'">Delivery: Free</p> -->
            </q-card-section>
          </q-card>

          <!-- Add Address Details -->
          <q-card class="q-pa-md q-mt-md" v-else >
            <q-card-section class="text-h6">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="eva-car-outline" />
                </q-item-section>
                <q-item-section>
                  Delivery Address
                </q-item-section>
              </q-item>
            </q-card-section>

            <q-card-section>
              <q-form
                @submit="addAddress"
                class="q-gutter-lg"
              >
              <q-input
                filled
                v-model="userAddress.location.streetAddress"
                label="Street Address *"
              />
              <q-input
                filled
                v-model="userAddress.location.suburb"
                label="Suburb *"
              />
              <q-select
                filled
                v-model="userAddress.location.city"
                :options="cityOptions"
                emit-value
                map-options
                label="City *"
              />
              <q-input
                filled
                v-model="userAddress.location.province"
                label="Province *"
              />
              <q-input
                filled
                v-model="userAddress.location.postalCode"
                label="Postal Code *"
              />
              <div>
                <q-btn label="Save Address" type="submit" color="primary" class="custom-button"/>
              </div>
              </q-form>
            </q-card-section>

          </q-card>
        </div>

        <!-- =================================== ORDER SUMMARY -->
        <div class="col-12 col-md-3 full-height">
          <q-card class="q-pa-md q-mb-md">
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
                @click="initiatePayment"
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

          <q-card class="q-pa-md">
            <q-card-section>
              Items for Delivery
            </q-card-section>
            <q-separator class="q-mb-md" />
            <q-card-section>

            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
   </q-page>
</template>

<script>
import UserService from 'src/services/UserService'
import OrderService from 'src/services/OrderService'
import PayService from 'src/services/PayService'
import axios from 'axios'
// import Helper from '../services/utils'

export default {

  // beforeRouteEnter: Helper.beforeRouteEnterUser,

  data() {
    return {
      order: {},
      currentOrderId: localStorage.getItem('currentOrderId') || null,
      userDetails: {
        location: {
          streetAddress: '', suburb: '', city: '', province: '', postalCode: ''
        }
      },
      userAddress: {
        location: {
          streetAddress: '', suburb: '', city: '', province: '', postalCode: ''
        }
      },
      cityOptions: [
        { label: 'Cape Town', value: 'Cape Town' },
        { label: 'johannesburg', value: 'johannesburg' },
        // { label: 'Not provided', value: 'Not provided' }
      ],
      userTokenDetails: { _id : '', username: '', userType: '' },
      addAddressPanel: false
    }
  },

  methods: {

    toggleDeliveryPanel() {
      this.addAddressPanel = !this.addAddressPanel
    },
    async addAddress() {
      const updatedUser = {
        location: this.userAddress.location,
      }
      this.$q.dialog({
        title: 'Confirm', message: `You are about to update your address, continue?`, color: 'primary', cancel: true, persistent: true
      }).onOk(async () => {
        const isValid = await this.validateAddress()
        if (isValid) {
          await UserService.updateUserDetails(this.userDetails._id, updatedUser)

          this.$q.notify({ type: 'positive', color: 'primary', message: 'Update successful!' })
          this.getUserDetails()
          this.addAddressPanel = false
        } else {
          this.$q.notify({ type: 'negative', message: 'Update failed. Please try again.' })
        }
      }).onCancel(() => {
        this.getUserDetails()
        return
      })
    },
    async initiatePayment() {
      try {
        const response = await PayService.initiatePayment(this.currentOrderId);
        const { checkout } = response;
        console.log('Checkout URL:', checkout.redirectUrl); // Add this line to log the checkout URL
        window.location.href = checkout.redirectUrl; // Redirect to Yoco checkout page

      } catch (error) {
        console.error('Payment initiation failed:', error);
      }
    },
    async validateAddress() {
        const address = `${this.userAddress.location.streetAddress}, ${this.userAddress.location.suburb}, ${this.userAddress.location.city}, ${this.userAddress.location.province}, ${this.userAddress.location.postalCode}`;
        try {
          const response = await axios.get(`https://api.1map.co.za/v1/validate?address=${encodeURIComponent(address)}`);
          if (response.data.valid) {
            this.$q.notify({ type: 'positive', message: 'Address is valid!' });
          } else {
            this.$q.notify({ type: 'negative', message: 'Address is invalid. Please check the details.' });
          }
        } catch (error) {
          console.error('Address validation failed:', error);
          if (error.response) {
            // Server responded with a status other than 200 range
            this.$q.notify({ type: 'negative', message: `Validation failed: ${error.response.data.message}` });
          } else if (error.request) {
            // Request was made but no response received
            this.$q.notify({ type: 'negative', message: 'Network error. Please check your connection.' });
          } else {
            // Something else happened
            this.$q.notify({ type: 'negative', message: `Error: ${error.message}` });
          }
        }
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
  }
}
</script>

<!-- // if delivery type = delivery
// delivery = free

// if delivery type = pickup
// delivery = must pay for delivery -->

