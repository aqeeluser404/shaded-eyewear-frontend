<template>
  <div
    class="orders-details"
    :class="$q.screen.gt.sm ? 'q-pl-lg' : 'q-pl-none'"
  >
    <div class="section-spacer-xs small-screen-only"></div>

    <!--------------------------------------------------------------------- HAS ORDERS -------------------------------------------------->
    <section v-if="loading || orders.length > 0">
      <!-- Heading -->
      <div>
        <div class="font-size-responsive-xl archivo text-light text-bold">
          ORDER HISTORY
        </div>
        <div class="row justify-between items-center">
          <div class="font-size-responsive-sm text-dimmed q-mt-sm">
            Track your orders and collection status.
          </div>
          <q-btn
            v-if="!loading && hasPendingOrder"
            rounded
            no-caps
            outline
            label="AWAITING PAYMENT"
            color="orange"
            text-color="orange"
            class="q-px-lg q-py-sm text-caption rounded-button text-bold large-screen-only"
          />
          <q-btn
            v-else-if="!loading && hasReadyToCollectOrder"
            rounded
            no-caps
            outline
            label="READY TO COLLECT"
            color="green"
            text-color="green"
            class="q-px-lg q-py-sm text-caption rounded-button text-bold large-screen-only"
          />
        </div>
      </div>

      <div class="section-spacer-sm"></div>

      <div class="q-pb-md q-gutter-md">
        <!------------------------------------------ LOADING SKELETON ------------------------------------------>
        <template v-if="loading">
          <q-card
            v-for="n in 1"
            :key="'skel-' + n"
            flat
            bordered
            class="bg-dark-secondary"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <!-- meta skeleton -->
            <q-card-section
              class="row justify-between items-center"
              style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
            >
              <!-- Left: Order ID -->
              <div style="width: 30%">
                <div class="skeleton-line skeleton-line--xs q-mb-xs" style="width: 60%"></div>
                <div class="skeleton-line skeleton-line--md" style="width: 100%"></div>
              </div>

              <!-- Center: Placed Date -->
              <div style="width: 30%; text-align: center;">
                <div class="skeleton-line skeleton-line--xs q-mb-xs" style="width: 60%;"></div>
                <div class="skeleton-line skeleton-line--md" style="width: 100%"></div>
              </div>

              <!-- Right: Total -->
              <div class="column items-end" style="width: 30%">
                <div class="skeleton-line skeleton-line--xs q-mb-xs" style="width: 60%"></div>
                <div class="skeleton-line skeleton-line--sm" style="width: 100%"></div>
              </div>
            </q-card-section>

            <!-- item skeleton -->
            <q-card-section class="q-pa-none">
              <div class="q-py-lg q-px-md" style="border-bottom: 1px solid rgba(255, 255, 255, 0.1)">
                <!-- Top row: Image + Text -->
                <div class="row items-center">
                  <div class="col-auto">
                    <div class="skeleton-line skeleton-line--thumb-sm"></div>
                  </div>
                  <div class="col column items-start q-pl-md">
                    <div class="skeleton-line skeleton-line--md q-mb-sm" style="width: 50%"></div>
                    <div class="skeleton-line skeleton-line--sm" style="width: 30%"></div>
                  </div>
                </div>

                <!-- Bottom row: Button -->
                <div class="row q-mt-md q-mt-md-none">
                  <div class="col-12 col-md-auto">
                    <div class="skeleton-line skeleton-line--btn full-width" style="height: 36px; border-radius: 20px;"></div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <!-- footer skeleton -->
            <q-card-section
              class="order-footer"
              style="border-top: 1px solid rgba(255, 255, 255, 0.1)"
            >
              <div class="skeleton-line skeleton-line--md"></div>
              <div class="order-footer-actions">
                <div class="skeleton-line skeleton-line--btn"></div>
              </div>
            </q-card-section>
          </q-card>
        </template>

        <!------------------------------------------ REAL ORDERS ------------------------------------------>
        <template v-else>
          <q-card
            v-for="order in sortedOrders"
            :key="order._id"
            flat
            bordered
            class="bg-dark-secondary order-list-card"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <!-- order meta -->
            <q-card-section
              class="row justify-between items-center order-meta-row"
              style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
            >
              <div class="col-4">
                <div class="overline-tight text-dimmed text-caption q-mb-xs">
                  ORDER
                </div>
                <div>
                  <q-badge
                    outline
                    color="grey"
                    text-color="grey"
                    class="order-id-badge"
                  >
                    #{{ formateOrderId(order) }}
                  </q-badge>
                </div>
              </div>

              <div class="col-4 row justify-center">
                <div>
                  <div class="overline-tight text-dimmed text-caption q-mb-xs">
                    PLACED
                  </div>
                  <div class="text-subtitle1 text-dimmed">
                    {{ formatDate(order.orderDate) }}
                  </div>
                </div>
              </div>

              <div class="col-4 text-right">
                <div class="overline-tight text-dimmed text-caption q-mb-xs">
                  TOTAL
                </div>
                <div class="text-subtitle1 archivo text-gradient-primary">
                  R {{ order.totalAmount }}.00
                </div>
              </div>
            </q-card-section>

            <!-- items -->
            <q-card-section
              v-if="
                order.sunglassesDetails && order.sunglassesDetails.length > 0
              "
              class="q-pa-none"
            >
              <div
                v-for="(sunglass, index) in order.sunglassesDetails"
                :key="sunglass._id"
                class="q-py-lg q-px-md"
                :style="
                  index !== 0
                    ? 'border-top: 1px solid rgba(255, 255, 255, 0.1)'
                    : ''
                "
              >
                <!-- top row: image + model/price + button -->
                <div class="row items-center">
                  <!-- Image -->
                  <div class="col-auto">
                    <q-img
                      :src="getImageUrl(sunglass.images[0].imageUrl)"
                      alt="Sunglass"
                      class="border"
                      style="width: 70px; border-radius: 4px"
                    />
                  </div>

                  <!-- Text Details -->
                  <div class="col column items-start q-pl-md">
                    <div
                      class="font-size-responsive-sm archivo text-uppercase text-light q-mb-xs"
                    >
                      <b>{{ capitalizeFirstLetter(sunglass.model) }}</b>
                    </div>
                    <div class="font-size-responsive-xs text-dimmed">
                      {{ sunglass.quantity }} x R {{ sunglass.price }}.00
                    </div>
                  </div>

                  <!-- Action Button -->
                  <div class="col-12 col-md-auto q-mt-md q-mt-md-none">
                    <q-btn
                      rounded
                      dense
                      no-caps
                      outline
                      color="grey"
                      text-color="grey"
                      label="View frame"
                      icon-right="eva-arrow-forward-outline"
                      class="q-px-lg q-py-sm text-caption icon-btn text-bold full-width"
                      @click.stop="viewSunglassesDetails(sunglass._id)"
                    />
                  </div>
                </div>

                <!-- bottom row: collection line, only on pickup -->
                <div v-if="order.orderType === 'pickup'" class="row q-mt-md">
                  <div class="col-12">
                    <div class="font-size-responsive-sm text-dimmed">
                      Collection at 65 Stockley Road, Kenwyn
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <!-- status / actions -->
            <q-card-section
              class="order-footer"
              style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
            >
              <div class="overline-tight text-dimmed text-caption">
                <template v-if="order.status === 'paid'">
                  PAID · {{ order.totalItems }} ITEM(S)
                </template>
                <template v-else-if="order.status === 'pending'">
                  PENDING PAYMENT · {{ order.totalItems }} ITEM(S)
                </template>
                <template v-else-if="order.status === 'paid & picked up'">
                  COLLECTED BY {{ order.userFirstName }}
                </template>

                <template v-else-if="order.returns === 'refund requested'">
                  <span class="text-warning"
                    >REFUND REQUESTED · AWAITING ADMIN APPROVAL</span
                  >
                </template>
                <template v-else-if="order.returns === 'returned item(s)'">
                  <span class="text-negative">REFUNDED</span>
                </template>
              </div>

              <div class="order-footer-actions">
                <!-- Return request -->
                <q-btn
                  v-if="isReturnEligible(order)"
                  rounded
                  dense
                  no-caps
                  outline
                  color="grey"
                  text-color="grey"
                  label="Request return"
                  icon-right="eva-undo-outline"
                  class="q-px-lg q-py-sm text-caption icon-btn text-bold"
                  @click.stop="startReturn(order)"
                />

                <!-- Pending actions -->
                <template v-if="order.status === 'pending'">
                  <q-btn
                    rounded
                    dense
                    no-caps
                    flat
                    label="Cancel"
                    class="custom-button text-caption text-dimmed q-px-lg q-py-sm"
                    @click="cancelOrder(order._id)"
                  />
                  <q-btn
                    rounded
                    dense
                    no-caps
                    to="/cart"
                    label="Proceed to checkout"
                    text-color="dark"
                    class="btn-gradient-primary q-px-lg q-py-sm text-caption rounded-button text-bold"
                  />
                </template>
              </div>
            </q-card-section>
          </q-card>
        </template>
      </div>
    </section>

    <!--------------------------------------------------------------------- NO ORDERS -------------------------------------------------->
    <section v-else>
      <q-card
        flat
        bordered
        class="bg-dark-secondary q-pa-xl"
        style="border: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <div class="column items-start">
          <q-icon name="fa-solid fa-cube" color="primary" size="42px" />

          <div class="section-spacer-sm"></div>

          <div
            class="font-size-responsive-xl archivo text-light text-bold q-mb-sm"
          >
            NO ORDERS YET.
          </div>

          <div class="text-subtitle1 text-dimmed">
            Your completed purchases will appear here.
          </div>

          <div class="section-spacer-xs"></div>

          <q-btn
            flat
            no-caps
            dense
            to="/sunglasses"
            label="Browse frames"
            icon-right="eva-arrow-forward-outline"
            class="custom-button icon-btn text-primary text-subtitle1"
          />
        </div>
      </q-card>
    </section>
  </div>
