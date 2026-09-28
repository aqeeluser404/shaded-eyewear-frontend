<template>
  <div class="orders-details q-pl-lg">
    <!--------------------------------------------------------------------- HAS ORDERS -------------------------------------------------->
    <section v-if="orders.length > 0">
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
            class="row justify-between items-center"
            style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div>
              <div class="overline text-dimmed text-caption q-mb-xs">ORDER</div>
              <div class="text-subtitle1 text-light">#{{ order._id }}</div>
            </div>
            <div>
              <div class="overline text-dimmed text-caption q-mb-xs">
                PLACED
              </div>
              <div class="text-subtitle1 text-light">
                {{ formatDate(order.orderDate) }}
              </div>
            </div>
            <div class="text-right">
              <div class="overline text-dimmed text-caption q-mb-xs">TOTAL</div>
              <div
                class="font-size-responsive-lg archivo text-gradient-primary"
              >
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
              class="row items-center cursor-pointer q-py-lg q-px-md"
              :style="
                index !== order.sunglassesDetails.length - 1
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

              <div class="col-md-7 col-8 q-pl-md">
                <div
                  class="font-size-responsive-md archivo text-uppercase text-light"
                >
                  <b>{{ capitalizeFirstLetter(sunglass.model) }}</b>
                </div>
                <div class="text-subtitle1 text-dimmed">
                  R {{ sunglass.price }}.00
                </div>
                <div
                  v-if="order.orderType === 'pickup'"
                  class="text-subtitle1 text-dimmed q-mt-sm"
                >
                  Collection at 65 Stockley Road, Kenwyn
                </div>
              </div>

              <div class="col-md-3 col-12 row justify-end q-mt-md q-mt-md-none">
                <q-btn
                  rounded
                  dense
                  no-caps
                  outline
                  color="grey"
                  text-color="grey"
                  label="View frame"
                  icon-right="eva-arrow-forward-outline"
                  class="q-px-lg q-py-sm rounded-button text-subtitle1"
                  @click.stop="viewSunglassesDetails(sunglass._id)"
                />
              </div>
            </div>
          </q-card-section>

          <!-- status / actions -->
          <q-card-section
            class="row items-center justify-between"
            style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="overline text-dimmed text-caption">
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

            <div
              v-if="order.status === 'pending'"
              class="row items-center q-gutter-sm"
            >
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
                class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold"
              />
            </div>
          </q-card-section>
        </q-card>
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

          <div class="font-size-responsive-xl archivo text-light text-bold q-mb-sm">
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
    this.getAllMyOrders();
  },
};
</script>

<style lang="sass" scoped>
.order-list-card
  transition: border-color 0.2s ease

  &:hover
    border-color: rgba(255, 255, 255, 0.35) !important
</style>
