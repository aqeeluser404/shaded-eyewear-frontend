<template>
  <q-page>
    <section class="gradient-bg q-px-md text-light q-md-px-0">
      <div class="constrain">
        <div class="section-spacer-sm"></div>

        <div>
          <div class="overline text-dimmed text-caption q-mb-sm">
            STEP 1 OF 2
          </div>
          <div class="font-size-responsive-giant archivo text-light text-bold">
            YOUR CART
          </div>
          <div class="section-spacer-sm"></div>
        </div>

        <div class="row justify-between items-start">
          <!-------------------------------------------------------- LEFT: ORDER DETAILS -------------------------------------------------------->
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
                <p class="font-size-responsive-md archivo">ORDER DETAILS</p>
                <q-btn
                  v-if="!loading && currentOrderId !== null"
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

              <!----------------------------------- LOADING SKELETON ----------------------------------->
              <div v-if="loading">
                <div class="row justify-between items-center q-py-lg q-px-md">
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
                      <div class="skeleton-line skeleton-line--full"></div>
                    </div>
                  </div>
                  <div
                    class="col-md-2 col-12 row justify-center q-mt-md q-mt-md-none"
                  >
                    <div class="skeleton-line skeleton-line--sm"></div>
                  </div>
                </div>
              </div>

              <!----------------------------------- REAL ITEMS ----------------------------------->
              <div
                v-else-if="
                  order.sunglassesDetails &&
                  order.sunglassesDetails.length > 0 &&
                  currentOrderId !== null
                "
              >
                <div
                  v-for="(sunglass, index) in order.sunglassesDetails"
                  :key="sunglass._id"
                  class="q-py-lg q-px-md"
                  :style="
                    index !== order.sunglassesDetails.length - 1
                      ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.2)'
                      : ''
                  "
                >
                  <div class="row items-start">
                    <!-- Product Image -->
                    <div class="col-auto">
                      <q-img
                        :src="getImageUrl(sunglass.images[0].imageUrl)"
                        alt="Sunglass Image"
                        class="border cursor-pointer"
                        style="width: 110px; border-radius: 6px;"
                        @click="viewSunglassesDetails(sunglass._id)"
                      />
                    </div>

                    <!-- Product Details -->
                    <div class="col q-pl-md column justify-between" style="min-height: 100px;">
                      <div>
                        <div
                          class="font-size-responsive-sm archivo text-uppercase cursor-pointer"
                          @click="viewSunglassesDetails(sunglass._id)"
                        >
                          <b>{{ capitalizeFirstLetter(sunglass.model) }}</b>
                        </div>
                        <div class="font-size-responsive-sm q-mt-sm text-dimmed limit-text-2">
                          {{ capitalizeFirstLetter(sunglass.description) }}
                        </div>
                      </div>

                      <!-- Controls Row -->
                      <div class="row items-center justify-between q-mt-sm">

                        <!-- Left side: Quantity Pill + Trash -->
                        <div class="row items-center">
                          <!-- Quantity Pill -->
                          <div class="quantity-pill row items-center no-wrap q-px-sm q-py-xs">
                            <q-btn
                              round dense flat
                              icon="eva-minus-outline"
                              color="grey" size="sm"
                              class="q-pa-none"
                              @click="updateQuantity(sunglass, sunglass.quantity - 1)"
                              :disable="sunglass.quantity <= 1 || updatingQty"
                            />
                            <span class="archivo text-light q-mx-sm" style="min-width: 16px; text-align: center; font-size: 13px;">
                              {{ sunglass.quantity }}
                            </span>
                            <q-btn
                              round dense flat
                              icon="eva-plus-outline"
                              color="grey" size="sm"
                              class="q-pa-none"
                              @click="updateQuantity(sunglass, sunglass.quantity + 1)"
                              :disable="updatingQty"
                            />
                          </div>

                          <!-- Trash Icon -->
                          <q-btn
                            flat dense round
                            icon="eva-trash-2-outline"
                            color="grey-7" size="sm"
                            class="q-ml-md q-pa-none"
                            @click="removeItem(sunglass)"
                            :disable="updatingQty"
                          />
                        </div>

                        <!-- Right side: Price -->
                        <div class="text-gradient-primary archivo font-size-responsive-sm text-bold large-screen-only">
                          R {{ sunglass.price * sunglass.quantity }}.00
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!----------------------------------- EMPTY ----------------------------------->
              <div v-else class="column items-center q-py-xl q-px-md">
                <div class="section-spacer-sm"></div>
                <div class="font-size-responsive-sm text-dimmed q-mb-md">
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

          <!-------------------------------------------------------- RIGHT: CART SUMMARY -------------------------------------------------------->
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
                <p class="font-size-responsive-md archivo">CART SUMMARY</p>
              </q-card-section>

              <div class="q-py-lg q-px-md">
                <q-card-section
                  class="row items-end justify-between q-pa-none q-mb-md"
                >
                  <template v-if="loading">
                    <div class="skeleton-line skeleton-line--md"></div>
                    <div class="skeleton-line skeleton-line--md"></div>
                  </template>

                  <template v-else>
                    <div class="overline text-dimmed text-caption">
                      <b>TOTAL:</b> {{ order.totalItems || 0 }} item(s)
                    </div>
                    <div
                      class="font-size-responsive-xl archivo text-gradient-primary"
                    >
                      R {{ order.totalAmount || 0 }}.00
                    </div>
                  </template>
                </q-card-section>

                <div class="column items-center">
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

                  <template v-else>
                    <q-btn
                      rounded
                      dense
                      text-color="dark"
                      no-caps
                      to="/buy/review"
                      label="Proceed to checkout"
                      class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mb-sm"
                      style="width: 100%"
                      :disable="
                        currentOrderId === null || order.totalItems === 0
                      "
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
                  </template>
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
              <q-card-section class="row items-center font-size-responsive-sm">
                <q-icon name="credit_card" color="primary" class="q-mr-md" />
                <div style="opacity: 0.9" class="text-dimmed">
                  Payments made with Yoco
                </div>
              </q-card-section>
              <q-card-section class="row items-center font-size-responsive-sm">
                <q-icon name="local_shipping" color="primary" class="q-mr-md" />
                <div style="opacity: 0.9" class="text-dimmed">
                  Fast and reliable
                </div>
              </q-card-section>
              <q-card-section class="row items-center font-size-responsive-sm">
                <q-icon name="store" color="primary" class="q-mr-md" />
                <div style="opacity: 0.9" class="text-dimmed">
                  Pickup at our doorstep available
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
import Helper from "../services/utils";
import UserService from "src/services/UserService";
import OrderService from "src/services/OrderService";
import SunglassesService from "src/services/SunglassesService";
import { UiAlerts } from "src/services/UiAlerts";

