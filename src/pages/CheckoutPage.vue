<template>
  <q-page>
    <template v-if="!loading">
      <section class="gradient-bg q-px-md text-light q-md-px-0">
        <div class="constrain">
          <div class="section-spacer-sm"></div>

          <div>
            <div class>
              <div class="overline text-dimmed text-caption">STEP 2 OF 2</div>
              <div
                class="font-size-responsive-giant archivo text-light text-bold"
              >
                COLLECT
              </div>
              <div class="section-spacer-sm"></div>
            </div>
          </div>

          <div class="row justify-between items-start">
            <div
              class="col-12 col-md-7"
              :class="$q.screen.gt.md ? ' q-mb-none' : 'q-mb-lg'"
            >
              <q-card
                flat
                bordered
                class="bg-dark-secondary full-height q-mr-none q-mr-md-lg"
                style="border: 1px solid rgba(255, 255, 255, 0.2)"
              >
                <q-card-section
                  class="row items-center justify-between"
                  style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <p class="font-size-responsive-md archivo">
                    HOW YOU'D LIKE IT
                  </p>
                </q-card-section>

                <q-card-section
                  style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <div class="row q-col-gutter-md">
                    <!-- ============================== -->
                    <!-- DOORSTEP PICKUP CARD -->
                    <!-- ============================== -->
                    <div class="col-md-6 col-12">
                      <q-card
                        flat
                        bordered
                        class="bg-transparent option-card cursor-pointer full-height q-pa-md"
                        :class="{
                          'option-card--selected': orderType === 'pickup',
                        }"
                        @click="togglePickupPanel"
                      >
                        <div class="row items-center q-mb-md">
                          <q-radio
                            :model-value="orderType"
                            val="pickup"
                            @click.stop="togglePickupPanel"
                            color="primary"
                            class="q-mr-sm"
                          />
                          <div
                            class="archivo text-uppercase font-size-responsive-sm"
                          >
                            <b>Doorstep Pickup</b>
                          </div>
                        </div>

                        <div class="text-subtitle1 text-dimmed q-mb-sm">
                          65 Stockley Road<br />
                          Kenwyn, Cape Town, 7779
                        </div>

                        <div class="text-caption  text-primary">
                          <b>OPEN WEEKDAYS 08:00 – 17:00</b>
                        </div>
                      </q-card>
                    </div>

                    <!-- ============================== -->
                    <!-- CAPE TOWN DELIVERY CARD -->
                    <!-- ============================== -->
                    <div class="col-md-6 col-12">
                      <q-card
                        flat
                        bordered
                        class="bg-transparent option-card cursor-pointer full-height q-pa-md"
                        :class="{
                          'option-card--selected': orderType === 'delivery',
                        }"
                        @click="toggleDeliveryPanel"
                      >
                        <div class="row items-center q-mb-md">
                          <q-radio
                            :model-value="orderType"
                            val="delivery"
                            @click.stop="toggleDeliveryPanel"
                            color="primary"
                            class="q-mr-sm"
                          />
                          <div
                            class="archivo text-uppercase font-size-responsive-sm"
                          >
                            <b>Cape Town Delivery</b>
                          </div>
                        </div>

                        <div class="text-subtitle1 text-dimmed q-mb-sm">
                          Courier to your address<br />
                          Tracked, 1–2 working days
                        </div>

                        <div class="text-caption text-primary">
                          <b>FREE ON ORDERS OVER R 400</b>
                        </div>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="font-size-responsive-md archivo q-mb-sm">
                    PICKUP INSTRUCTIONS
                  </div>
                  <p class="text-subtitle1 text-dimmed">
                    Bring the order ID from your confirmation email. If anything
                    changes, message us through the contact form and we'll hold
                    your frame for seven days. Thank you for shopping with us.
                  </p>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-5">
              <q-card
                flat
                bordered
                class="bg-dark-secondary full-height q-mb-lg"
                style="border: 1px solid rgba(255, 255, 255, 0.2)"
              >
                <q-card-section
                  class="row items-center justify-between"
                  style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <p class="font-size-responsive-md archivo">ORDER SUMMARY</p>
                </q-card-section>

                <div class="q-py-lg q-px-md">
                  <q-card-section
                    class="row items-end justify-between q-pa-none q-mb-md"
                  >
                    <div class="overline text-dimmed text-caption">
                      <b>TOTAL:</b> {{ order.totalItems }} item(s)
                    </div>
                    <div
                      class="font-size-responsive-xl archivo text-gradient-primary"
                    >
                      R {{ order.totalAmount }}.00
                    </div>
                  </q-card-section>
                  <div class="column items-center">
                    <q-btn
                      rounded
                      dense
                      text-color="dark"
                      no-caps
                      label="Pay with Yoco"
                      class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mb-sm"
                      style="width: 100%"
                      @click="initiatePayment"
                      :disable="orderType === 'delivery'"
                    />
                    <q-btn
                      rounded
                      dense
                      flat
                      icon="eva-lock-outline"
                      class="q-px-lg q-py-sm custom-button text-subtitle1"
                      label="Secure Checkout"
                      no-caps
                    />
                  </div>
                </div>
              </q-card>

              <!-- review your items -->
              <q-card
                flat
                bordered
                class="bg-dark-secondary"
                style="border: 1px solid rgba(255, 255, 255, 0.2)"
              >
                <q-card-section
                  class="row items-center justify-between"
                  style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <p class="font-size-responsive-md archivo">
                    REVIEW YOUR ITEMS
                  </p>
                </q-card-section>

                <q-card-section
                  v-if="
                    order.sunglassesDetails &&
                    order.sunglassesDetails.length > 0 &&
                    currentOrderId !== null
                  "
                >
                  <div
                    v-for="(sunglass, index) in order.sunglassesDetails"
                    :key="sunglass._id"
                    class="row justify-between items-center cursor-pointer q-py-lg q-px-md"
                    :style="
                      index !== order.sunglassesDetails.length - 1
                        ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.2)'
                        : ''
                    "
                    @click="viewSunglassesDetails(sunglass._id)"
                  >
                    <div class="col-md-10 col-12 row items-start">
                      <div class="col-md-2 col-4">
                        <div class="q-mr-md">
                          <q-img
                            :src="getImageUrl(sunglass.images[0].imageUrl)"
                            alt="Sunglass Image"
                            class="border"
                          />
                        </div>
                      </div>

                      <div class="col-md-10 col-8 column items-start">
                        <div
                          class="font-size-responsive-md archivo text-uppercase"
                        >
                          <b>{{ capitalizeFirstLetter(sunglass.model) }}</b>
                        </div>
                        <div
                          class="col-md-2 col-12 text-subtitle1 text-dimmed text-center"
                        >
                          {{ sunglass.quantity }} x R {{ sunglass.price }}.00
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div class="section-spacer-md"></div>
      </section>
    </template>

    <div v-else class="full-width flex flex-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>
  </q-page>
