<template>
  <div
    class="admin-returns-details"
    :class="$q.screen.gt.sm ? 'q-pl-lg' : 'q-pl-none'"
  >
    <!-- Heading -->
    <section>
      <div class="row justify-between items-start">
        <div>
          <div class="overline-tight text-dimmed text-caption">
            ADMIN DASHBOARD
          </div>
          <div class="font-size-responsive-xl archivo text-light text-bold">
            RETURNS
          </div>
        </div>
      </div>
    </section>

    <div class="section-spacer-sm"></div>

    <!--------------------------------------------------------------------- LOADING -------------------------------------------------->
    <template v-if="loading">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-7">
          <q-card flat bordered class="bg-dark-secondary" style="border: 1px solid rgba(255, 255, 255, 0.2)">
            <q-card-section style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)">
              <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
              <div class="skeleton-line skeleton-line--sm"></div>
            </q-card-section>
            <q-card-section class="q-pa-none">
              <div
                v-for="n in 4"
                :key="'skel-' + n"
                class="row items-center q-px-md q-py-md"
                :style="n !== 4 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)' : ''"
              >
                <div class="col-2"><div class="skeleton-line skeleton-line--md"></div></div>
                <div class="col-2"><div class="skeleton-line skeleton-line--md"></div></div>
                <div class="col-3"><div class="skeleton-line skeleton-line--md"></div></div>
                <div class="col-3"><div class="skeleton-line skeleton-line--md"></div></div>
                <div class="col-2"><div class="skeleton-line skeleton-line--sm"></div></div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-5">
          <q-card flat bordered class="bg-dark-secondary q-pa-lg" style="border: 1px solid rgba(255, 255, 255, 0.2)">
            <div class="skeleton-line skeleton-line--md q-mb-md"></div>
            <div class="skeleton-line skeleton-line--lg q-mb-lg"></div>
            <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
            <div class="skeleton-line skeleton-line--sm"></div>
          </q-card>
        </div>
      </div>
    </template>

    <!--------------------------------------------------------------------- REAL CONTENT -------------------------------------------------->
    <template v-else>
      <div class="row q-col-gutter-md">
        <!----------------------------------- LEFT COLUMN ----------------------------------->
        <div class="col-12 col-md-7">
          <!------------------- RETURN QUEUE CARD ------------------->
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-mb-md"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <q-card-section
              class="row justify-between items-center"
              style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
            >
              <div>
                <div class="font-size-responsive-md text-light text-bold">
                  Return Queue
                </div>
                <div class="text-caption text-dimmed">
                  {{ filteredOrders.length }} eligible order(s)
                </div>
              </div>

              <q-input
                v-model="search"
                placeholder="Search orders"
                dense
                outlined
                dark
                class="return-search"
                @update:model-value="filterBySearch"
              >
                <template #prepend>
                  <q-icon name="eva-search-outline" size="18px" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-section class="q-pa-none">
              <!-- header -->
              <div
                class="row items-center q-px-md q-py-md"
                style="border-bottom: 1px solid rgba(255, 255, 255, 0.1)"
              >
                <div class="col-3 text-dimmed font-size-responsive-xs text-bold">ORDER</div>
                <div class="col-3 text-dimmed font-size-responsive-xs text-bold">CUSTOMER</div>
                <div class="col-2 text-dimmed font-size-responsive-xs text-bold">AMOUNT</div>
                <div class="col-4 text-dimmed font-size-responsive-xs text-bold">RETURN STATUS</div>
              </div>

              <!-- rows -->
              <div
                v-for="(order, index) in filteredOrders"
                :key="order._id"
                class="row items-center q-px-md q-py-md return-row cursor-pointer"
                :style="index !== filteredOrders.length - 1 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)' : ''"
                @click="openDetails(order)"
              >
                <div class="col-3">
                  <q-badge outline color="grey" text-color="grey" class="order-id-badge">
                    #{{ formateOrderId(order) }}
                  </q-badge>
                </div>
                <div class="col-3 font-size-responsive-sm text-dimmed">
                  {{ order.userFirstName }}
                </div>
                <div class="col-2 font-size-responsive-sm archivo text-gradient-primary">
                  R {{ order.totalAmount }}.00
                </div>
                <div class="col-4">
                  <div v-if="order.returns" class="row items-center">
                    <div class="status-dot status-dot--returned"></div>
                    <span class="text-caption text-bold text-negative q-ml-sm">
                      {{ capitalizeFirstLetter(order.returns) }}
                    </span>
                  </div>
                  <div v-else class="row items-center">
                    <div class="status-dot status-dot--eligible"></div>
                    <span class="text-caption text-bold text-positive q-ml-sm">
                      Eligible
                    </span>
                  </div>
                </div>
              </div>

              <!-- empty -->
              <div
                v-if="filteredOrders.length === 0"
                class="column items-center q-py-xl q-px-md"
              >
                <q-icon name="eva-undo-outline" color="primary" size="42px" />
                <div class="font-size-responsive-md text-light text-bold q-mt-md">
                  NO ELIGIBLE ORDERS
                </div>
                <div class="text-caption text-dimmed q-mt-sm">
                  Orders eligible for return will appear here.
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!------------------- RETURN HISTORY CARD ------------------->
          <q-card
            flat
            bordered
            class="bg-dark-secondary"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <q-card-section
              class="row justify-between items-center"
              style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
            >
              <div>
                <div class="font-size-responsive-md text-light text-bold">
                  Return History
                </div>
                <div class="text-caption text-dimmed">
                  {{ ordersRefunded.length }} completed refund(s)
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pa-none">
              <!-- header -->
              <div
                v-if="ordersRefunded.length > 0"
                class="row items-center q-px-md q-py-md"
                style="border-bottom: 1px solid rgba(255, 255, 255, 0.1)"
              >
                <div class="col-3 text-dimmed font-size-responsive-xs text-bold">REFUND</div>
                <div class="col-3 text-dimmed font-size-responsive-xs text-bold">CUSTOMER</div>
                <div class="col-3 text-dimmed font-size-responsive-xs text-bold">RETURNED</div>
                <div class="col-3 text-dimmed font-size-responsive-xs text-bold text-right">AMOUNT</div>
              </div>

              <!-- rows -->
              <div
                v-for="(order, index) in ordersRefunded"
                :key="order._id"
                class="row items-center q-px-md q-py-md return-row cursor-pointer"
                :style="index !== ordersRefunded.length - 1 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)' : ''"
                @click="openReturnDetails(order)"
              >
                <div class="col-3">
                  <q-badge outline color="grey" text-color="grey" class="order-id-badge">
                    #{{ formatReturnId(order) }}
                  </q-badge>
                </div>
                <div class="col-3 font-size-responsive-sm text-dimmed">
                  {{ order.userFirstName }}
                </div>
                <div class="col-3 font-size-responsive-sm text-dimmed">
                  {{ formatDate(order.orderDate) }}
                </div>
                <div class="col-3 font-size-responsive-sm archivo text-gradient-primary text-right">
                  R {{ order.totalAmount }}.00
                </div>
              </div>

              <!-- empty -->
              <div
                v-if="ordersRefunded.length === 0"
                class="column items-center q-py-xl q-px-md"
              >
                <q-icon name="eva-undo-outline" color="primary" size="42px" />
                <div class="font-size-responsive-md text-light text-bold q-mt-md">
                  NO RETURNS YET
                </div>
                <div class="text-caption text-dimmed q-mt-sm">
                  Completed refunds will appear here.
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!----------------------------------- RIGHT COLUMN ----------------------------------->
        <div class="col-12 col-md-5">
          <!-- Nothing selected -->
          <q-card
            v-if="!selectedOrder && !selectedReturn"
            flat
            bordered
            class="bg-dark-secondary q-pa-xl"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="column items-start">
              <q-icon name="eva-undo-outline" color="primary" size="42px" />
              <div class="section-spacer-sm"></div>
              <div class="font-size-responsive-md text-light text-bold">
                SELECT A RETURN
              </div>
              <div class="text-caption text-dimmed q-mt-sm">
                Choose an order from the queue to log a return, or pick a past refund to review.
              </div>
            </div>
          </q-card>

          <!-- Log return -->
          <q-card
            v-else-if="selectedOrder"
            flat
            bordered
            class="bg-dark-secondary"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <q-card-section
              class="row justify-between items-center"
              style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
            >
              <div>
                <div class="font-size-responsive-md text-light text-bold">
                  Log Return
                </div>
                <div class="text-caption text-dimmed">
                  Order #{{ formateOrderId(selectedOrder) }}
                </div>
              </div>

              <q-btn
                rounded dense no-caps flat
                label="Close"
                icon="eva-close-outline"
                class="custom-button icon-btn text-subtitle1 text-dimmed q-px-lg q-py-sm"
                @click="closeDetails"
              />
            </q-card-section>

            <q-card-section>
              <div class="overline-tight text-dimmed text-caption q-mb-md">
                ITEMS TO REFUND
              </div>

              <div
                v-for="(sunglass, index) in selectedOrder.sunglassesDetails"
                :key="index"
                class="row items-center q-pa-sm return-item-row"
              >
                <q-checkbox
                  v-model="selectedSunglasses"
                  :val="getUniqueIdentifier(sunglass._id, index)"
                  color="primary"
                  class="q-mr-md"
                  @update:model-value="toggleSunglassSelection(sunglass._id, index)"
                />

                <div class="col-2">
                  <q-img
                    :src="getImageUrl(sunglass.images[0].imageUrl)"
                    class="border"
                    style="border-radius: 4px"
                  />
                </div>

                <div class="col q-pl-md">
                  <div class="font-size-responsive-sm text-light text-bold text-uppercase">
                    {{ capitalizeFirstLetter(sunglass.model) }}
                  </div>
                  <div class="text-caption text-dimmed">
                    R {{ sunglass.price }}.00
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-section style="border-top: 1px solid rgba(255, 255, 255, 0.1)">
              <div class="text-caption text-dimmed q-mb-md">
                Once a refund has been processed for an order, further refunds
                for the same order cannot be issued unless a new order is placed.
              </div>

              <div class="row items-center q-gutter-sm">
                <q-btn
                  rounded dense no-caps
                  label="Log Return"
                  icon="eva-undo-outline"
                  text-color="dark"
                  class="btn-gradient-primary q-px-lg q-py-sm rounded-button text-subtitle1 text-bold"
                  @click="logReturn(selectedOrder.userFirstName)"
                />
                <q-btn
                  rounded dense no-caps flat
                  label="Cancel"
                  class="custom-button text-subtitle1 text-dimmed q-px-lg q-py-sm"
                  @click="closeDetails"
                />
              </div>
            </q-card-section>
          </q-card>

          <!-- Return details -->
          <q-card
            v-else-if="selectedReturn"
            flat
            bordered
            class="bg-dark-secondary"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <q-card-section
              class="row justify-between items-center"
              style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
            >
              <div>
                <div class="font-size-responsive-md text-light text-bold">
                  Return Details
                </div>
                <div class="text-caption text-dimmed">
                  Refund #{{ formatReturnId(selectedReturn) }}
                </div>
              </div>

              <q-btn
                rounded dense no-caps flat
                label="Close"
                icon="eva-close-outline"
                class="custom-button icon-btn text-subtitle1 text-dimmed q-px-lg q-py-sm"
                @click="closeReturnDetails"
              />
            </q-card-section>

            <q-card-section class="q-pa-none">
              <div class="row items-center q-px-md q-py-md" style="border-bottom: 1px solid rgba(255, 255, 255, 0.08)">
                <div class="col-5 overline-tight text-dimmed text-caption">CUSTOMER</div>
                <div class="col-7 font-size-responsive-sm text-light">
                  {{ capitalizeFirstLetter(selectedReturn.userFirstName) }}
                </div>
              </div>
              <div class="row items-center q-px-md q-py-md" style="border-bottom: 1px solid rgba(255, 255, 255, 0.08)">
                <div class="col-5 overline-tight text-dimmed text-caption">REFERENCE ORDER</div>
                <div class="col-7">
                  <q-badge outline color="grey" text-color="grey" class="order-id-badge">
                    #{{ formateOrderId(selectedReturn) }}
                  </q-badge>
                </div>
              </div>
              <div class="row items-center q-px-md q-py-md" style="border-bottom: 1px solid rgba(255, 255, 255, 0.08)">
                <div class="col-5 overline-tight text-dimmed text-caption">RETURNED</div>
                <div class="col-7 font-size-responsive-sm text-light">
                  {{ formatDate(selectedReturn.orderDate) }}
                </div>
              </div>
              <div class="row items-center q-px-md q-py-md" style="border-bottom: 1px solid rgba(255, 255, 255, 0.08)">
                <div class="col-5 overline-tight text-dimmed text-caption">ITEMS</div>
                <div class="col-7 font-size-responsive-sm text-light">
                  {{ selectedReturn.totalItems }}
                </div>
              </div>
              <div class="row items-center q-px-md q-py-md">
                <div class="col-5 overline-tight text-dimmed text-caption">REFUND DUE</div>
                <div class="col-7 font-size-responsive-md archivo text-gradient-primary text-bold">
                  R {{ selectedReturn.totalAmount }}.00
                </div>
              </div>
            </q-card-section>

            <q-card-section
              v-if="selectedReturn.sunglassesDetails && selectedReturn.sunglassesDetails.length > 0"
              class="q-pa-none"
              style="border-top: 1px solid rgba(255, 255, 255, 0.1)"
            >
              <div
                v-for="(sunglass, index) in selectedReturn.sunglassesDetails"
                :key="sunglass._id"
                class="row items-center q-py-md q-px-md cursor-pointer"
                :style="index !== selectedReturn.sunglassesDetails.length - 1 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.08)' : ''"
                @click="viewSunglassesDetails(sunglass._id)"
              >
                <div class="col-2">
                  <q-img
                    :src="getImageUrl(sunglass.images[0].imageUrl)"
                    class="border"
                    style="border-radius: 4px"
                  />
                </div>
                <div class="col-10 q-pl-md">
                  <div class="font-size-responsive-sm text-light text-bold text-uppercase">
                    {{ capitalizeFirstLetter(sunglass.model) }}
                  </div>
                  <div class="text-caption text-dimmed">
                    R {{ sunglass.price }}.00
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-section style="border-top: 1px solid rgba(255, 255, 255, 0.2)">
              <q-btn
                rounded dense no-caps flat
                label="Close"
                icon="eva-close-outline"
                class="custom-button icon-btn text-subtitle1 text-dimmed q-px-lg q-py-sm"
                @click="closeReturnDetails"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import OrderService from "src/services/OrderService";