</template>

<script>
import UserService from "src/services/UserService";
import OrderService from "src/services/OrderService";
import SunglassesService from "src/services/SunglassesService";
import Helper from "src/services/utils";
import { UiAlerts } from "src/services/UiAlerts";

export default {
  data() {
    return {
      orders: [],
      userDetails: {},
      userTokenDetails: { _id: "", username: "", userType: "" },
      loading: true,
    };
  },

  computed: {
    sortedOrders() {
      return [...this.orders].sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );
    },
    hasPendingOrder() {
      return this.orders.some((o) => o.status === "pending");
    },
    hasReadyToCollectOrder() {
      return this.orders.some((o) => o.status === "paid");
    },
  },

  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    formateOrderId: Helper.formateOrderId,

    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },

    isReturnEligible(order) {
      if (order.status !== "paid & picked up") return false;

      // Hide button if they already requested a refund or it's refunded
      if (
        order.returns === "refund requested" ||
        order.returns === "returned item(s)"
      ) {
        return false;
      }

      const daysSinceOrder =
        (Date.now() - new Date(order.orderDate).getTime()) /
        (1000 * 60 * 60 * 24);
      return daysSinceOrder <= 14;
    },

    // async startReturn(order) {
    //   UiAlerts.custom(
    //     "Request a return",
    //     `Would you like to request a return for order #${this.formateOrderId(
    //       order
    //     )}? We'll email you the next steps.`,
    //     "Request return",
    //     "primary",
    //     "Keep order"
    //   ).onOk(async () => {
    //     try {
    //       const sunglassesToRefund = order.sunglasses || [];

    //       const response = await OrderService.refundOrder(
    //         order._id,
    //         sunglassesToRefund
    //       );

    //       if (response) {
    //         UiAlerts.success("Return requested. Check your email for next steps.");
    //         this.getAllMyOrders();
    //       } else {
    //         UiAlerts.error("Could not process return. Please try again.");
    //       }
    //     } catch (error) {
    //       console.error("Return request failed:", error);
    //       UiAlerts.error("Could not process return. Please try again.");
    //     }
    //   });
    // },

    async startReturn(order) {
      UiAlerts.custom(
        "Request a return",
        `Would you like to request a return for order #${this.formateOrderId(
          order
        )}? An admin will review this request and email you the next steps.`,
        "Request return",
        "primary",
        "Keep order"
      ).onOk(async () => {
        try {
          const sunglassesToRefund = order.sunglasses || [];

          const response = await OrderService.requestRefund(
            order._id,
            sunglassesToRefund
          );

          if (response) {
            UiAlerts.success(
              "Return requested. We will notify you once it's approved."
            );
            this.getAllMyOrders();
          } else {
            UiAlerts.error("Could not process return. Please try again.");
          }
        } catch (error) {
          console.error("Return request failed:", error);
          UiAlerts.error("Could not process return. Please try again.");
        }
      });
    },

    async cancelOrder(orderId) {
      UiAlerts.confirmDelete(
        "Cancel Order",
        "You are about to delete your order, continue?",
        "Delete Order"
      ).onOk(async () => {
        const response = await OrderService.cancelOrder(orderId);
        if (response) {
          await OrderService.deleteOrder(orderId);
          localStorage.removeItem("currentOrderId");
          this.getAllMyOrders();
          UiAlerts.success("Cancel successful!");
        } else {
          UiAlerts.error("Cancel failed. Please try again.");
        }
      });
    },

    async getAllMyOrders() {
      if (!this.userDetails || !this.userDetails._id) return;

      this.loading = true;

      try {
        const response =
          (await OrderService.findAllMyOrders(this.userDetails._id)) || [];

        this.orders = await Promise.all(
          response.map(async (order) => {
            const user = await UserService.findUserById(order.user).catch(
              () => null
            );
            return {
              ...order,
              userFirstName: user?.username || "Unknown",
            };
          })
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
        this.orders = [];
      }

      await this.getSunglasses();
      this.loading = false;
    },

    async getUserDetails() {
      const id = await UserService.FindUserByToken();
      this.userTokenDetails = id;
      const user = await UserService.findUserById(this.userTokenDetails._id);
      this.userDetails = user;

      this.getAllMyOrders();
    },

    async getSunglasses() {
      for (const order of this.orders) {
        if (order.sunglasses && order.sunglasses.length > 0) {
          order.sunglassesDetails = [];

          // Group duplicate items by ID before fetching
          const groupedItems = {};
          order.sunglasses.forEach((item) => {
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
              if (response) {
                response.quantity = groupedItems[key].quantity; // Attach grouped quantity
                order.sunglassesDetails.push(response);
              }
            } catch (error) {
              console.error(
                `Failed to fetch details for sunglasses with id ${key}:`,
                error
              );
            }
          }
        }
      }
    },
  },

  created() {
    this.getUserDetails();
  },
};
</script>

<style lang="sass" scoped>
.order-list-card
  transition: border-color 0.2s ease

  &:hover
    border-color: rgba(255, 255, 255, 0.35) !important

.order-id-badge
  font-family: 'Hind', sans-serif
  font-weight: 900
  letter-spacing: 0.05em
  padding: 4px 10px
  border-radius: 4px
  max-width: 100%
  display: inline-block
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.order-footer
  display: flex
  align-items: center
  justify-content: space-between
  flex-wrap: nowrap
  gap: 16px

.order-footer-actions
  display: flex
  align-items: center
  gap: 12px
  flex-shrink: 0

@media (max-width: 1024px)
  .order-footer
    flex-direction: column
    align-items: flex-start
    gap: 14px

  .order-footer-actions
    width: 100%
    justify-content: space-between

    .btn-gradient-primary
      flex: 1
      text-align: center

.order-meta-row
  .col-4
    max-width: 33.33%
    overflow: hidden

@media (max-width: 1024px)
  .order-meta-row
    .overline-tight
      font-size: 10px
      letter-spacing: 1px

    .order-id-badge
      font-size: 11px
      padding: 2px 6px

    .text-subtitle1
      font-size: 12px
</style>
