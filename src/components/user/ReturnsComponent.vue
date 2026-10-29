<template>
  <div
    class="returns-details"
    :class="$q.screen.gt.sm ? 'q-pl-lg' : 'q-pl-none'"
  >
    <div class="section-spacer-xs small-screen-only"></div>

    <!--------------------------------------------------------------------- HAS RETURNS -------------------------------------------------->
    <section
      v-if="loading || ordersRefunded.length > 0 || pendingRequests.length > 0"
    >
      <!-- Heading -->
      <div>
        <div class="font-size-responsive-xl archivo text-light text-bold">
          RETURN HISTORY
        </div>
        <div class="row justify-between items-center">
          <div class="font-size-responsive-sm text-dimmed q-mt-sm">
            Track your refund requests and completed returns.
          </div>
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
              <!-- Left: ID -->
              <div style="width: 30%">
                <div class="skeleton-line skeleton-line--xs q-mb-xs" style="width: 60%"></div>
                <div class="skeleton-line skeleton-line--md" style="width: 100%"></div>
              </div>

              <!-- Center: Date -->
              <div style="width: 30%; text-align: center;">
                <div class="skeleton-line skeleton-line--xs q-mb-xs" style="width: 60%;"></div>
                <div class="skeleton-line skeleton-line--md" style="width: 100%"></div>
              </div>

              <!-- Right: Amount -->
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

        <!------------------------------------------ REAL CONTENT ------------------------------------------>
        <template v-else>

          <!-- PENDING REQUESTS -->
          <div v-if="pendingRequests.length > 0" class="q-mb-lg">
            <!-- <div class="overline-tight text-warning text-bold text-caption q-mb-md">
              PENDING REQUESTS · {{ pendingRequests.length }}
            </div> -->
            <q-card
              v-for="order in pendingRequests"
              :key="order._id"
              flat
              bordered
              class="bg-dark-secondary order-list-card"
              style="border: 1px solid rgba(255, 255, 255, 0.2)"
            >
              <!-- meta -->
              <q-card-section
                class="row justify-between items-center order-meta-row"
                style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
              >
                <div class="col-4">
                  <div class="overline-tight text-dimmed text-caption q-mb-xs">
                    ORDER ID
                  </div>
                  <div>
                    <q-badge outline color="grey" text-color="grey" class="order-id-badge">
                      #{{ formateOrderId(order) }}
                    </q-badge>
                  </div>
                </div>
                <div class="col-4 row justify-center">
                  <div>
                    <div class="overline-tight text-dimmed text-caption q-mb-xs">
                      REQUESTED
                    </div>
                    <div class="text-subtitle1 text-dimmed">
                      {{ formatDate(order.orderDate) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 text-right">
                  <div class="overline-tight text-dimmed text-caption q-mb-xs">
                    EXPECTED REFUND
                  </div>
                  <div class="text-subtitle1 archivo text-gradient-primary">
                    R {{ order.totalAmount }}.00
                  </div>
                </div>
              </q-card-section>

              <!-- items -->
              <q-card-section
                v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0"
                class="q-pa-none"
              >
                <div
                  v-for="(sunglass, index) in order.sunglassesDetails"
                  :key="sunglass._id"
                  class="q-py-lg q-px-md"
                  :style="index !== 0 ? 'border-top: 1px solid rgba(255, 255, 255, 0.1)' : ''"
                >
                  <div class="row items-center">
                    <div class="col-auto">
                      <q-img
                        :src="getImageUrl(sunglass.images[0].imageUrl)"
                        alt="Sunglass"
                        class="border"
                        style="width: 70px; border-radius: 4px"
                      />
                    </div>
                    <div class="col column items-start q-pl-md">
                      <div class="font-size-responsive-sm archivo text-uppercase text-light q-mb-xs">
                        <b>{{ capitalizeFirstLetter(sunglass.model) }}</b>
                      </div>
                      <div class="font-size-responsive-xs text-dimmed">
                        {{ sunglass.quantity }} x R {{ sunglass.price }}.00
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <!-- footer -->
              <q-card-section
                class="order-footer"
                style="border-top: 1px solid rgba(255, 255, 255, 0.1)"
              >
                <div class="overline-tight text-warning text-bold text-caption">
                  AWAITING ADMIN APPROVAL
                </div>
                <div class="order-footer-actions"></div>
              </q-card-section>
            </q-card>
          </div>

          <!-- COMPLETED RETURNS -->
          <div v-if="ordersRefunded.length > 0">
            <!-- <div class="overline-tight text-dimmed text-bold text-caption q-mb-md">
              COMPLETED · {{ ordersRefunded.length }}
            </div> -->
            <q-card
              v-for="order in ordersRefunded"
              :key="order._id"
              flat
              bordered
              class="bg-dark-secondary order-list-card"
              style="border: 1px solid rgba(255, 255, 255, 0.2)"
            >
              <!-- meta -->
              <q-card-section
                class="row justify-between items-center order-meta-row"
                style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
              >
                <div class="col-4">
                  <div class="overline-tight text-dimmed text-caption q-mb-xs">
                    REFUND ID
                  </div>
                  <div>
                    <q-badge outline color="grey" text-color="grey" class="order-id-badge">
                      #{{ formateRefundId(order) }}
                    </q-badge>
                  </div>
                </div>
                <div class="col-4 row justify-center">
                  <div>
                    <div class="overline-tight text-dimmed text-caption q-mb-xs">
                      RETURNED
                    </div>
                    <div class="text-subtitle1 text-dimmed">
                      {{ formatDate(order.orderDate) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 text-right">
                  <div class="overline-tight text-dimmed text-caption q-mb-xs">
                    REFUNDED
                  </div>
                  <div class="text-subtitle1 archivo text-gradient-primary">
                    R {{ Math.abs(order.totalAmount) }}.00
                  </div>
                </div>
              </q-card-section>

              <!-- items -->
              <q-card-section
                v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0"
                class="q-pa-none"
              >
                <div
                  v-for="(sunglass, index) in order.sunglassesDetails"
                  :key="sunglass._id"
                  class="q-py-lg q-px-md"
                  :style="index !== 0 ? 'border-top: 1px solid rgba(255, 255, 255, 0.1)' : ''"
                >
                  <div class="row items-center">
                    <div class="col-auto">
                      <q-img
                        :src="getImageUrl(sunglass.images[0].imageUrl)"
                        alt="Sunglass"
                        class="border"
                        style="width: 70px; border-radius: 4px"
                      />
                    </div>
                    <div class="col column items-start q-pl-md">
                      <div class="font-size-responsive-sm archivo text-uppercase text-light q-mb-xs">
                        <b>{{ capitalizeFirstLetter(sunglass.model) }}</b>
                      </div>
                      <div class="font-size-responsive-xs text-dimmed">
                        {{ sunglass.quantity }} x R {{ sunglass.price }}.00
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <!-- Original Order Reference -->
              <div class="q-px-md q-py-sm text-caption text-dimmed" style="border-top: 1px solid rgba(255, 255, 255, 0.1)">
                Original Order:
                <q-badge outline color="grey-7" text-color="grey-4" class="q-ml-xs">
                  <span v-if="order._fetchedOriginal">
                    #{{ formateOrderId(order._fetchedOriginal) }}
                  </span>
                  <span v-else>N/A</span>
                </q-badge>
              </div>

              <!-- footer -->
              <q-card-section
                class="order-footer"
                style="border-top: 1px solid rgba(255, 255, 255, 0.1)"
              >
                <div class="overline-tight text-dimmed text-caption">
                  RETURNED BY {{ capitalizeFirstLetter(order.userFirstName) }}
                </div>
                <div class="order-footer-actions">
                  <q-badge color="positive" text-color="white" class="q-px-sm q-py-xs">
                    REFUND PROCESSED
                  </q-badge>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </div>
    </section>

    <!--------------------------------------------------------------------- NO RETURNS -------------------------------------------------->
    <section v-else>
      <q-card
        flat
        bordered
        class="bg-dark-secondary q-pa-xl"
        style="border: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <div class="column items-start">
          <q-icon name="fa-solid fa-arrow-rotate-left" color="primary" size="42px" />
          <div class="section-spacer-sm"></div>
          <div class="font-size-responsive-xl archivo text-light text-bold q-mb-sm">
            NO RETURNS YET.
          </div>
          <div class="text-subtitle1 text-dimmed">
            Eligible returns and their progress will appear here.
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
      allReturns: [],
      pendingRequests: [],
      ordersRefunded: [],
      userDetails: {},
      userTokenDetails: { _id: "", username: "", userType: "" },
      loading: true,
    };
  },

  methods: {
    formatDate: Helper.formatDate,
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    getImageUrl: Helper.getImageUrl,
    formateOrderId: Helper.formateOrderId,
    formateRefundId: Helper.formateRefundId,

    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },

    async getAllMyOrders() {
      this.loading = true;
      try {
        const [orders, returns] = await Promise.all([
          OrderService.findAllMyOrders(this.userDetails._id).catch(() => []),
          OrderService.findAllMyReturns(this.userDetails._id).catch(() => []),
        ]);

        const myOrders = orders || [];
        const byId = {};
        myOrders.forEach((o) => {
          byId[String(o._id)] = o;
        });

        // refund docs come from findAllMyReturns, plus any that also appear in
        // the normal order list. keyed by _id so nothing is listed twice
        const refundMap = {};
        [
          ...(returns || []),
          ...myOrders.filter((o) => o.status === "refunded"),
        ].forEach((o) => {
          refundMap[String(o._id)] = o;
        });

        const attachUser = async (order) => {
          const user = await UserService.findUserById(order.user).catch(
            () => null
          );
          return { ...order, userFirstName: user?.username || "Unknown" };
        };

        // pending: the ORIGINAL orders flagged as requested
        const pending = await Promise.all(
          myOrders
            .filter((o) => o.returns === "refund requested")
            .map(attachUser)
        );

        // completed: the REFUND documents, each paired with its original order
        const refunds = await Promise.all(
          Object.values(refundMap).map(async (o) => {
            const withUser = await attachUser(o);
            const ref = o.originalOrder;
            let original = null;

            if (ref && typeof ref === "object" && ref._id) {
              original = ref; // backend already populated it
            } else if (ref) {
              original =
                byId[String(ref)] ||
                (await OrderService.findOrderById(ref).catch(() => null));
            }
            return { ...withUser, _fetchedOriginal: original };
          })
        );

        refunds.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

        // getSunglasses mutates these objects, so both lists get their items
        this.allReturns = [...pending, ...refunds];
        await this.getSunglasses();

        this.pendingRequests = pending;
        this.ordersRefunded = refunds;
      } catch (error) {
        console.error("Error fetching returns:", error);
        this.allReturns = [];
        this.pendingRequests = [];
        this.ordersRefunded = [];
      }
      this.loading = false;
    },

    async getSunglasses() {
      for (const order of this.allReturns) {
        if (order.sunglasses && order.sunglasses.length > 0) {
          order.sunglassesDetails = [];

          // Group duplicates to avoid showing the same frame twice
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
                response.quantity = groupedItems[key].quantity;
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

    async getUserDetails() {
      const id = await UserService.FindUserByToken();
      this.userTokenDetails = id;
      const user = await UserService.findUserById(this.userTokenDetails._id);
      this.userDetails = user;

      this.getAllMyOrders();
    },
  },

  created() {
    this.getUserDetails();
  },
};
</script>

<style lang="sass" scoped>
/* Your existing CSS styles */
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