import UserService from "src/services/UserService";
import Helper from "src/services/utils";
import SunglassesService from "src/services/SunglassesService";

export default {
  data() {
    return {
      search: "",
      loading: true,
      orders: [],

      selectedOrder: null,
      selectedReturn: null,
      selectedSunglasses: [],

      currentOrders: [],
      ordersRefunded: [],
      filteredOrders: [],
    };
  },

  async mounted() {
    await this.getAllOrders();
  },

  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    formateOrderId: Helper.formateOrderId,

    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },

    formatReturnId(order) {
      const datePart = new Date(order.orderDate)
        .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })
        .replace("/", "");
      const shortId = String(order._id).slice(-3).toUpperCase();
      return `RET-${datePart}-${shortId}`;
    },

    async getAllOrders() {
      this.loading = true;
      try {
        const response = await OrderService.findAllOrders();

        this.orders = await Promise.all(
          (response || []).map(async (order) => {
            const user = await UserService.findUserById(order.user).catch(
              () => null
            );
            return {
              ...order,
              userFirstName: user?.username || "Unknown",
            };
          })
        );

        await this.getSunglasses();

        // Your original logic — kept intact
        const filteredOrders = this.orders.filter(
          (order) =>
            order.status === "paid & picked up" ||
            order.status === "refunded"
        );

        this.currentOrders = filteredOrders.filter(
          (order) =>
            order.status === "paid & picked up" ||
            order.returns === "returned item(s)"
        );

        this.ordersRefunded = filteredOrders.filter(
          (order) => order.status === "refunded"
        );

        this.filteredOrders = this.currentOrders;
      } catch (error) {
        console.error("Error fetching orders:", error);
        this.orders = [];
        this.currentOrders = [];
        this.ordersRefunded = [];
        this.filteredOrders = [];
      }
      this.loading = false;
    },

    async getSunglasses() {
      for (const order of this.orders) {
        if (order.sunglasses && order.sunglasses.length > 0) {
          order.sunglassesDetails = [];
          const seen = new Set();
          for (const sunglass of order.sunglasses) {
            const id = String(sunglass._id);
            if (seen.has(id)) continue;
            seen.add(id);
            try {
              const response = await SunglassesService.findSunglassesById(
                sunglass._id
              );
              if (response) {
                order.sunglassesDetails.push({
                  ...response,
                  quantity: sunglass.quantity || 1,
                });
              }
            } catch (error) {
              console.error(
                `Failed to fetch sunglasses ${sunglass._id}:`,
                error
              );
            }
          }
        }
      }
    },

    filterBySearch() {
      if (this.search.trim() === "") {
        this.filteredOrders = this.currentOrders;
        return;
      }

      const term = this.search.toLowerCase();
      this.filteredOrders = this.currentOrders.filter(
        (order) =>
          order.userFirstName?.toLowerCase().includes(term) ||
          order._id?.toLowerCase().includes(term) ||
          order.totalAmount?.toString().includes(term)
      );
    },

    getUniqueIdentifier(id, index) {
      return `${id}_${index}`;
    },

    async logReturn(firstName) {
      try {
        const sunglassesToRefund = this.selectedSunglasses.map((identifier) => {
          const [id] = identifier.split("_");
          return { _id: id, quantity: 1 };
        });

        if (this.selectedSunglasses.length === 0) {
          this.$q.notify({
            type: "negative",
            message: "Choose a pair of sunglasses to refund.",
          });
          return;
        }

        this.$q
          .dialog({
            title: "Refund Order",
            message: `You are about to refund ${firstName}'s order, continue?`,
            color: "primary",
            cancel: true,
            persistent: true,
          })
          .onOk(async () => {
            const response = await OrderService.refundOrder(
              this.selectedOrder._id,
              sunglassesToRefund
            );
            if (response) {
              this.$q.notify({
                type: "positive",
                color: "primary",
                message: "Refund successful!",
              });
              this.getAllOrders();
              this.selectedSunglasses = [];
              this.selectedOrder = null;
            } else {
              this.$q.notify({
                type: "negative",
                message: "Refund failed. Please try again.",
              });
            }
          });
      } catch (error) {
        console.error("Refund failed:", error);
      }
    },

    openDetails(order) {
      if (order.status === "refunded" || order.returns) {
        this.$q.notify({
          type: "negative",
          message: "This order has already been issued a refund.",
        });
        return;
      }
      this.selectedOrder = order;
      this.selectedReturn = null;
      this.selectedSunglasses = [];
    },

    toggleSunglassSelection(id, index) {
      const uniqueIdentifier = this.getUniqueIdentifier(id, index);
      const indexInArray = this.selectedSunglasses.indexOf(uniqueIdentifier);
      if (indexInArray > -1) {
        this.selectedSunglasses.splice(indexInArray, 1);
      } else {
        this.selectedSunglasses.push(uniqueIdentifier);
      }
    },

    closeDetails() {
      this.selectedOrder = null;
      this.selectedSunglasses = [];
    },

    openReturnDetails(order) {
      this.selectedReturn = order;
      this.selectedOrder = null;
      this.selectedSunglasses = [];
    },

    closeReturnDetails() {
      this.selectedReturn = null;
    },
  },
};
</script>

<style lang="sass" scoped>
.return-row
  transition: background-color 0.15s ease

  &:hover
    background-color: rgba(255, 255, 255, 0.03)

.return-item-row
  border-radius: 6px
  transition: background-color 0.15s ease

  &:hover
    background-color: rgba(255, 255, 255, 0.03)

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

.return-search
  min-width: 220px

  :deep(.q-field__control)
    background-color: #121212
    border-radius: 6px
    box-shadow: none !important

  :deep(.q-field__control:before)
    border: 1px solid rgba(255, 255, 255, 0.2) !important

  :deep(.q-field__control:hover:before)
    border-color: rgba(255, 255, 255, 0.35) !important

  :deep(.q-field__control:after)
    border-color: transparent !important
    box-shadow: none !important

  :deep(.q-field--focused .q-field__control:before)
    border-color: rgba(255, 255, 255, 0.5) !important

  :deep(.q-field__native)
    color: #f0f0f0

  :deep(.q-field__marginal)
    color: #9b9b9b

.status-dot
  width: 8px
  height: 8px
  border-radius: 50%
  display: inline-block

.status-dot--eligible
  background-color: #22c55e
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15)

.status-dot--returned
  background-color: #ef4444
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15)
</style>
