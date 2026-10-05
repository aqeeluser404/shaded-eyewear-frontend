<template>
  <div
    class="admin-orders-details"
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
            ORDERS
          </div>
        </div>

        <q-select
          v-model="selectedOrderType"
          :options="orderTypes"
          dense
          outlined
          dark
          class="status-filter"
          popup-content-class="period-select-menu"
          @update:model-value="filterByOrderType"
        />
      </div>
    </section>

    <div class="section-spacer-sm"></div>

    <!--------------------------------------------------------------------- STATUS CARDS -------------------------------------------------->
    <template v-if="loading">
      <div class="row q-col-gutter-md q-mb-lg">
        <div
          v-for="n in 3"
          :key="'skel-card-' + n"
          class="col-12 col-sm-6 col-md-4"
        >
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="skeleton-line skeleton-line--sm q-mb-md"></div>
            <div class="row justify-between items-center">
              <div class="skeleton-line skeleton-line--md"></div>
              <div class="skeleton-line skeleton-line--avatar"></div>
            </div>
          </q-card>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="row q-col-gutter-md q-mb-lg">
        <!-- Awaiting collection -->
        <div class="col-12 col-sm-6 col-md-4">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md status-card"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div
              class="overline-tight text-dimmed text-caption q-mb-md"
              style="letter-spacing: 0.15em"
            >
              AWAITING COLLECTION
            </div>
            <div class="row justify-between items-center">
              <div class="text-caption text-dimmed">Ready for pickup</div>
              <div
                class="font-size-responsive-xxl archivo text-gradient-primary text-bold"
              >
                {{ statusCounts.awaitingCollection }}
              </div>
            </div>
          </q-card>
        </div>

        <!-- In transit -->
        <div class="col-12 col-sm-6 col-md-4">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md status-card"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div
              class="overline-tight text-dimmed text-caption q-mb-md"
              style="letter-spacing: 0.15em"
            >
              IN TRANSIT
            </div>
            <div class="row justify-between items-center">
              <div class="text-caption text-dimmed">Delivery en route</div>
              <div
                class="font-size-responsive-xxl archivo text-gradient-primary text-bold"
              >
                N/A
              </div>
            </div>
          </q-card>
        </div>

        <!-- Completed this month -->
        <div class="col-12 col-sm-6 col-md-4">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md status-card"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div
              class="overline-tight text-dimmed text-caption q-mb-md"
              style="letter-spacing: 0.15em"
            >
              COMPLETED THIS MONTH
            </div>
            <div class="row justify-between items-center">
              <div class="text-caption text-dimmed">Collected this month</div>
              <div
                class="font-size-responsive-xxl archivo text-gradient-primary text-bold"
              >
                {{ statusCounts.completedThisMonth }}
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </template>

    <!--------------------------------------------------------------------- UPCOMING PICKUPS -------------------------------------------------->
    <template v-if="pendingPickups.length > 0">
      <q-card
        flat
        bordered
        class="bg-dark-secondary q-mb-lg"
        style="border: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <q-card-section
          class="row justify-between items-center"
          style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <div>
            <div class="font-size-responsive-md text-light text-bold">
              Upcoming Pickups
            </div>
            <div class="text-caption text-dimmed">
              {{ pendingPickups.length }} order(s) awaiting collection
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-none">
          <div
            v-for="(order, index) in pendingPickups"
            :key="order._id"
            class="q-py-lg q-px-md"
            :style="
              index !== pendingPickups.length - 1
                ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)'
                : ''
            "
          >
            <!-- top row: image + details + total -->
            <div class="row items-center">
              <div class="col-md-1 col-4">
                <q-img
                  v-if="order.sunglassesDetails && order.sunglassesDetails[0]"
                  :src="
                    getImageUrl(order.sunglassesDetails[0].images[0].imageUrl)
                  "
                  alt="Sunglass"
                  class="border"
                />
              </div>

              <div class="col-md-7 col-8 q-pl-md">
                <div
                  class="font-size-responsive-md archivo text-uppercase text-light"
                >
                  <b>{{
                    capitalizeFirstLetter(
                      order.sunglassesDetails?.[0]?.model || "Order"
                    )
                  }}</b>
                </div>
                <div class="text-caption text-dimmed q-mt-xs">
                  Order #{{ formateOrderId(order) }} ·
                  {{ formatDate(order.orderDate) }}
                </div>
                <div class="text-caption text-dimmed q-mt-xs">
                  For {{ order.userFirstName }}
                </div>
              </div>

              <div class="col-md-4 col-12 text-md-right q-mt-md q-mt-md-none">
                <div class="text-caption text-dimmed">RECEIVE</div>
                <div
                  class="font-size-responsive-lg archivo text-gradient-primary"
                >
                  R {{ order.totalAmount }}.00
                </div>
              </div>
            </div>

            <!-- bottom row: actions -->
            <div class="row items-center justify-end q-mt-md q-gutter-sm">
              <q-btn
                rounded
                dense
                no-caps
                outline
                color="grey"
                text-color="grey"
                label="View order"
                icon-right="eva-arrow-forward-outline"
                class="q-px-lg q-py-sm text-caption icon-btn text-bold"
                @click="
                  viewSunglassesDetails(order.sunglassesDetails?.[0]?._id)
                "
              />
              <q-btn
                rounded
                dense
                no-caps
                label="Mark collected"
                icon="eva-checkmark-outline"
                text-color="dark"
                class="btn-gradient-primary q-px-lg q-py-sm rounded-button text-caption text-bold"
                @click="updatePickupOrder(order._id)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </template>

    <!--------------------------------------------------------------------- ORDERS TABLE -------------------------------------------------->
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
            All Orders
          </div>
          <div class="text-caption text-dimmed">
            {{ filteredList.length }} order(s)
          </div>
        </div>

        <q-input
          v-model="search"
          placeholder="Search orders"
          dense
          outlined
          dark
          class="order-search"
          @update:model-value="filterBySearch"
        >
          <template #prepend>
            <q-icon name="eva-search-outline" size="18px" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <!-- loading skeleton -->
        <template v-if="loading">
          <div
            v-for="n in 4"
            :key="'skel-row-' + n"
            class="row items-center q-px-md q-py-md"
            :style="
              n !== 4 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)' : ''
            "
          >
            <div class="col-2">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-3">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-2">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-3">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-2 row justify-end">
              <div class="skeleton-line skeleton-line--sm"></div>
            </div>
          </div>
        </template>

        <!-- real content -->
        <template v-else>
          <!-- header row -->
          <div
            class="row items-center q-px-md q-py-md"
            style="border-bottom: 1px solid rgba(255, 255, 255, 0.1)"
          >
            <div class="col-2 text-dimmed font-size-responsive-xs text-bold">
              ORDER
            </div>
            <div class="col-3 text-dimmed font-size-responsive-xs text-bold">
              CUSTOMER
            </div>
            <div class="col-2 text-dimmed font-size-responsive-xs text-bold">
              TYPE
            </div>
            <div class="col-2 text-dimmed font-size-responsive-xs text-bold">
              DATE
            </div>
            <div
              class="col-2 text-dimmed font-size-responsive-xs text-bold text-center"
            >
              STATUS
            </div>
            <div class="col-1"></div>
          </div>

          <!-- data rows -->
          <div
            v-for="(order, index) in filteredList"
            :key="order._id"
            class="row items-center q-px-md q-py-md order-row"
            :style="
              index !== filteredList.length - 1
                ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)'
                : ''
            "
          >
            <div class="col-2">
              <q-badge
                outline
                color="grey"
                text-color="grey"
                class="order-id-badge"
              >
                #{{ formateOrderId(order) }}
              </q-badge>
            </div>
            <div class="col-3 font-size-responsive-sm text-dimmed">
              {{ order.userFirstName }}
            </div>
            <div class="col-2 font-size-responsive-sm text-dimmed">
              {{ capitalizeFirstLetter(order.orderType) }}
            </div>
            <div class="col-2 font-size-responsive-sm text-dimmed">
              {{ formatDate(order.orderDate) }}
            </div>
            <div class="col-2 row justify-center">
              <div class="row items-center">
                <div
                  class="status-dot"
                  :class="'status-dot--' + statusBucket(order.status)"
                ></div>
                <span
                  class="text-caption text-bold q-ml-sm"
                  :class="'text-' + statusColor(order.status)"
                >
                  {{ statusLabel(order.status) }}
                </span>
              </div>
            </div>

            <div class="col-1 row justify-end">
              <!-- 3-dot menu -->
              <q-btn
                round
                dense
                flat
                color="grey"
                icon="eva-more-vertical-outline"
                size="sm"
              >
                <q-menu
                  anchor="bottom right"
                  self="top right"
                  class="row-actions-menu bg-dark-secondary"
                >
                  <q-list dense>
                    <q-item
                      v-if="
                        order.status === 'paid' && order.orderType === 'pickup'
                      "
                      clickable
                      v-close-popup
                      @click="updatePickupOrder(order._id)"
                    >
                      <q-item-section>Mark collected</q-item-section>
                    </q-item>

                    <q-item
                      v-if="
                        order.status === 'paid' &&
                        order.orderType === 'delivery'
                      "
                      clickable
                      v-close-popup
                      @click="updateDeliveryOrder(order._id)"
                    >
                      <q-item-section>Mark delivered</q-item-section>
                    </q-item>

                    <q-item
                      v-if="order.status === 'pending'"
                      clickable
                      v-close-popup
                      @click="viewOrderDetails(order)"
                    >
                      <q-item-section>View details</q-item-section>
                    </q-item>

                    <q-separator
                      v-if="
                        order.status === 'paid' || order.status === 'pending'
                      "
                    />

                    <q-item clickable v-close-popup @click="deleteOrder(order)">
                      <q-item-section class="text-negative"
                        >Delete</q-item-section
                      >
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>

          <!-- empty state -->
          <div
            v-if="filteredList.length === 0"
            class="column items-center q-py-xl q-px-md"
          >
            <q-icon
              name="eva-shopping-bag-outline"
              color="primary"
              size="42px"
            />
            <div class="font-size-responsive-md text-light text-bold q-mt-md">
              NO ORDERS FOUND
            </div>
            <div class="text-caption text-dimmed q-mt-sm">
              Try adjusting your search or filters.
            </div>
          </div>
        </template>
      </q-card-section>
    </q-card>
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
      ordersPickup: [],
      ordersDelivery: [],
      combinedList: [],
      filteredList: [],
      selectedOrderType: "All",
      orderTypes: ["All", "Pickup", "Delivery"],
    };
  },

  computed: {
    statusCounts() {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const awaitingCollection = this.orders.filter(
        (o) => o.status === "paid" && o.orderType === "pickup"
      ).length;

      const completedThisMonth = this.orders.filter((o) => {
        if (o.status !== "paid & picked up") return false;
        const d = new Date(o.orderDate);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      }).length;

      return {
        awaitingCollection,
        completedThisMonth,
      };
    },

    pendingPickups() {
      return this.orders.filter(
        (o) =>
          o.status === "paid" &&
          o.orderType === "pickup" &&
          o.sunglassesDetails &&
          o.sunglassesDetails.length > 0
      );
    },
  },

  mounted() {
    this.getAllOrders();
  },

  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    formateOrderId: Helper.formateOrderId,

    viewSunglassesDetails(id) {
      if (id) Helper.viewSunglassesDetails(id, this.$router);
    },

    statusLabel(status) {
      const map = {
        pending: "PENDING",
        paid: "PAID",
        "paid & picked up": "COLLECTED",
        "paid & delivered": "DELIVERED",
        refunded: "REFUNDED",
      };
      return map[status] || status?.toUpperCase() || "—";
    },

    statusColor(status) {
      const map = {
        pending: "warning",
        paid: "positive",
        "paid & picked up": "collected",
        "paid & delivered": "delivered",
        refunded: "negative",
      };
      return map[status] || "grey";
    },

    statusBucket(status) {
      const map = {
        pending: "pending",
        paid: "paid",
        "paid & picked up": "collected",
        "paid & delivered": "delivered",
        refunded: "refunded",
      };
      return map[status] || "grey";
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

        this.ordersPickup = this.orders.filter(
          (o) => o.orderType === "pickup" && o.status !== "refunded"
        );
        this.ordersDelivery = this.orders.filter(
          (o) => o.orderType === "delivery" && o.status !== "refunded"
        );

        this.combinedList = [...this.ordersPickup, ...this.ordersDelivery];
        this.filteredList = this.combinedList;
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        this.orders = [];
        this.combinedList = [];
        this.filteredList = [];
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
              if (response) order.sunglassesDetails.push(response);
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

    filterByOrderType() {
      if (this.selectedOrderType === "All") {
        this.filteredList = this.combinedList;
      } else if (this.selectedOrderType === "Pickup") {
        this.filteredList = this.ordersPickup;
      } else if (this.selectedOrderType === "Delivery") {
        this.filteredList = this.ordersDelivery;
      }
    },

    filterBySearch() {
      if (this.search.trim() === "") {
        this.filterByOrderType();
        return;
      }

      const term = this.search.toLowerCase();
      const base =
        this.selectedOrderType === "Pickup"
          ? this.ordersPickup
          : this.selectedOrderType === "Delivery"
          ? this.ordersDelivery
          : this.combinedList;

      this.filteredList = base.filter(
        (order) =>
          order.userFirstName?.toLowerCase().includes(term) ||
          order._id?.toLowerCase().includes(term)
      );
    },

    async updatePickupOrder(id) {
      this.$q
        .dialog({
          title: "Mark as collected",
          message: `You are about to mark this order as collected. Continue?`,
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            const response = await OrderService.updatePickupOrder(id);
            if (response) {
              this.$q.notify({
                type: "positive",
                color: "primary",
                message: "Update successful!",
              });
              this.getAllOrders();
            } else {
              this.$q.notify({
                type: "negative",
                message: "Update failed. Please try again.",
              });
            }
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: "Update failed. Please try again.",
            });
          }
        });
    },

    async updateDeliveryOrder(id) {
      this.$q
        .dialog({
          title: "Mark as delivered",
          message: `You are about to mark this order as delivered. Continue?`,
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            const response = await OrderService.updateDeliveryOrder(id);
            if (response) {
              this.$q.notify({
                type: "positive",
                color: "primary",
                message: "Update successful!",
              });
              this.getAllOrders();
            } else {
              this.$q.notify({
                type: "negative",
                message: "Update failed. Please try again.",
              });
            }
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: "Update failed. Please try again.",
            });
          }
        });
    },

    async deleteOrder(id) {
      const order = await OrderService.findOrderById(id);
      const hasRefund = order?.returns === "returned item(s)";

      const message = hasRefund
        ? "This order has a refund associated with it. Deleting this order will also delete that refund. Continue?"
        : "You are about to delete this order. Continue?";

      this.$q
        .dialog({
          title: "Delete order",
          message,
          color: "negative",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          const response = await OrderService.deleteOrder(id);
          if (response) {
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: "Delete successful!",
            });
          } else {
            this.$q.notify({
              type: "negative",
              message: "Delete failed. Please try again.",
            });
          }
          this.getAllOrders();
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.status-card
  transition: border-color 0.2s ease

  &:hover
    border-color: rgba(255, 255, 255, 0.35) !important

.order-row
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

.order-search
  min-width: 260px

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

.status-filter
  min-width: 130px
  font-size: 0.85rem

  :deep(.q-field__control)
    background-color: #121212
    border-radius: 6px
    box-shadow: none !important

  :deep(.q-field__control:before)
    border: 1px solid rgba(255, 255, 255, 0.2) !important

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

.status-dot--pending
  background-color: #fbbf24
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.15)

.status-dot--paid
  background-color: #22c55e
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15)

.status-dot--collected
  background-color: #14b8a6
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15)

.status-dot--delivered
  background-color: #a855f7
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15)

.status-dot--refunded
  background-color: #ef4444
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15)

.status-dot--grey
  background-color: #9b9b9b

.text-collected
  color: #14b8a6 !important

.text-delivered
  color: #a855f7 !important

.row-actions-menu
  // background-color: #141414
  border: 1px solid rgba(255, 255, 255, 0.12)
  border-radius: 10px
  min-width: 160px

  .q-item
    color: #e8e8e8
    min-height: 40px
    border-radius: 6px
    // margin: 2px

    &:hover
      background-color: rgba(255, 255, 255, 0.06)
</style>
