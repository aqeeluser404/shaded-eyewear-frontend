<template>
  <div
    class="admin-overview-details"
    :class="$q.screen.gt.sm ? 'q-pl-lg' : 'q-pl-none'"
  >
    <!-- Heading -->
    <section>
      <div class="overline-tight text-dimmed text-caption">ADMIN DASHBOARD</div>
      <div class="font-size-responsive-xl archivo text-light text-bold">
        OVERVIEW
      </div>
    </section>

    <div class="section-spacer-sm"></div>

    <!--------------------------------------------------------------------- LOADING SKELETON -------------------------------------------------->
    <template v-if="loading">
      <!-- stat cards skeleton -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div
          v-for="n in 4"
          :key="'skel-stat-' + n"
          class="col-12 col-sm-6 col-md-3"
        >
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="row justify-between items-center q-mb-md">
              <div class="skeleton-line skeleton-line--sm"></div>
              <div class="skeleton-line skeleton-line--avatar"></div>
            </div>
            <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
            <div class="skeleton-line skeleton-line--sm"></div>
          </q-card>
        </div>
      </div>

      <!-- charts skeleton -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-8">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-lg"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
            <div class="skeleton-line skeleton-line--sm q-mb-lg"></div>
            <div class="skeleton-line" style="height: 260px"></div>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-lg"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
            <div class="skeleton-line skeleton-line--sm q-mb-lg"></div>
            <div class="skeleton-line" style="height: 260px"></div>
          </q-card>
        </div>
      </div>

      <!-- table skeleton -->
      <q-card
        flat
        bordered
        class="bg-dark-secondary q-pa-lg"
        style="border: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <div class="skeleton-line skeleton-line--md q-mb-lg"></div>
        <div
          v-for="n in 3"
          :key="'skel-row-' + n"
          class="row items-center q-py-md"
          style="border-top: 1px solid rgba(255, 255, 255, 0.1)"
        >
          <div class="col-2">
            <div class="skeleton-line skeleton-line--sm"></div>
          </div>
          <div class="col-3">
            <div class="skeleton-line skeleton-line--md"></div>
          </div>
          <div class="col-3">
            <div class="skeleton-line skeleton-line--md"></div>
          </div>
          <div class="col-2">
            <div class="skeleton-line skeleton-line--sm"></div>
          </div>
          <div class="col-2 row justify-end">
            <div class="skeleton-line skeleton-line--sm"></div>
          </div>
        </div>
      </q-card>
    </template>

    <!--------------------------------------------------------------------- REAL CONTENT -------------------------------------------------->
    <template v-else>
      <!-------------------------------------- STAT CARDS -------------------------------------->
      <div class="row q-col-gutter-md q-mb-lg">
        <!-- Revenue -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md stat-card"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="row justify-between items-center q-mb-lg">
              <div class="overline-tight text-dimmed text-caption">REVENUE</div>
              <q-icon name="eva-dollar-outline" color="primary" size="20px" />
            </div>
            <div class="font-size-responsive-xl archivo text-light text-bold">
              R {{ formatNumber(stats.revenue) }}
            </div>
            <div class="text-caption text-dimmed q-mt-sm">
              Lifetime paid orders
            </div>
          </q-card>
        </div>

        <!-- Orders -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md stat-card"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="row justify-between items-center q-mb-lg">
              <div class="overline-tight text-dimmed text-caption">ORDERS</div>
              <q-icon name="eva-cube-outline" color="primary" size="20px" />
            </div>
            <div class="font-size-responsive-xl archivo text-light text-bold">
              {{ stats.orders }}
            </div>
            <div class="text-caption text-dimmed q-mt-sm">
              {{ stats.pendingOrders }} awaiting action
            </div>
          </q-card>
        </div>

        <!-- Customers -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md stat-card"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="row justify-between items-center q-mb-lg">
              <div class="overline-tight text-dimmed text-caption">
                CUSTOMERS
              </div>
              <q-icon name="eva-people-outline" color="primary" size="20px" />
            </div>
            <div class="font-size-responsive-xl archivo text-light text-bold">
              {{ stats.customers }}
            </div>
            <div class="text-caption text-dimmed q-mt-sm">
              Registered accounts
            </div>
          </q-card>
        </div>

        <!-- Low Stock -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md stat-card"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="row justify-between items-center q-mb-lg">
              <div class="overline-tight text-dimmed text-caption">
                LOW STOCK
              </div>
              <q-icon
                name="eva-alert-circle-outline"
                color="primary"
                size="20px"
              />
            </div>
            <div class="font-size-responsive-xl archivo text-light text-bold">
              {{ stats.lowStock }}
            </div>
            <div class="text-caption text-dimmed q-mt-sm">
              Frames below 3 units
            </div>
          </q-card>
        </div>
      </div>

      <!-------------------------------------- CHARTS -------------------------------------->
      <div class="row q-col-gutter-md q-mb-lg">
        <!-- Sales this week -->
        <div class="col-12 col-md-8">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-lg"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="text-subtitle1 text-light text-bold">
              Sales this week
            </div>
            <div class="text-caption text-dimmed q-mb-md">
              Revenue in rand, last 7 days
            </div>

            <apexchart
              type="area"
              height="280"
              :options="salesChartOptions"
              :series="salesChartSeries"
            />
          </q-card>
        </div>

        <!-- Frequent users -->
        <div class="col-12 col-md-4">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-lg"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="text-subtitle1 text-light text-bold">
              Frequent users
            </div>
            <div class="text-caption text-dimmed q-mb-md">
              Top customers by login count
            </div>

            <apexchart
              type="bar"
              height="280"
              :options="usersChartOptions"
              :series="usersChartSeries"
            />
          </q-card>
        </div>
      </div>

      <!-------------------------------------- RECENT ORDERS -------------------------------------->
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
            <div class="text-subtitle1 text-light text-bold">RECENT ORDERS</div>
            <div class="text-caption text-dimmed">
              Latest 5 orders across the store
            </div>
          </div>
          <q-btn
            flat
            dense
            no-caps
            label="View all"
            icon-right="eva-arrow-forward-outline"
            class="custom-button icon-btn text-primary text-subtitle1"
            @click="$emit('navigate', 'OrdersComponent')"
          />
        </q-card-section>

        <q-card-section class="q-pa-none">
          <!-- header row -->
          <div
            class="row items-center q-px-md q-py-md"
            style="border-bottom: 1px solid rgba(255, 255, 255, 0.1)"
          >
            <div class="col-2 text-dimmed text-caption">ORDER</div>
            <div class="col-3 text-dimmed text-caption">CUSTOMER</div>
            <div class="col-3 text-dimmed text-caption">ITEM</div>
            <div class="col-2 text-dimmed text-caption">TOTAL</div>
            <div class="col-2 text-right text-dimmed text-caption">STATUS</div>
          </div>

          <!-- data rows -->
          <div
            v-for="(order, index) in recentOrders"
            :key="order._id"
            class="row items-center q-px-md q-py-md"
            :style="
              index !== recentOrders.length - 1
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
            <div class="col-3 text-subtitle1 text-dimmed">
              {{ order.userFirstName }}
            </div>
            <div class="col-3 text-subtitle1 text-light">
              {{ order.itemName }}
            </div>
            <div class="col-2 text-subtitle1 archivo text-gradient-primary">
              R {{ order.totalAmount }}.00
            </div>
            <div class="col-2 row justify-end">
              <div class="row items-center">
                <div
                  class="status-dot"
                  :class="'status-dot--' + order.statusBucket"
                ></div>
                <span
                  class="text-caption text-bold q-ml-sm"
                  :class="'text-' + order.statusColor"
                >
                  {{ order.statusLabel }}
                </span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>

