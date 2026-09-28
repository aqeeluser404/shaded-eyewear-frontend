<template>
  <q-card-section>
    <div class="font-size-responsive-xl archivo text-light text-bold">
      ORDER HISTORY
    </div>
    <div class="text-subtitle1 text-dimmed q-mt-sm">
      Every frame you've bought, in one place.
    </div>
  </q-card-section>

  <!--------------------------------------------------------------------- HAS ORDERS -------------------------------------------------->
  <template v-if="orders.length > 0">

    <!------------------------------------------------ SELECTED ORDER (DETAIL VIEW) ------------------------------------------------>
    <div v-if="selectedOrder" class="q-px-md q-pb-md">
      <q-card
        flat
        bordered
        class="bg-dark-secondary"
        style="border: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <!-- header -->
        <q-card-section
          class="row justify-between items-center q-gutter-md"
          style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <div>
            <div class="overline text-primary text-caption q-mb-xs">STATUS</div>
            <div class="font-size-responsive-md archivo text-light text-bold">
              <template v-if="selectedOrder.status === 'paid'">
                PAID ON {{ formatDate(selectedOrder.orderDate) }}
              </template>
              <template v-else-if="selectedOrder.status === 'pending'">
                PENDING PAYMENT · {{ formatDate(selectedOrder.orderDate) }}
              </template>
              <template v-else-if="selectedOrder.status === 'paid & picked up'">
                COLLECTED BY {{ selectedOrder.userFirstName }}
              </template>
            </div>
          </div>
          <div class="text-right">
            <div class="text-caption text-dimmed">ORDER ID</div>
            <div class="text-caption text-light">#{{ selectedOrder._id }}</div>
          </div>
        </q-card-section>

        <!-- totals -->
        <q-card-section
          class="row justify-between items-center"
          style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <div class="overline text-dimmed text-caption">
            <b>TOTAL:</b> {{ selectedOrder.totalItems }} ITEM(S)
          </div>
          <div class="font-size-responsive-xl archivo text-gradient-primary">
            R {{ selectedOrder.totalAmount }}.00
          </div>
        </q-card-section>

        <!-- items -->
        <q-card-section
          v-if="selectedOrder.sunglassesDetails && selectedOrder.sunglassesDetails.length > 0"
          class="q-pa-none"
        >
          <div
            v-for="(sunglass, index) in selectedOrder.sunglassesDetails"
            :key="sunglass._id"
            class="row items-center cursor-pointer q-py-lg q-px-md"
            :style="
              index !== selectedOrder.sunglassesDetails.length - 1
                ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.2)'
                : ''
            "
            @click="viewSunglassesDetails(sunglass._id)"
          >
            <div class="col-md-2 col-4">
              <q-img
                :src="getImageUrl(sunglass.images[0].imageUrl)"
                alt="Sunglass"
                class="border"
              />
            </div>
            <div class="col-md-10 col-8 q-pl-md">
              <div class="font-size-responsive-md archivo text-uppercase">
                <b>{{ capitalizeFirstLetter(sunglass.model) }}</b>
              </div>
              <div class="text-subtitle1 text-dimmed">
                R {{ sunglass.price }}.00
              </div>
            </div>
          </div>
        </q-card-section>

        <!-- pickup info -->
        <template v-if="selectedOrder.orderType === 'pickup'">
          <q-card-section style="border-top: 1px solid rgba(255, 255, 255, 0.2)">
            <div class="row items-center q-mb-md">
              <q-icon name="store" color="primary" size="20px" class="q-mr-sm" />
              <div class="overline text-primary text-caption">PICKUP LOCATION</div>
            </div>
            <div class="text-subtitle1 text-light"><b>65 Stockley Road</b></div>
            <div class="text-subtitle1 text-dimmed">Kenwyn</div>
            <div class="text-subtitle1 text-dimmed">Cape Town, 7779</div>
            <div class="text-subtitle1 text-primary q-mt-md">
              <b>OPEN WEEKDAYS 08:00 – 17:00</b>
            </div>
          </q-card-section>

          <q-card-section style="border-top: 1px solid rgba(255, 255, 255, 0.2)">
            <div class="overline text-dimmed text-caption q-mb-sm">
              PICKUP INSTRUCTIONS
            </div>
            <div class="text-subtitle1 text-dimmed">
              Bring the order ID from your confirmation email. If anything
              changes, message us through the contact form and we'll hold your
              frame for seven days. Thank you for shopping with us.
            </div>
          </q-card-section>
        </template>

        <!-- actions -->
        <q-card-section
          class="row items-center q-gutter-md"
          style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <q-btn
            rounded
            dense
            no-caps
            flat
            label="Back"
            icon="eva-arrow-back-outline"
            class="custom-button text-subtitle1 text-dimmed q-px-lg q-py-sm"
            @click="closeDetails"
          />
          <q-btn
            v-if="selectedOrder.status === 'pending'"
            rounded
            dense
            no-caps
            outline
            label="Cancel"
            color="grey"
            text-color="grey"
            class="q-px-lg q-py-sm rounded-button text-subtitle1"
            @click="cancelOrder(selectedOrder._id)"
          />
          <q-btn
            v-if="selectedOrder.status === 'pending'"
            rounded
            dense
            no-caps
            to="/cart"
            label="Proceed to checkout"
            text-color="dark"
            class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold"
          />
        </q-card-section>
      </q-card>
    </div>

    <!------------------------------------------------ ALL ORDERS (LIST VIEW) ------------------------------------------------>
    <div v-else class="q-px-md q-pb-md q-gutter-md">
      <div
        v-for="order in sortedOrders"
        :key="order._id"
        class="cursor-pointer"
        @click="openDetails(order)"
      >
        <q-card
          flat
          bordered
          class="bg-dark-secondary order-list-card"
          style="border: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <q-card-section
            class="row justify-between items-center q-gutter-md"
            style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div>
              <div class="overline text-primary text-caption q-mb-xs">STATUS</div>
              <div class="font-size-responsive-md archivo text-light text-bold">
                <template v-if="order.status === 'paid'">
                  PAID · {{ formatDate(order.orderDate) }}
                </template>
                <template v-else-if="order.status === 'pending'">
                  PENDING PAYMENT
                </template>
                <template v-else-if="order.status === 'paid & picked up'">
                  COLLECTED
                </template>
              </div>
            </div>
            <div class="text-right">
              <div class="text-caption text-dimmed">ORDER ID</div>
              <div class="text-caption text-light">#{{ order._id }}</div>
            </div>
          </q-card-section>

          <q-card-section
            class="row justify-between items-center"
            style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="overline text-dimmed text-caption">
              <b>TOTAL:</b> {{ order.totalItems }} ITEM(S)
            </div>
            <div class="font-size-responsive-lg archivo text-gradient-primary">
              R {{ order.totalAmount }}.00
            </div>
          </q-card-section>

          <q-card-section
            v-if="order.sunglassesDetails && order.sunglassesDetails.length > 0"
            class="row items-center"
          >
            <q-img
              v-for="sunglass in order.sunglassesDetails"
              :key="sunglass._id"
              :src="getImageUrl(sunglass.images[0].imageUrl)"
              alt="Sunglass"
              class="border q-mr-md"
              style="max-width: 72px; max-height: 72px"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

  </template>

  <!--------------------------------------------------------------------- NO ORDERS -------------------------------------------------->
  <div v-else class="q-px-md q-pb-md">
    <q-card
      flat
      bordered
      class="bg-dark-secondary q-pa-xl"
      style="border: 1px solid rgba(255, 255, 255, 0.2)"
    >
      <div class="column items-start">

        <q-icon
          name="inventory_2"
          color="primary"
          size="42px"
          class="q-mb-md"
        />

        <div class="font-size-responsive-xxl archivo text-light text-bold">
          NO ORDERS YET.
        </div>

        <div class="text-subtitle1 text-dimmed q-mt-sm q-mb-lg">
          Your completed purchases will appear here.
        </div>

        <q-btn
          flat
          no-caps
          dense
          to="/sunglasses"
          label="Browse frames"
          icon-right="eva-arrow-forward-outline"
          class="custom-button text-primary text-subtitle1 q-px-none"
        />
      </div>
    </q-card>
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
      selectedOrder: null,
    };
  },

  computed: {
    sortedOrders() {
      return [...this.orders].sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );
    },
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
            this.closeDetails();
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

      try {
        const response = (await OrderService.findAllMyOrders(this.userDetails._id)) || [];

        this.orders = await Promise.all(
          response.map(async (order) => {
            const user = await UserService.findUserById(order.user).catch(() => null);
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
              const response = await SunglassesService.findSunglassesById(sunglass._id);
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

    openDetails(order) {
      this.selectedOrder = order;
    },

    closeDetails() {
      this.selectedOrder = null;
    },
  },

  created() {
    this.getUserDetails();
    this.getAllMyOrders();
  },
};
</script>

<style lang="sass" scoped>
.order-list-card
  transition: border-color 0.2s ease, transform 0.2s ease

  &:hover
    border-color: rgba(255, 255, 255, 0.35) !important
    transform: translateY(-2px)
</style>
