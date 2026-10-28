<template>
  <q-page>
    <section class="gradient-bg q-px-md text-light q-md-px-0">
      <div class="constrain">
        <div class="section-spacer-sm"></div>

        <div>
          <div class="overline text-dimmed text-caption q-mb-sm">
            STEP 2 OF 2
          </div>
          <div class="font-size-responsive-giant archivo text-light text-bold">
            COLLECT
          </div>
          <div class="section-spacer-sm"></div>
        </div>

        <div class="row justify-between items-start">
          <!-------------------------------------------------------- LEFT: ORDER TYPE -------------------------------------------------------->
          <div
            class="col-12 col-md-8"
            :class="$q.screen.gt.md ? 'q-mb-none' : 'q-mb-lg'"
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
                <p class="font-size-responsive-md archivo">HOW YOU'D LIKE IT</p>
              </q-card-section>

              <!----------------------------------- LOADING SKELETON ----------------------------------->
              <template v-if="loading">
                <q-card-section
                  style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <div class="row q-col-gutter-md">
                    <div
                      v-for="n in 2"
                      :key="'skel-option-' + n"
                      class="col-md-6 col-12"
                    >
                      <q-card
                        flat
                        bordered
                        class="bg-transparent option-card full-height q-pa-md"
                        style="border-color: rgba(255, 255, 255, 0.15)"
                      >
                        <div class="row items-center q-mb-md">
                          <div
                            class="skeleton-line skeleton-line--avatar q-mr-sm"
                          ></div>
                          <div class="skeleton-line skeleton-line--md"></div>
                        </div>
                        <div
                          class="skeleton-line skeleton-line--full q-mb-sm"
                        ></div>
                        <div
                          class="skeleton-line skeleton-line--md q-mb-md"
                        ></div>
                        <div class="skeleton-line skeleton-line--sm"></div>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="skeleton-line skeleton-line--md q-mb-md"></div>
                  <div class="skeleton-line skeleton-line--full q-mb-sm"></div>
                  <div class="skeleton-line skeleton-line--full q-mb-sm"></div>
                  <div class="skeleton-line skeleton-line--md"></div>
                </q-card-section>
              </template>

              <!----------------------------------- REAL CONTENT ----------------------------------->
              <template v-else>
                <q-card-section
                  style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <div class="row q-col-gutter-md">
                    <!-- DOORSTEP PICKUP -->
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
                        <div class="row items-center q-mb-sm">
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

                        <div
                          class="font-size-responsive-sm text-dimmed q-mb-md line-height-1-6"
                        >
                          [Street Address]<br />
                          Cape Town, South Africa
                        </div>

                        <div class="text-caption statement-label text-primary">
                          <b>OPEN WEEKDAYS 08:00 - 17:00</b>
                        </div>
                      </q-card>
                    </div>

                    <!-- CAPE TOWN DELIVERY -->
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
                        <div class="row items-center q-mb-sm">
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

                        <div
                          class="font-size-responsive-sm text-dimmed q-mb-md line-height-1-6"
                        >
                          Courier to your address <br />
                          tracked, 1 - 2 working days
                        </div>

                        <div class="text-caption text-primary statement-label">
                          <b>FREE ON ORDERS OVER R 400</b>
                        </div>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="font-size-responsive-sm archivo q-mb-md">
                    PICKUP INSTRUCTIONS
                  </div>
                  <p class="font-size-responsive-sm text-dimmed">
                    Bring the order ID from your confirmation email. If anything
                    changes, message us through the contact form and we'll hold
                    your frame for seven days. Thank you for shopping with us.
                  </p>
                </q-card-section>
              </template>
            </q-card>
          </div>

          <!-------------------------------------------------------- RIGHT: SUMMARY + ITEMS -------------------------------------------------------->
          <div class="col-12 col-md-4">
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
                  <!-- skeleton totals -->
                  <template v-if="loading">
                    <div class="skeleton-line skeleton-line--md"></div>
                    <div class="skeleton-line skeleton-line--md"></div>
                  </template>

                  <!-- real totals -->
                  <template v-else>
                    <div class="overline text-dimmed text-caption">
                      <b>TOTAL:</b> {{ order.totalItems }} item(s)
                    </div>
                    <div
                      class="font-size-responsive-xl archivo text-gradient-primary"
                    >
                      R {{ order.totalAmount }}.00
                    </div>
                  </template>
                </q-card-section>

                <div class="column items-center">
                  <!-- skeleton buttons -->
                  <template v-if="loading">
                    <div
                      class="skeleton-line skeleton-line--btn q-mb-sm"
                      style="width: 100%"
                    ></div>
                    <div
                      class="skeleton-line skeleton-line--btn"
                      style="width: 60%"
                    ></div>
                  </template>

                  <!-- real buttons -->
                  <template v-else>
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
                      class="custom-button icon-btn text-subtitle1 text-light"
                      label="Secure Checkout"
                      no-caps
                    />
                  </template>
                </div>
              </div>
            </q-card>

            <!-- review items -->
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
                <p class="font-size-responsive-md archivo">REVIEW YOUR ITEMS</p>
              </q-card-section>

              <!----------------------------------- LOADING SKELETON ----------------------------------->
              <q-card-section v-if="loading">
                <div
                  v-for="n in 1"
                  :key="'skel-review-' + n"
                  class="row justify-between items-center q-py-lg q-px-md"
                  :style="
                    n !== 1
                      ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.2)'
                      : ''
                  "
                >
                  <div class="col-md-10 col-12 row items-start">
                    <div class="col-md-2 col-4">
                      <div class="q-mr-md">
                        <div
                          class="skeleton-line skeleton-line--thumb-sm"
                        ></div>
                      </div>
                    </div>

                    <div class="col-md-10 col-8 column items-start">
                      <div
                        class="skeleton-line skeleton-line--md q-mb-sm"
                      ></div>
                      <div class="skeleton-line skeleton-line--sm"></div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <!----------------------------------- REAL ITEMS ----------------------------------->
              <q-card-section
                v-else-if="
                  order.sunglassesDetails &&
                  order.sunglassesDetails.length > 0 &&
                  currentOrderId !== null
                "
                class="q-px-none q-py-none"
              >
                <div
                  v-for="(sunglass, index) in order.sunglassesDetails"
                  :key="sunglass._id"
                  class="row justify-start items-center cursor-pointer q-py-lg q-px-md"
                  :style="
                    index !== order.sunglassesDetails.length - 1
                      ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.2)'
                      : ''
                  "
                  @click="viewSunglassesDetails(sunglass._id)"
                >
                  <div class="col-auto">
                    <q-img
                      :src="getImageUrl(sunglass.images[0].imageUrl)"
                      alt="Sunglass Image"
                      class="border"
                      style="width: 70px; border-radius: 4px"
                    />
                  </div>

                  <div class="col column items-start q-pl-md">
                    <div
                      class="font-size-responsive-sm archivo text-uppercase q-mb-xs"
                    >
                      <b>{{ capitalizeFirstLetter(sunglass.model) }}</b>
                    </div>
                    <div class="font-size-responsive-xs text-dimmed">
                      {{ sunglass.quantity }} x R {{ sunglass.price }}.00
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
  </q-page>