<script>
import UserService from "src/services/UserService";
import OrderService from "src/services/OrderService";
import SunglassesService from "src/services/SunglassesService";
import Helper from "src/services/utils";

import VueApexCharts from "vue3-apexcharts";

export default {
  name: "OverviewComponent",

  components: {
    apexchart: VueApexCharts,
  },

  emits: ["navigate"],

  data() {
    return {
      loading: true,
      orders: [],
      users: [],
      sunglasses: [],
      frequentUsers: [],

      stats: {
        revenue: 0,
        orders: 0,
        pendingOrders: 0,
        customers: 0,
        lowStock: 0,
      },

      recentOrders: [],
      salesChartSeries: [],
    };
  },

  computed: {
    salesChartOptions() {
      return {
        chart: {
          id: "sales-weekly",
          toolbar: { show: false },
          background: "transparent",
          fontFamily: "Hind, sans-serif",
        },
        theme: { mode: "dark" },
        colors: ["#F97316"],
        stroke: { curve: "smooth", width: 2 },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.05,
            stops: [0, 100],
          },
        },
        dataLabels: { enabled: false },
        grid: {
          borderColor: "rgba(255, 255, 255, 0.08)",
          strokeDashArray: 3,
        },
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          labels: { style: { colors: "#9b9b9b" } },
          axisBorder: { color: "rgba(255, 255, 255, 0.1)" },
          axisTicks: { color: "rgba(255, 255, 255, 0.1)" },
        },
        yaxis: {
          labels: {
            style: { colors: "#9b9b9b" },
            formatter: (val) => Math.round(val),
          },
        },
        tooltip: {
          theme: "dark",
          y: { formatter: (val) => `R ${val}` },
        },
      };
    },

    usersChartOptions() {
      const names = this.frequentUsers
        .slice(0, 5)
        .map((u) => u.username || "Unknown");

      return {
        chart: {
          id: "frequent-users",
          toolbar: { show: false },
          background: "transparent",
          fontFamily: "Hind, sans-serif",
        },
        theme: { mode: "dark" },
        colors: ["#38BDF8"],
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 4,
            barHeight: "55%",
          },
        },
        dataLabels: { enabled: false },
        grid: {
          borderColor: "rgba(255, 255, 255, 0.08)",
          strokeDashArray: 3,
        },
        xaxis: {
          categories: names,
          labels: { style: { colors: "#9b9b9b" } },
          axisBorder: { color: "rgba(255, 255, 255, 0.1)" },
          axisTicks: { color: "rgba(255, 255, 255, 0.1)" },
        },
        yaxis: {
          labels: { style: { colors: "#9b9b9b" } },
        },
        tooltip: {
          theme: "dark",
          y: { formatter: (val) => `${val} logins` },
        },
      };
    },

    usersChartSeries() {
      const top = this.frequentUsers.slice(0, 5);
      return [
        {
          name: "Logins",
          data: top.map((u) => u?.loginInfo?.loginCount || 0),
        },
      ];
    },
  },

  methods: {
    formateOrderId: Helper.formateOrderId,

    formatNumber(value) {
      if (!value) return "0";
      return value.toLocaleString("en-ZA");
    },

    async fetchAll() {
      this.loading = true;

      try {
        const [orders, users, sunglasses, frequentUsers] = await Promise.all([
          OrderService.findAllOrders(),
          UserService.findAllUsers(),
          SunglassesService.findAllSunglasses(),
          UserService.findUsersFrequentlyLoggedIn(),
        ]);

        this.orders = orders || [];
        this.users = users || [];
        this.sunglasses = sunglasses || [];
        this.frequentUsers = frequentUsers || [];

        await this.computeStats();
        await this.computeCharts();
        await this.computeRecentOrders();
      } catch (error) {
        console.error("Overview fetch failed:", error);
      }

      this.loading = false;
    },

    async computeStats() {
      const paidOrders = this.orders.filter((o) => o.status === "paid");
      const pendingOrders = this.orders.filter((o) => o.status === "pending");

      this.stats = {
        revenue: paidOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
        orders: this.orders.length,
        pendingOrders: pendingOrders.length,
        customers: this.users.length,
        lowStock: this.sunglasses.filter((s) => (s.stock || 0) < 3).length,
      };
    },

    async computeCharts() {
      // Sales per day for the last 7 days
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dailyTotals = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0,
      };

      const now = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);

      for (const order of this.orders) {
        if (order.status !== "paid") continue;
        const d = new Date(order.orderDate);
        if (d < weekAgo) continue;
        const dayName = days[d.getDay()];
        dailyTotals[dayName] += order.totalAmount || 0;
      }

      this.salesChartSeries = [
        {
          name: "Revenue",
          data: [
            dailyTotals.Mon,
            dailyTotals.Tue,
            dailyTotals.Wed,
            dailyTotals.Thu,
            dailyTotals.Fri,
            dailyTotals.Sat,
            dailyTotals.Sun,
          ],
        },
      ];
    },

    async computeRecentOrders() {
      const sorted = [...this.orders].sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );

      const top = sorted.slice(0, 5);

      this.recentOrders = await Promise.all(
        top.map(async (order) => {
          const user =
            this.users.find((u) => String(u._id) === String(order.user)) ||
            (await UserService.findUserById(order.user).catch(() => null));

          // Get the first item name
          let itemName = "—";
          if (order.sunglasses && order.sunglasses.length > 0) {
            try {
              const sunglass = await SunglassesService.findSunglassesById(
                order.sunglasses[0]._id
              );
              itemName = sunglass?.model || "—";
            } catch (e) {
              // leave as "—"
            }
          }

          return {
            ...order,
            userFirstName: user?.username || "Unknown",
            itemName,
            ...this.mapStatus(order.status),
          };
        })
      );
    },

    mapStatus(status) {
      const map = {
        paid: {
          statusLabel: "READY",
          statusColor: "primary",
          statusBucket: "ready",
        },
        pending: {
          statusLabel: "PENDING",
          statusColor: "warning",
          statusBucket: "pending",
        },
        "paid & picked up": {
          statusLabel: "COMPLETE",
          statusColor: "positive",
          statusBucket: "complete",
        },
        shipped: {
          statusLabel: "SHIPPED",
          statusColor: "info",
          statusBucket: "shipped",
        },
        returned: {
          statusLabel: "RETURNED",
          statusColor: "negative",
          statusBucket: "returned",
        },
      };
      return (
        map[status] || {
          statusLabel: status?.toUpperCase() || "—",
          statusColor: "grey",
          statusBucket: "grey",
        }
      );
    },
  },

  created() {
    this.fetchAll();
  },
};
</script>

<style lang="sass" scoped>
.stat-card
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

.status-dot
  width: 8px
  height: 8px
  border-radius: 50%
  display: inline-block

.status-dot--ready
  background-color: var(--q-primary)
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15)

.status-dot--pending
  background-color: #fbbf24
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.15)

.status-dot--complete
  background-color: #22c55e
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15)

.status-dot--shipped
  background-color: #38bdf8
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15)

.status-dot--returned
  background-color: #ef4444
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15)

.status-dot--grey
  background-color: #9b9b9b
</style>