export default {
  data() {
    return {
      order: {},
      currentOrderId: localStorage.getItem("currentOrderId") || null,
      userDetails: {},
      userTokenDetails: { _id: "", username: "", userType: "" },
      loading: true,
      updatingQty: false,
    };
  },

  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    formateOrderId: Helper.formateOrderId,

    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },

    async updateQuantity(sunglass, newQuantity) {
      if (newQuantity < 1 || this.updatingQty) return;

      this.updatingQty = true;

      try {
        // 1. Build the clean array from the UI details (guaranteed to be unique)
        const cleanSunglassesArray = this.order.sunglassesDetails.map((s) => {
          if (String(s._id) === String(sunglass._id)) {
            return { _id: s._id, quantity: newQuantity };
          }
          return { _id: s._id, quantity: s.quantity };
        });

        // 2. Send to backend
        const payload = {
          sunglasses: cleanSunglassesArray,
          user: this.userDetails._id,
        };

        await OrderService.updateOrder(this.currentOrderId, payload);

        // 3. Refresh
        await this.getCurrentOrder();
      } catch (error) {
        console.error("Error updating quantity:", error);
        UiAlerts.error("Could not update quantity.");
        await this.getCurrentOrder();
      } finally {
        this.updatingQty = false;
      }
    },

    async removeItem(sunglass) {
      if (this.updatingQty) return;

      if (this.order.sunglassesDetails.length === 1) {
        this.cancelOrder(this.order._id);
        return;
      }

      this.updatingQty = true;
      try {
        const cleanSunglassesArray = this.order.sunglassesDetails
          .filter((s) => String(s._id) !== String(sunglass._id))
          .map((s) => ({ _id: s._id, quantity: s.quantity }));

        const payload = {
          sunglasses: cleanSunglassesArray,
          user: this.userDetails._id,
        };

        await OrderService.updateOrder(this.currentOrderId, payload);
        await this.getCurrentOrder();
        UiAlerts.success("Item removed.");
      } catch (error) {
        console.error("Error removing item:", error);
        UiAlerts.error("Could not remove item.");
        await this.getCurrentOrder();
      } finally {
        this.updatingQty = false;
      }
    },

    async cancelOrder(orderId) {
      UiAlerts.confirmDelete(
        "Empty Cart",
        "You are about to empty your cart. Are you sure you want to continue?",
        "Empty Cart"
      ).onOk(async () => {
        this.$q.loading.show({ message: "Emptying cart..." });
        try {
          await OrderService.cancelOrder(orderId);
          await OrderService.deleteOrder(orderId);
          localStorage.removeItem("currentOrderId");
          this.order = {};
          window.location.reload();
        } catch (error) {
          console.error(error);
          UiAlerts.error("Could not empty cart. Please try again.");
        } finally {
          this.$q.loading.hide();
        }
      });
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
        localStorage.removeItem("currentOrderId");
        this.currentOrderId = null;
      }
      this.loading = false;
    },

    async getSunglasses() {
      if (this.order.sunglasses && this.order.sunglasses.length > 0) {
        this.order.sunglassesDetails = [];

        // Group items by ID to absolutely guarantee no duplicates in the UI
        const groupedItems = {};
        this.order.sunglasses.forEach((item) => {
          const idStr = String(item._id);
          if (groupedItems[idStr]) {
            groupedItems[idStr].quantity += item.quantity || 1;
          } else {
            groupedItems[idStr] = {
              _id: item._id,
              quantity: item.quantity || 1,
            };
          }
        });

        for (const key in groupedItems) {
          try {
            const response = await SunglassesService.findSunglassesById(key);
            if (response && response.images && response.images.length > 0) {
              response.image = this.getImageUrl(response.images[0]);
              response.quantity = groupedItems[key].quantity;
              this.order.sunglassesDetails.push(response);
            }
          } catch (error) {
            console.error(`Failed to fetch details for ${key}:`, error);
          }
        }
      }
    },

    async getUserDetails() {
      try {
        const hasCookie = await Helper.checkCookie();
        const token = hasCookie ? await Helper.getCookie("token") : null;

        if (!token) {
          this.loading = false;
          UiAlerts.info("Please login to view your cart");
          return;
        }

        const id = await UserService.FindUserByToken();
        if (!id?._id) {
          this.loading = false;
          UiAlerts.info("Please login to view your cart");
          return;
        }

        this.userTokenDetails = id;
        this.userDetails = await UserService.findUserById(id._id);

        await this.getCurrentOrder();
      } catch (error) {
        this.loading = false;
        UiAlerts.info("Please login to view your cart");
      }
    },
  },

  created() {
    this.getUserDetails();
  },
};
</script>

<style lang="sass" scoped>
.quantity-pill
  border: 1px solid rgba(255, 255, 255, 0.2)
  border-radius: 999px
  background-color: transparent
  height: 32px
</style>
