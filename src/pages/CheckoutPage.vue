<template>
  <q-page>
    <div class="q-pa-md" style="width: 100%; height: 100%; background-color: #f0f0f0;">

      <div style="height: 50px;"></div>

      <div class="row q-gutter-md justify-center">

        <!-- change and add address -->
        <div class="col-12 col-md-6">
          <!-- card to change delivery -->
          <q-card v-if="!deliveryPanel" flat bordered class="row items-center justify-between q-pa-md q-mb-md">
            <q-card-section class="font-size-responsive-sm">
              Collect
            </q-card-section>
            <q-card-section>
              <q-btn
                rounded dense
                color="white"
                text-color="black"
                class="q-px-lg custom-button font-size-responsive-sm"
                label="Collect My Order"
                @click="togglePickupPanel"
              />
            </q-card-section>
          </q-card>
          <q-card v-if="!pickupPanel" flat bordered class="row items-center justify-between q-pa-md">
            <q-card-section class="font-size-responsive-sm">
              Change Address (Coming soon)
            </q-card-section>
            <q-card-section>
              <!-- <q-btn
                size="12px"
                label="Deliver My Order"
                @click="toggleDeliveryPanel"
              /> -->
            </q-card-section>
          </q-card>

          <!-- Pickup Panel -->
          <q-card flat bordered class="" v-if="pickupPanel">

            <q-card-section class="row items-center font-size-responsive-md">
              <div class="text-subtitle1 q-mr-md"><b>Pickup Location</b></div>
              <q-icon name="local_shipping" class="font-size-responsive-md" />
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="">
                <div class="text-subtitle1 q-mb-md">Available Pickup Location(s)</div>
                <q-radio class="q-pa-sm">
                  <span class="q-ml-md"><b>332 Klip Road</b></span><br>
                  <span class="q-ml-md">Lotus River</span><br>
                  <span class="q-ml-md">Cape Town</span><br>
                  <span class="q-ml-md">7941</span>
                  <!-- <span class="q-ml-md">Western Cape</span><br> -->
                </q-radio>

              </div><br>
              <div><b>Our store is open from 8:00 AM to 5:00 PM</b></div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="text-subtitle1 q-mb-md"><b>Pickup Instructions</b></div>
              <div>
                For a smooth pickup experience, please remember to bring a valid ID and your order confirmation email.
              </div><br>
              <div>
                If you have any questions or need assistance, feel free to contact us. <br>Thank you for shopping with us!
              </div>
            </q-card-section>
          </q-card>

          <!-- Delivery Panel -->
          <q-card flat bordered class="q-pa-md" v-if="deliveryPanel">
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
              <q-form @submit="addAddress" class="q-gutter-lg">
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

        <!-- order summary -->
        <div class="col-12 col-md-3">
          <div class="q-gutter-md">

            <q-card flat bordered>
              <q-card-section>
                <div class="font-size-responsive-xl">Order Summary</div>
              </q-card-section>

              <q-separator />

              <div class="q-px-md">
                <q-card-section class="row items-center q-gutter-md justify-start">
                  <div class="text-caption"><b>TOTAL:</b> {{ order.totalItems }} item(s)</div>
                  <div class="font-size-responsive-lg">R {{ order.totalAmount }}.00</div>
                </q-card-section>
              </div>

              <q-card-section class="q-pa-none q-px-md q-pb-md">
                <q-btn
                  rounded dense
                  color="black"
                  text-color="white"
                  label="Pay with Yoco"
                  style="width: 100%;"
                  class="q-px-lg custom-button font-size-responsive-md q-mb-md"
                  @click="initiatePayment"
                />
                <q-btn
                  rounded dense
                  icon="eva-lock-outline"
                  label="Secure Checkout"
                  flat
                  class="custom-button font-size-responsive-sm"
                  style="width: 100%; opacity: 0.9"
                />
              </q-card-section>


            </q-card>

            <q-card flat bordered class="">
              <q-card-section class="font-size-responsive-sm" >
                Review your items
              </q-card-section>

              <q-separator />

              <q-card-section v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0" class="q-gutter-md">
                <div v-for="sunglass in order.sunglassesDetails" :key="sunglass._id" class="row items-center cursor-pointer" @click="viewSunglassesDetails(sunglass._id)">
                  <q-item-section class="col-4">
                    <q-img :src="getImageUrl(sunglass.images[0])" alt="Sunglass Image" class="border" style="max-width: 100px; max-height: 100px;" />
                  </q-item-section>
                  <q-item-section class="col-7" style="height: 100%;">
                    <div class="font-size-responsive-sm q-mb-sm"><b>{{ capitalizeFirstLetter(sunglass.model) }}</b> </div>
                    <div class="text-caption">Item(s): 1</div>
                    <div class="text-caption"><b>Price:</b> R {{ sunglass.price }}.00</div>
                  </q-item-section>
                </div>
              </q-card-section>
            </q-card>
          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>


