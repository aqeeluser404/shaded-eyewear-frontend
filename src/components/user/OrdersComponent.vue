<template>
  <div
    class="orders-details"
    :class="$q.screen.gt.sm ? 'q-pl-lg' : 'q-pl-none'"
  >
    <!--------------------------------------------------------------------- HAS ORDERS -------------------------------------------------->
    <section v-if="loading || orders.length > 0">
      <!-- Heading -->
      <div>
        <div class="font-size-responsive-xl archivo text-light text-bold">
          ORDER HISTORY
        </div>
        <div class="row justify-between items-center">
          <div class="text-subtitle1 text-dimmed q-mt-sm">
            Every frame you've bought, in one place.
          </div>
          <q-btn
            v-if="!loading && hasPendingOrder"
            rounded
            no-caps
            outline
            label="AWAITING PAYMENT"
            color="orange"
            text-color="orange"
            class="q-px-lg q-py-sm text-caption rounded-button text-bold"
          />
          <q-btn
            v-else-if="!loading && hasReadyToCollectOrder"
            rounded
            no-caps
            outline
            label="READY TO COLLECT"
            color="green"
            text-color="green"
            class="q-px-lg q-py-sm text-caption rounded-button text-bold"
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
              <div class="col-4">
                <div class="skeleton-line skeleton-line--xs q-mb-xs"></div>
                <div class="skeleton-line skeleton-line--md"></div>
              </div>
              <div class="col-4">
                <div class="skeleton-line skeleton-line--xs q-mb-xs"></div>
                <div class="skeleton-line skeleton-line--md"></div>
              </div>
              <div class="col-4 row justify-end">
                <div>
                  <div class="skeleton-line skeleton-line--xs q-mb-xs"></div>
                  <div class="skeleton-line skeleton-line--sm"></div>
                </div>
              </div>
            </q-card-section>

            <!-- item skeleton -->
            <q-card-section class="q-pa-none">
              <div class="row items-center q-py-lg q-px-md">
                <div class="col-md-1 col-6">
                  <div class="skeleton-line skeleton-line--thumb-sm"></div>
                </div>
                <div class="col-md-7 col-6 q-pl-md">
                  <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
                  <div class="skeleton-line skeleton-line--sm"></div>
                </div>
                <div
                  class="col-md-3 col-12 row justify-end q-mt-lg q-mt-md-none"
                >
                  <div class="skeleton-line skeleton-line--btn"></div>
                </div>
              </div>
            </q-card-section>

            <!-- footer skeleton -->
            <q-card-section
              class="order-footer"
              style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
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
                  index !== order.sunglassesDetails.length - 1
                    ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.2)'
                    : ''
                "
              >
                <!-- top row: image + model/price + button -->
                <div class="row items-center">
                  <div class="col-md-1 col-6">
                    <q-img
                      :src="getImageUrl(sunglass.images[0].imageUrl)"
                      alt="Sunglass"
                      class="border"
                    />
                  </div>

                  <div class="col-md-7 col-6 q-pl-md">
                    <div
                      class="font-size-responsive-md archivo text-uppercase text-light"
                    >
                      <b>{{ capitalizeFirstLetter(sunglass.model) }}</b>
                    </div>
                    <div class="text-subtitle1 text-dimmed">
                      R {{ sunglass.price }}.00
                    </div>
                    <div class="text-caption text-dimmed q-mt-xs">
                      Qty {{ sunglass.quantity || 1 }}
                    </div>
                  </div>

                  <div
                    class="col-md-3 col-12 row justify-end q-mt-lg q-mt-md-none"
                  >
                    <q-btn
                      rounded
                      dense
                      no-caps
                      outline
                      color="grey"
                      text-color="grey"
                      label="View frame"
                      icon-right="eva-arrow-forward-outline"
                      class="col-md-8 col-12 q-px-lg q-py-sm text-caption icon-btn text-subtitle1 text-bold"
                      @click.stop="viewSunglassesDetails(sunglass._id)"
                    />
                  </div>
                </div>

                <!-- bottom row: collection line, only on pickup -->
                <div v-if="order.orderType === 'pickup'" class="row q-mt-md">
                  <div class="col-12">
                    <div class="text-subtitle1 text-dimmed">
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
                    class="custom-button text-subtitle1 text-dimmed q-px-lg q-py-sm"
                    @click="cancelOrder(order._id)"
                  />
                  <q-btn
                    rounded
                    dense
                    no-caps
                    to="/cart"
                    label="Proceed to checkout"
                    text-color="dark"
                    class="btn-gradient-primary q-px-lg q-py-sm rounded-button text-subtitle1 text-bold"
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
      // Must be paid or collected — not pending, not already returned
      if (order.status !== "paid" && order.status !== "paid & picked up") {
        return false;
      }

      // Not already flagged as returned
      if (order.returns === "returned item(s)") {
        return false;
      }

      // Within the 14-day return window
      const daysSinceOrder =
        (Date.now() - new Date(order.orderDate).getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysSinceOrder > 14) {
        return false;
      }

      return true;
    },

    async startReturn(order) {
      this.$q
        .dialog({
          title: "Request a return",
          message: `Would you like to request a return for order #${this.formateOrderId(
            order
          )}? We'll email you the next steps.`,
          cancel: true,
          persistent: true,
          ok: {
            label: "Request return",
            color: "primary",
            rounded: true,
            noCaps: true,
          },
          cancel: {
            label: "Keep order",
            color: "grey",
            flat: true,
            rounded: true,
            noCaps: true,
          },
        })
        .onOk(async () => {
          try {
            // Send every sunglass in the order as the items to refund.
            // Adjust if you want per-item returns.
            const sunglassesToRefund = order.sunglasses || [];

            const response = await OrderService.refundOrder(
              order._id,
              sunglassesToRefund
            );

            if (response) {
              this.$q.notify({
                type: "positive",
                color: "primary",
                message: "Return requested. Check your email for next steps.",
              });
              this.getAllMyOrders();
            } else {
              this.$q.notify({
                type: "negative",
                message: "Could not process return. Please try again.",
              });
            }
          } catch (error) {
            console.error("Return request failed:", error);
            this.$q.notify({
              type: "negative",
              message: "Could not process return. Please try again.",
            });
          }
        });
    },

    async cancelOrder(orderId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: `You are about to delete your order, continue?`,
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          const response = await OrderService.cancelOrder(orderId);
          if (response) {
            await OrderService.deleteOrder(orderId);
            localStorage.removeItem("currentOrderId");
            this.getAllMyOrders();
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: "Cancel successful!",
            });
          } else {
            this.$q.notify({
              type: "negative",
              message: "Cancel failed. Please try again.",
            });
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
          for (const sunglass of order.sunglasses) {
            try {
              const response = await SunglassesService.findSunglassesById(
                sunglass._id
              );
              order.sunglassesDetails.push(response);
            } catch (error) {
              console.error(
                `Failed to fetch details for sunglasses with id ${sunglass._id}:`,
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
