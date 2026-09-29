<template>
  <div
    class="returns-details"
    :class="$q.screen.gt.sm ? 'q-pl-lg' : 'q-pl-none'"
  >
    <!--------------------------------------------------------------------- HAS RETURNS -------------------------------------------------->
    <section v-if="loading || ordersRefunded.length > 0">
      <!-- Heading -->
      <div>
        <div class="font-size-responsive-xl archivo text-light text-bold">
          RETURN HISTORY
        </div>
        <div class="row justify-between items-center">
          <div class="text-subtitle1 text-dimmed q-mt-sm">
            Refunds and returns, tracked in one place.
          </div>
        </div>
      </div>

      <div class="section-spacer-sm"></div>

      <!------------------------------------------ SELECTED RETURN (DETAIL VIEW) ------------------------------------------>
      <div v-if="!loading && selectedReturn" class="q-pb-md">
        <q-card
          flat
          bordered
          class="bg-dark-secondary"
          style="border: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <!-- header -->
          <q-card-section
            class="row justify-between items-center order-meta-row"
            style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="col-4">
              <div class="overline-tight text-dimmed text-caption q-mb-xs">
                RETURN ID
              </div>
              <div>
                <q-badge
                  outline
                  color="grey"
                  text-color="grey"
                  class="order-id-badge"
                >
                  #{{ formateOrderId(selectedReturn) }}
                </q-badge>
              </div>
            </div>

            <div class="col-4 row justify-center">
              <div>
                <div class="overline-tight text-dimmed text-caption q-mb-xs">
                  RETURNED
                </div>
                <div class="text-subtitle1 text-dimmed">
                  {{ formatDate(selectedReturn.orderDate) }}
                </div>
              </div>
            </div>

            <div class="col-4 text-right">
              <div class="overline-tight text-dimmed text-caption q-mb-xs">
                REFUNDED
              </div>
              <div class="text-subtitle1 archivo text-gradient-primary">
                R {{ selectedReturn.totalAmount }}.00
              </div>
            </div>
          </q-card-section>

          <!-- reference + totals -->
          <q-card-section
            class="row justify-between items-center"
            style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div>
              <div class="overline-tight text-dimmed text-caption q-mb-xs">
                RETURN ORDER ID
              </div>
              <div class="text-subtitle1 text-light text-capitalize">
                <q-badge
                  outline
                  color="grey"
                  text-color="grey"
                  class="order-id-badge"
                >
                  #{{
                    formateOrderId(
                      selectedReturn.originalOrder || selectedReturn
                    )
                  }}
                </q-badge>
              </div>
            </div>
            <div class="text-right">
              <div class="overline-tight text-dimmed text-caption q-mb-xs">
                ITEMS
              </div>
              <div class="text-subtitle1 text-light">
                {{ selectedReturn.totalItems }}
              </div>
            </div>
          </q-card-section>

          <!-- items -->
          <q-card-section
            v-if="
              selectedReturn.sunglassesDetails &&
              selectedReturn.sunglassesDetails.length > 0
            "
            class="q-pa-none"
          >
            <div
              v-for="(sunglass, index) in selectedReturn.sunglassesDetails"
              :key="sunglass._id"
              class="row items-center cursor-pointer q-py-lg q-px-md"
              :style="
                index !== selectedReturn.sunglassesDetails.length - 1
                  ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.2)'
                  : ''
              "
              @click="viewSunglassesDetails(sunglass._id)"
            >
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

              <div class="col-md-3 col-12 row justify-end q-mt-lg q-mt-md-none">
                <q-btn
                  rounded
                  dense
                  no-caps
                  outline
                  color="grey"
                  text-color="grey"
                  label="View frame"
                  icon-right="eva-arrow-forward-outline"
                  class="q-px-lg q-py-sm text-caption icon-btn text-bold"
                  @click.stop="viewSunglassesDetails(sunglass._id)"
                />
              </div>
            </div>
          </q-card-section>

          <!-- actions -->
          <q-card-section
            class="order-footer"
            style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="overline-tight text-dimmed text-caption">
              RETURNED BY
              {{ capitalizeFirstLetter(selectedReturn.userFirstName) }}
            </div>

            <div class="order-footer-actions">
              <q-btn
                rounded
                dense
                no-caps
                flat
                label="Back"
                icon="eva-arrow-back-outline"
                class="custom-button icon-btn text-subtitle1 text-dimmed q-px-lg q-py-sm"
                @click="closeReturnDetails"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!------------------------------------------ LOADING SKELETON ------------------------------------------>
      <div v-else-if="loading" class="q-pb-md q-gutter-md">
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
                <div class="skeleton-line skeleton-line--hero"></div>
              </div>
              <div class="col-md-7 col-6 q-pl-md">
                <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
                <div class="skeleton-line skeleton-line--sm"></div>
              </div>
              <div class="col-md-3 col-12 row justify-end q-mt-lg q-mt-md-none">
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
      </div>

      <!------------------------------------------ RETURNS LIST ------------------------------------------>
      <div v-else class="q-pb-md q-gutter-md">
        <q-card
          v-for="order in ordersRefunded"
          :key="order._id"
          flat
          bordered
          class="bg-dark-secondary order-list-card cursor-pointer"
          style="border: 1px solid rgba(255, 255, 255, 0.2)"
          @click="openReturnDetails(order)"
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
                <q-badge
                  outline
                  color="grey"
                  text-color="grey"
                  class="order-id-badge"
                >
                  #{{ formateOrderId(order.originalOrder || order) }}
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
              class="row items-center q-py-lg q-px-md"
              :style="
                index !== order.sunglassesDetails.length - 1
                  ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.2)'
                  : ''
              "
            >
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

              <div class="col-md-3 col-12 row justify-end q-mt-lg q-mt-md-none">
                <q-btn
                  rounded
                  dense
                  no-caps
                  outline
                  color="grey"
                  text-color="grey"
                  label="View details"
                  icon-right="eva-arrow-forward-outline"
                  class="q-px-lg q-py-sm text-caption icon-btn text-bold"
                  @click.stop="openReturnDetails(order)"
                />
              </div>
            </div>
          </q-card-section>

          <!-- footer -->
          <q-card-section
            class="order-footer"
            style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="overline-tight text-dimmed text-caption">
              RETURNED BY
              {{ capitalizeFirstLetter(order.userFirstName) }}
            </div>

            <div class="order-footer-actions">
              <q-btn
                rounded
                dense
                no-caps
                outline
                color="grey"
                text-color="grey"
                label="View refund"
                icon-right="eva-arrow-forward-outline"
                class="q-px-lg q-py-sm text-caption icon-btn text-bold"
                @click.stop="openReturnDetails(order)"
              />
            </div>
          </q-card-section>
        </q-card>
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
          <q-icon
            name="fa-solid fa-arrow-rotate-left"
            color="primary"
            size="42px"
          />

          <div class="section-spacer-sm"></div>

          <div
            class="font-size-responsive-xl archivo text-light text-bold q-mb-sm"
          >
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
      ordersRefunded: [],
      selectedReturn: null,
      userDetails: {},
      userTokenDetails: { _id: "", username: "", userType: "" },
      loading: true,
    };
  },

  computed: {
    sortedReturns() {
      return [...this.ordersRefunded].sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );
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

    async getAllMyOrders() {
      this.loading = true;
      try {
        const response =
          (await OrderService.findAllMyReturns(this.userDetails._id)) || [];

        this.ordersRefunded = await Promise.all(
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
        console.error("Error fetching returns:", error);
        this.ordersRefunded = [];
      }

      await this.getSunglasses();
      this.loading = false;
    },

    async getSunglasses() {
      for (const order of this.ordersRefunded) {
        if (order.sunglasses && order.sunglasses.length > 0) {
          order.sunglassesDetails = [];
          for (const sunglass of order.sunglasses) {
            try {
              const response = await SunglassesService.findSunglassesById(
                sunglass._id
              );
              order.sunglassesDetails.push({
                ...response,
                quantity: sunglass.quantity || 1,
              });
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

    async getUserDetails() {
      const id = await UserService.FindUserByToken();
      this.userTokenDetails = id;
      const user = await UserService.findUserById(this.userTokenDetails._id);
      this.userDetails = user;

      this.getAllMyOrders();
    },

    openReturnDetails(order) {
      this.selectedReturn = order;
    },

    closeReturnDetails() {
      this.selectedReturn = null;
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
