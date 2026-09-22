<template>
  <q-page>
    <template v-if="!loading">
      <section class="gradient-bg q-px-md text-light q-md-px-0">
        <div class="constrain">
          <div class="section-spacer-sm"></div>

          <div class="">
            <div class="">
              <div class="overline text-dimmed text-caption">STEP 1 OF 2</div>
              <div
                class="font-size-responsive-giant archivo text-light text-bold"
              >
                YOUR CART
              </div>
              <div class="section-spacer-sm"></div>
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
                    <p class="font-size-responsive-md archivo">ORDER DETAILS</p>
                    <q-btn
                      v-if="currentOrderId !== null"
                      @click="cancelOrder(order._id)"
                      class="custom-button text-caption text-light"
                      label="CLEAR CART"
                      :ripple="false"
                      no-caps
                      dense
                      flat
                      rounded
                    />
                  </q-card-section>

                  <div
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
                          <div class="text-subtitle1 text-dimmed limit-text-2">
                            {{ capitalizeFirstLetter(sunglass.description) }}
                          </div>
                        </div>
                      </div>

                      <div
                        class="col-md-2 col-12 text-gradient-primary archivo text-center"
                      >
                        R {{ sunglass.price }}.00
                      </div>
                    </div>
                  </div>

                  <div v-else class="column items-center q-py-xl q-px-md">
                    <div class="section-spacer-sm"></div>

                    <div class="text-subtitle1 text-dimmed q-mb-md">
                      Your cart is empty.
                    </div>

                    <div>
                      <q-btn
                        rounded
                        dense
                        text-color="dark"
                        no-caps
                        to="/sunglasses"
                        label="Browse frames"
                        class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mb-sm"
                        style="width: 100%"
                      />
                    </div>
                    <div class="section-spacer-sm"></div>
                  </div>
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
                    <p class="font-size-responsive-md archivo">CART SUMMARY</p>
                  </q-card-section>

                  <div class="q-py-lg q-px-md">
                    <q-card-section
                      class="row items-end justify-between q-pa-none q-mb-md"
                    >
                      <div class="overline text-dimmed text-caption">
                        <b>TOTAL:</b> {{ order.totalItems || 0 }} item(s)
                      </div>
                      <div
                        class="font-size-responsive-xl archivo text-gradient-primary"
                      >
                        R {{ order.totalAmount || 0 }}.00
                      </div>
                    </q-card-section>
                    <div class="column items-center">
                      <q-btn
                        rounded
                        dense
                        text-color="dark"
                        no-caps
                        to="/buy/review"
                        label="Proceed to checkout"
                        class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mb-sm"
                        style="width: 100%"
                        :disable="currentOrderId === null"
                      />
                      <q-btn
                        rounded
                        dense
                        flat
                        to="/sunglasses"
                        class="q-px-lg q-py-sm custom-button text-subtitle1"
                        label="Continue Shopping"
                        no-caps
                      />
                    </div>
                  </div>
                </q-card>

                <!-- qualities panel -->
                <q-card
                  flat
                  bordered
                  class="bg-dark-secondary q-pa-sm"
                  style="border: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <q-card-section class="row items-center text-subtitle1">
                    <q-icon
                      name="credit_card"
                      color="primary"
                      class="q-mr-md"
                    />
                    <div style="opacity: 0.9" class="text-dimmed">
                      Payments made with Yoco
                    </div>
                  </q-card-section>
                  <q-card-section class="row items-center text-subtitle1">
                    <q-icon
                      name="local_shipping"
                      color="primary"
                      class="q-mr-md"
                    />
                    <div style="opacity: 0.9" class="text-dimmed">
                      Fast and reliable
                    </div>
                  </q-card-section>
                  <q-card-section class="row items-center text-subtitle1">
                    <q-icon name="store" color="primary" class="q-mr-md" />
                    <div style="opacity: 0.9" class="text-dimmed">
                      Pickup at our doorstep available
                    </div>
                  </q-card-section>
                </q-card>
              </div>
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
import Helper from "../services/utils";
import UserService from "src/services/UserService";
import OrderService from "src/services/OrderService";
import SunglassesService from "src/services/SunglassesService";
import Logger from "src/services/Logger";

export default {
  data() {
    return {
      order: {},
      currentOrderId: localStorage.getItem("currentOrderId") || null,
      userDetails: {},
      userTokenDetails: { _id: "", username: "", userType: "" },
      loading: true,
    };
  },

  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },
    async cancelOrder(orderId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: `You are about to empty your cart, continue?`,
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            await OrderService.cancelOrder(orderId);
            await OrderService.deleteOrder(orderId); // temporary to keep database clean

            localStorage.removeItem("currentOrderId");
            this.order = {};
            window.location.reload();
          } catch (error) {
            console.error(error);
          }
        })
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    async getCurrentOrder() {
      this.loading = true;
      if (this.currentOrderId) {
        try {
          const response = await OrderService.findOrderById(
            this.currentOrderId
          );
          if (response) {
            this.order = response;
            await this.getSunglasses();
          } else {
            throw new Error("Order not found");
          }
        } catch (error) {
          if (error.response && error.response.status === 500) {
            console.error("Server error: ", error);
          } else {
            console.error("Error: ", error);
          }
          localStorage.removeItem("currentOrderId");
        }
      }
      this.loading = false;
    },
    async getSunglasses() {
      if (this.order.sunglasses && this.order.sunglasses.length > 0) {
        this.order.sunglassesDetails = [];
        for (const sunglass of this.order.sunglasses) {
          try {
            const response = await SunglassesService.findSunglassesById(
              sunglass._id
            );
            if (response && response.images && response.images.length > 0) {
              response.image = this.getImageUrl(response.images[0]);
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
      const token = await Helper.getCookie("token");
      if (token) {
        const id = await UserService.FindUserByToken();
        this.userTokenDetails = id;
        const user = await UserService.findUserById(this.userTokenDetails._id);
        this.userDetails = user;

        await this.getCurrentOrder();
      } else {
        this.loading = true;
        this.$q.notify({
          type: "info",
          color: "gradient-primary",
          message: "Please login to view your cart",
        });
        this.loading = false;
      }
    },
  },
  created() {
    this.getUserDetails();
  },
};
</script>
