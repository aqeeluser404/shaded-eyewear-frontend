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
              <q-icon name="fa-solid fa-coins" color="primary" size="16px" />
            </div>
            <div class="font-size-responsive-xl archivo text-light text-bold">
              R {{ formatNumber(stats.revenue) }}
            </div>
            <div class="text-caption text-dimmed q-mt-sm">
              Lifetime net revenue
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
              {{ stats.activeToday }} active today
            </div>
          </q-card>
        </div>

        <!-- Inventory -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card
            flat
            bordered
            class="bg-dark-secondary q-pa-md stat-card"
            style="border: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="row justify-between items-center q-mb-lg">
              <div class="overline-tight text-dimmed text-caption">
                INVENTORY
              </div>
              <q-icon name="fa-solid fa-glasses" color="primary" size="16px" />
            </div>
            <div class="font-size-responsive-xl archivo text-light text-bold">
              {{ stats.totalStock }}
            </div>
            <div class="text-caption text-dimmed q-mt-sm">
              {{ stats.frameCount }} frames in stock
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
            <div class="row justify-between items-start q-mb-md">
              <div>
                <div class="font-size-responsive-md text-light text-bold">
                  Sales
                </div>
                <div class="text-caption text-dimmed">
                  {{ periodCaption }}
                </div>
              </div>

              <q-select
                v-model="period"
                :options="periodOptions"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                dense
                outlined
                dark
                color="primary"
                class="period-select"
                @update:model-value="computeCharts"
              />
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
            <div class="font-size-responsive-md text-light text-bold">
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
            <div class="font-size-responsive-md text-light text-bold">
              Recent Orders
            </div>
            <div class="text-caption text-dimmed">
              Latest orders across the store
            </div>
          </div>
          <!-- <q-btn
            flat
            dense
            no-caps
            label="View all"
            icon-right="eva-arrow-forward-outline"
            class="custom-button icon-btn text-primary text-subtitle1"
            @click="$emit('navigate', 'OrdersComponent')"
          /> -->
        </q-card-section>

        <q-card-section class="q-pa-none">
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
            <div class="col-3 text-dimmed font-size-responsive-xs text-bold">
              ITEM
            </div>
            <div class="col-2 text-dimmed font-size-responsive-xs text-bold">
              TOTAL
            </div>
            <div
              class="col-2 text-dimmed font-size-responsive-xs text-bold text-center"
            >
              STATUS
            </div>
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
            <div class="col-3 font-size-responsive-sm text-dimmed">
              {{ order.userFirstName }}
            </div>
            <div class="col-3 font-size-responsive-sm text-dimmed">
              {{ order.itemName }}
            </div>
            <div class="col-2 font-size-responsive-sm text-dimmed">
              R {{ order.totalAmount }}.00
            </div>
            <div class="col-2 row justify-center">
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
        activeToday: 0,
        totalStock: 0,
        frameCount: 0,
      },

      period: "all-time",
      periodOptions: [
        { label: "This week", value: "this-week" },
        { label: "Last week", value: "last-week" },
        { label: "This month", value: "this-month" },
        { label: "Last 30 days", value: "last-30" },
        { label: "All time", value: "all-time" },
      ],

      recentOrders: [],
      salesChartSeries: [],
    };
  },

  computed: {
    periodCaption() {
      const map = {
        "this-week": "Revenue and refunds, this week",
        "last-week": "Revenue and refunds, last week",
        "this-month": "Revenue and refunds, this month",
        "last-30": "Revenue and refunds, last 30 days",
        "all-time": "Revenue and refunds, all time",
      };
      return map[this.period] || "";
    },

    salesChartOptions() {
      const { labels } = this.getPeriodRange();

      return {
        chart: {
          id: "sales-weekly",
          toolbar: { show: false },
          background: "transparent",
          fontFamily: "Hind, sans-serif",
        },
        theme: { mode: "dark" },
        colors: ["#F97316", "#EF4444"],
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
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "right",
          labels: { colors: "#9b9b9b" },
          markers: { radius: 6, offsetX: -4 },
          itemMargin: { horizontal: 16, vertical: 0 },
        },
        xaxis: {
          categories: labels,
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
      const paidStatuses = ["paid", "paid & picked up", "paid & delivered"];

      const paidOrders = this.orders.filter((o) =>
        paidStatuses.includes(o.status)
      );
      const pendingOrders = this.orders.filter((o) => o.status === "pending");
      const refundedOrders = this.orders.filter((o) => o.status === "refunded");

      const framesWithStock = this.sunglasses.filter(
        (s) => typeof s.stock === "number" && s.stock > 0
      );

      // Count users whose lastLogin falls on today's date
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const activeToday = this.users.filter((u) => {
        const last = u?.loginInfo?.lastLogin;
        if (!last) return false;
        return new Date(last) >= startOfToday;
      }).length;

      const grossRevenue = paidOrders.reduce(
        (sum, o) => sum + (o.totalAmount || 0),
        0
      );
      const refundedTotal = refundedOrders.reduce(
        (sum, o) => sum + Math.abs(o.totalAmount || 0),
        0
      );

      this.stats = {
        revenue: grossRevenue - refundedTotal,
        orders: this.orders.length,
        pendingOrders: pendingOrders.length,
        customers: this.users.length,
        activeToday,
        totalStock: framesWithStock.reduce((sum, s) => sum + s.stock, 0),
        frameCount: framesWithStock.length,
      };
    },

    async computeCharts() {
      // determine the date range and labels based on selected period
      const { start, end, labels, bucketKeys } = this.getPeriodRange();

      // build empty buckets
      const revenueBuckets = {};
      const refundBuckets = {};
      for (const key of bucketKeys) {
        revenueBuckets[key] = 0;
        refundBuckets[key] = 0;
      }

      const paidStatuses = ["paid", "paid & picked up", "paid & delivered"];

      for (const order of this.orders) {
        const d = new Date(order.orderDate);
        if (start && d < start) continue;
        if (end && d > end) continue;

        const key = this.getBucketKey(d, this.period);
        if (!(key in revenueBuckets)) continue;

        if (paidStatuses.includes(order.status)) {
          revenueBuckets[key] += order.totalAmount || 0;
        } else if (order.status === "refunded") {
          refundBuckets[key] += Math.abs(order.totalAmount || 0);
        }
      }

      this.salesChartSeries = [
        {
          name: "Revenue",
          data: bucketKeys.map((k) => revenueBuckets[k]),
        },
        {
          name: "Refunds",
          data: bucketKeys.map((k) => refundBuckets[k]),
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

    getPeriodRange() {
      const now = new Date();

      if (this.period === "this-week") {
        // Monday to Sunday of current week
        const day = now.getDay(); // 0 = Sun, 1 = Mon, ...
        const diffToMonday = (day + 6) % 7;
        const monday = new Date(now);
        monday.setDate(now.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        return {
          start: monday,
          end: sunday,
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          bucketKeys: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        };
      }

      if (this.period === "last-week") {
        const day = now.getDay();
        const diffToMonday = (day + 6) % 7;
        const monday = new Date(now);
        monday.setDate(now.getDate() - diffToMonday - 7);
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        return {
          start: monday,
          end: sunday,
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          bucketKeys: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        };
      }

      if (this.period === "this-month") {
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // buckets: one per day of the month
        const bucketKeys = [];
        const labels = [];
        for (let d = 1; d <= lastOfMonth.getDate(); d++) {
          bucketKeys.push(String(d));
          labels.push(String(d));
        }

        return { start: firstOfMonth, end: lastOfMonth, labels, bucketKeys };
      }

      if (this.period === "last-30") {
        const start = new Date(now);
        start.setDate(now.getDate() - 29);
        start.setHours(0, 0, 0, 0);

        // buckets: one per day
        const bucketKeys = [];
        const labels = [];
        for (let i = 0; i < 30; i++) {
          const d = new Date(start);
          d.setDate(start.getDate() + i);
          bucketKeys.push(d.toISOString().slice(0, 10));
          labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
        }

        return { start, end: now, labels, bucketKeys };
      }

      if (this.period === "all-time") {
        // buckets: one per month
        const bucketKeys = [];
        const labels = [];
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        // find earliest order
        const dates = this.orders.map((o) => new Date(o.orderDate));
        const earliest = dates.length ? new Date(Math.min(...dates)) : now;
        const cursor = new Date(earliest.getFullYear(), earliest.getMonth(), 1);

        while (cursor <= now) {
          const key = `${cursor.getFullYear()}-${String(
            cursor.getMonth() + 1
          ).padStart(2, "0")}`;
          bucketKeys.push(key);
          labels.push(
            `${monthNames[cursor.getMonth()]} ${String(
              cursor.getFullYear()
            ).slice(-2)}`
          );
          cursor.setMonth(cursor.getMonth() + 1);
        }

        return { start: null, end: null, labels, bucketKeys };
      }

      // fallback
      return {
        start: null,
        end: null,
        labels: [],
        bucketKeys: [],
      };
    },

    getBucketKey(date, period) {
      if (period === "this-week" || period === "last-week") {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
      }
      if (period === "this-month") {
        return String(date.getDate());
      }
      if (period === "last-30") {
        return date.toISOString().slice(0, 10);
      }
      if (period === "all-time") {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      }
      return "";
    },

    mapStatus(status) {
      const map = {
        pending: {
          statusLabel: "PENDING",
          statusColor: "warning",
          statusBucket: "pending",
        },
        paid: {
          statusLabel: "PAID",
          statusColor: "positive",
          statusBucket: "paid",
        },
        "paid & picked up": {
          statusLabel: "COLLECTED",
          statusColor: "collected",
          statusBucket: "collected",
        },
        "paid & delivered": {
          statusLabel: "DELIVERED",
          statusColor: "delivered",
          statusBucket: "delivered",
        },
        refunded: {
          statusLabel: "REFUNDED",
          statusColor: "negative",
          statusBucket: "refunded",
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
.period-select
  min-width: 130px
  font-size: 0.85rem

  :deep(.q-field__control)
    background-color: #121212

  :deep(.q-field__native)
    color: #f0f0f0

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

// pending — yellow
.status-dot--pending
  background-color: #fbbf24
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.15)

// paid — green (new, stands alone)
.status-dot--paid
  background-color: #22c55e
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15)

// collected — cyan/teal (unique)
.status-dot--collected
  background-color: #14b8a6
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15)

// delivered — purple (unique)
.status-dot--delivered
  background-color: #a855f7
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15)

// refunded — red
.status-dot--refunded
  background-color: #ef4444
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15)

// fallback
.status-dot--grey
  background-color: #9b9b9b
</style>