<script>
import UserService from 'src/services/UserService'
import OrderService from 'src/services/OrderService'
import PayService from 'src/services/PayService'
import SunglassesService from 'src/services/SunglassesService'
import axios from 'axios'
import Helper from '../services/utils'

export default {
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
      orderType: null,
      pickupPanel: false,
      deliveryPanel: false
    }
  },

  methods: {
    getImageUrl: Helper.getImageUrl,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    togglePickupPanel() {
      this.pickupPanel = !this.pickupPanel;
      this.deliveryPanel = false;
      this.orderType = 'pickup'
    },
    toggleDeliveryPanel() {
      this.$q.notify({ type: 'negative', color: 'red', message: 'Currently under development! We apologize for any inconvenience.' })
      // this.deliveryPanel = !this.deliveryPanel;
      // this.pickupPanel = false;
      // this.orderType = 'delivery'
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

    // when i implement delivery, ensure that the ordertype is execute after a successful payment
    async initiatePayment() {
      try {
        if (this.orderType === null) {
          this.$q.notify({ type: 'negative', color: 'red', message: 'Please choose your order type!' })
          return
        }
        if (this.orderType === 'pickup') {
          await this.createPickup()
        }
        if (this.orderType === 'delivery') {
          await this.createDelivery()
        }
        const response = await PayService.initiatePayment(this.currentOrderId);
        const { checkout } = response;
        console.log('Checkout URL:', checkout.redirectUrl); // Add this line to log the checkout URL
        window.location.href = checkout.redirectUrl; // Redirect to Yoco checkout page
      } catch (error) {
        console.error('Payment initiation failed:', error);
      }
    },
    async createPickup() {
      try {
        await OrderService.createPickup(this.currentOrderId)
      } catch (error) {
        console.error('Creating pickup failed:', error)
      }
    },
    // async createDelivery() {
    //   try {
    //     await OrderService.createDelivery(this.currentOrderId)
    //   } catch (error) {
    //     console.error('Creating delivery failed:', error)
    //   }
    // },

    // async validateAddress() {
    //     const address = `${this.userAddress.location.streetAddress}, ${this.userAddress.location.suburb}, ${this.userAddress.location.city}, ${this.userAddress.location.province}, ${this.userAddress.location.postalCode}`;
    //     try {
    //       const response = await axios.get(`https://api.1map.co.za/v1/validate?address=${encodeURIComponent(address)}`);
    //       if (response.data.valid) {
    //         this.$q.notify({ type: 'positive', message: 'Address is valid!' });
    //       } else {
    //         this.$q.notify({ type: 'negative', message: 'Address is invalid. Please check the details.' });
    //       }
    //     } catch (error) {
    //       console.error('Address validation failed:', error);
    //       if (error.response) {
    //         // Server responded with a status other than 200 range
    //         this.$q.notify({ type: 'negative', message: `Validation failed: ${error.response.data.message}` });
    //       } else if (error.request) {
    //         // Request was made but no response received
    //         this.$q.notify({ type: 'negative', message: 'Network error. Please check your connection.' });
    //       } else {
    //         // Something else happened
    //         this.$q.notify({ type: 'negative', message: `Error: ${error.message}` });
    //       }
    //     }
    // },

    // =================================== GET DATA
    async getCurrentOrder() {
      const response = await OrderService.findOrderById(this.currentOrderId)
      this.order = response

      await this.getSunglasses()
    },
    async getSunglasses() {
      if (this.order.sunglasses && this.order.sunglasses.length > 0) {
        this.order.sunglassesDetails = []
        for (const sunglass of this.order.sunglasses) {
          try {
            const response = await SunglassesService.findSunglassesById(sunglass._id)
            if (response && response.images && response.images.length > 0) {
              response.image = this.getImageUrl(response.images[0])
              this.order.sunglassesDetails.push(response)
            } else {
              console.error(`No images found for sunglasses with id ${sunglass._id}`);
            }
          } catch (error) {
            console.error(`Failed to fetch details for sunglasses with id ${sunglass._id}:`, error);
          }
        }
      }
    },
    viewSunglassesDetails(id) {
      if(!id) {
        Logger.error("Invalid sunglasses ID")
        return
      }
      try {
        this.$router.push(`/sunglasses/view/${id}`)
      } catch (error) {
        Logger.error(error)
      }
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