</template>

<script>
import UserService from "src/services/UserService";
import OrderService from "src/services/OrderService";
import PayService from "src/services/PayService";
import SunglassesService from "src/services/SunglassesService";
import Helper from "../services/utils";

export default {
  beforeRouteEnter: Helper.beforeRouteEnterUser,
  data() {
    return {
      order: {},
      currentOrderId: localStorage.getItem("currentOrderId") || null,
      userDetails: {
        location: {
          streetAddress: "",
          suburb: "",
          city: "",
          province: "",
          postalCode: "",
        },
      },
      userAddress: {
        location: {
          streetAddress: "",
          suburb: "",
          city: "",
          province: "",
          postalCode: "",
        },
      },
      cityOptions: [
        { label: "Cape Town", value: "Cape Town" },
        { label: "johannesburg", value: "johannesburg" },
      ],
      userTokenDetails: { _id: "", username: "", userType: "" },
      orderType: null,
      pickupPanel: false,
      deliveryPanel: false,
      loading: true,
    };
  },
  created() {
    this.getUserDetails();
  },
  methods: {
    getImageUrl: Helper.getImageUrl,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },
    togglePickupPanel() {
      this.pickupPanel = !this.pickupPanel;
      this.deliveryPanel = false;
      this.orderType = "pickup";
    },
    toggleDeliveryPanel() {
      this.deliveryPanel = true;
      this.pickupPanel = false;
      this.orderType = "delivery";
    },
    async addAddress() {
      const updatedUser = {
        location: this.userAddress.location,
      };
      this.$q
        .dialog({
          title: "Confirm",
          message: `You are about to update your address, continue?`,
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          const isValid = await this.validateAddress();
          if (isValid) {
            await UserService.updateUserDetails(
              this.userDetails._id,
              updatedUser
            );
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: "Update successful!",
            });
            this.getUserDetails();
            this.addAddressPanel = false;
          } else {
            this.$q.notify({
              type: "negative",
              message: "Update failed. Please try again.",
            });
          }
        })
        .onCancel(() => {
          this.getUserDetails();
          return;
        });
    },
    // when i implement delivery, ensure that the ordertype is execute after a successful payment
    async initiatePayment() {
      try {
        if (this.orderType === null) {
          this.$q.notify({
            type: "negative",
            color: "red",
            message: "Please choose your order type.",
          });
          return;
        }
        if (this.userDetails.verification.isVerified === false) {
          this.$q.notify({
            type: "negative",
            color: "red",
            message: "Please verify your email before continuing.",
          });
          return;
        }
        if (this.orderType === "pickup") {
          await this.createPickup();
        }
        if (this.orderType === "delivery") {
          await this.createDelivery();
        }
        const response = await PayService.initiatePayment(this.currentOrderId);
        const { checkout } = response;
        // console.log('Checkout URL:', checkout.redirectUrl); // Add this line to log the checkout URL
        window.location.href = checkout.redirectUrl; // Redirect to Yoco checkout page
      } catch (error) {
        console.error("Payment initiation failed:", error);
      }
    },
    async createPickup() {
      try {
        await OrderService.createPickup(this.currentOrderId);
      } catch (error) {
        console.error("Creating pickup failed:", error);
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
    async getCurrentOrder() {
      this.loading = true;
      const response = await OrderService.findOrderById(this.currentOrderId);
      this.order = response;
      await this.getSunglasses();
      this.loading = false;
    },
    async getSunglasses() {
      if (this.order.sunglasses && this.order.sunglasses.length > 0) {
        // ✅ Count how many times each sunglass _id appears
        const quantityMap = {};
        this.order.sunglasses.forEach((sunglass) => {
          const id = String(sunglass._id);
          quantityMap[id] = (quantityMap[id] || 0) + 1;
        });

        this.order.sunglassesDetails = [];

        // ✅ Track which IDs we've already added (avoid duplicates)
        const seenIds = new Set();

        for (const sunglass of this.order.sunglasses) {
          const id = String(sunglass._id);
          if (seenIds.has(id)) continue; // skip duplicates
          seenIds.add(id);

          try {
            const response = await SunglassesService.findSunglassesById(
              sunglass._id
            );
            if (response && response.images && response.images.length > 0) {
              response.image = this.getImageUrl(response.images[0]);
              response.quantity = quantityMap[id]; // ✅ attach quantity
              this.order.sunglassesDetails.push(response);
            } else {
              console.error(
                `No images found for sunglasses with id ${sunglass._id}`
              );
            }
          } catch (error) {
            console.error(
              `Failed to fetch details for sunglasses with id ${sunglass._id}:`,
              error
            );
          }
        }
      }
    },
    async getUserDetails() {
      const id = await UserService.FindUserByToken();
      this.userTokenDetails = id;
      const user = await UserService.findUserById(this.userTokenDetails._id);
      this.userDetails = user;

      this.getCurrentOrder();
    },
  },
};
</script>

<style scoped>
.option-card {
  transition: all 0.2s ease;
  border-color: rgba(255, 255, 255, 0.15);
}

.option-card:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.option-card--selected {
  border-color: #ff9800; /* or your primary color */
  background-color: rgba(255, 152, 0, 0.05);
}
</style>