</template>

<script>
import UserService from "src/services/UserService";
import OrderService from "src/services/OrderService";
import PayService from "src/services/PayService";
import SunglassesService from "src/services/SunglassesService";
import Helper from "../services/utils";
import { UiAlerts } from "src/services/UiAlerts";

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
      orderType: "pickup",
      pickupPanel: false,
      deliveryPanel: false,
      loading: true,
    };
  },

  computed: {
    isGuest() {
      return Helper.isGuest(this.userDetails);
    },
  },

  created() {
    this.getUserDetails();
  },

  methods: {
    getImageUrl: Helper.getImageUrl,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    formateOrderId: Helper.formateOrderId,

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
      UiAlerts.confirm(
        "Confirm",
        "You are about to update your address, continue?",
        "Update Address"
      )
        .onOk(async () => {
          const isValid = await this.validateAddress();

          if (isValid) {
            await UserService.updateUserDetails(
              this.userDetails._id,
              updatedUser
            );
            UiAlerts.success("Update successful!");
            this.getUserDetails();
            this.addAddressPanel = false;
          } else {
            UiAlerts.error("Update failed. Please try again.");
          }
        })
        .onCancel(() => {
          this.getUserDetails();
          return;
        });
    },

    async initiatePayment() {
      try {
        if (this.orderType === null) {
          UiAlerts.error("Please choose your order type.");
          return;
        }
        if (
          !this.isGuest &&
          this.userDetails.verification?.isVerified === false
        ) {
          UiAlerts.error("Please verify your email before continuing.");
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
        window.location.href = checkout.redirectUrl;
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

    async getCurrentOrder() {
      if (!this.currentOrderId) {
        this.loading = false;
        return;
      }

      try {
        const response = await OrderService.findOrderById(this.currentOrderId);
        if (response) {
          this.order = response;
          await this.getSunglasses();
        } else {
          throw new Error("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order: ", error);
        localStorage.removeItem("currentOrderId");
        this.currentOrderId = null;
      }

      this.loading = false;
    },

    async getSunglasses() {
      if (this.order.sunglasses && this.order.sunglasses.length > 0) {
        this.order.sunglassesDetails = [];

        // Since the backend now guarantees unique items in the array,
        // we can just loop through them directly!
        for (const sunglass of this.order.sunglasses) {
          try {
            const response = await SunglassesService.findSunglassesById(
              sunglass._id
            );
            if (response && response.images && response.images.length > 0) {
              response.image = this.getImageUrl(response.images[0]);

              response.quantity = sunglass.quantity || 1;

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

.option-card:not(.option-card--selected):hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.option-card--selected,
.option-card--selected:hover {
  border-color: #ff9800;
  background-color: rgba(255, 152, 0, 0.05);
}

.option-card {
  transition: all 0.2s ease;
  border-color: rgba(255, 255, 255, 0.15);
}

.option-card:not(.option-card--selected):hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.option-card--selected,
.option-card--selected:hover {
  border-color: #ff9800;
  background-color: rgba(255, 152, 0, 0.05);
}

:deep(.q-radio__inner) {
  color: #9b9b9b !important; /* Light grey */
}

:deep(.q-radio__inner--truthy) {
  color: var(--q-primary) !important; /* Orange */
}
</style>
