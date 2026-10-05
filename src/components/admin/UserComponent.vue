<template>
  <div
    class="admin-user-details"
    :class="$q.screen.gt.sm ? 'q-pl-lg' : 'q-pl-none'"
  >
    <!-- Heading -->
    <section>
      <div class="row justify-between items-center">
        <div>
          <div class="overline-tight text-dimmed text-caption">
            ADMIN DASHBOARD
          </div>
          <div class="font-size-responsive-xl archivo text-light text-bold">
            CUSTOMERS
          </div>
        </div>

        <q-input
          v-model="search"
          placeholder="Search records"
          dense
          outlined
          dark
          class="customer-search"
          @update:model-value="applyFilters"
        >
          <template #prepend>
            <q-icon name="eva-search-outline" size="18px" />
          </template>
        </q-input>
      </div>
    </section>

    <div class="section-spacer-sm"></div>

    <!--------------------------------------------------------------------- LOADING SKELETON -------------------------------------------------->
    <template v-if="loading">
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
            <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
            <div class="skeleton-line skeleton-line--sm"></div>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <div
            v-for="n in 4"
            :key="'skel-' + n"
            class="row items-center q-px-md q-py-md"
            :style="
              n !== 4 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)' : ''
            "
          >
            <div class="col-3">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-3">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-3">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-3 row justify-end">
              <div class="skeleton-line skeleton-line--sm"></div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </template>

    <!--------------------------------------------------------------------- REAL CONTENT -------------------------------------------------->
    <template v-else>
      <!----------------------------------- SELECTED USER DETAIL ----------------------------------->
      <div v-if="selectedUser">
        <q-card
          flat
          bordered
          class="bg-dark-secondary user-detail-card"
          style="border: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <!-- header -->
          <q-card-section
            class="row justify-between items-center"
            style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="row items-center q-gutter-md">
              <q-avatar size="48px" class="user-avatar-initials">
                <div>
                  {{ selectedUser.firstName?.charAt(0)
                  }}{{ selectedUser.lastName?.charAt(0) }}
                </div>
              </q-avatar>

              <div>
                <div class="font-size-responsive-md text-light text-bold">
                  {{ selectedUser.firstName }} {{ selectedUser.lastName }}
                </div>
                <div class="row items-center q-mt-xs">
                  <div
                    class="status-dot"
                    :class="
                      selectedUser.loginInfo?.isLoggedIn
                        ? 'status-dot--online'
                        : 'status-dot--offline'
                    "
                  ></div>
                  <span
                    class="text-caption text-bold q-ml-sm"
                    :class="
                      selectedUser.loginInfo?.isLoggedIn
                        ? 'text-positive'
                        : 'text-dimmed'
                    "
                    style="letter-spacing: 0.08em"
                  >
                    {{
                      selectedUser.loginInfo?.isLoggedIn ? "ONLINE" : "OFFLINE"
                    }}
                  </span>
                </div>
              </div>
            </div>

            <q-btn
              rounded
              dense
              no-caps
              flat
              label="Close"
              icon="eva-close-outline"
              class="custom-button icon-btn text-subtitle1 text-dimmed q-px-lg q-py-sm"
              @click="closeDetails"
            />
          </q-card-section>

          <!-- body: two columns -->
          <template v-if="userLoading">
            <!-- LOADING SKELETON -->
            <div class="row">
              <!-- LEFT: profile + activity skeleton -->
              <div class="col-12 col-md-7 user-detail-left">
                <q-card-section class="q-pt-lg q-pb-none">
                  <div class="skeleton-line skeleton-line--md q-mb-md"></div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div
                    v-for="n in 6"
                    :key="'skel-profile-' + n"
                    class="row items-center q-px-md q-py-md user-detail-row"
                  >
                    <div class="col-4">
                      <div class="skeleton-line skeleton-line--sm"></div>
                    </div>
                    <div class="col-8">
                      <div class="skeleton-line skeleton-line--md"></div>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section
                  class="q-pt-lg q-pb-none"
                  style="border-top: 1px solid rgba(255, 255, 255, 0.1)"
                >
                  <div class="skeleton-line skeleton-line--md q-mb-md"></div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div
                    v-for="n in 3"
                    :key="'skel-activity-' + n"
                    class="row items-center q-px-md q-py-md user-detail-row"
                  >
                    <div class="col-4">
                      <div class="skeleton-line skeleton-line--sm"></div>
                    </div>
                    <div class="col-8">
                      <div class="skeleton-line skeleton-line--md"></div>
                    </div>
                  </div>
                </q-card-section>
              </div>

              <!-- RIGHT: glance + invoice skeleton -->
              <div class="col-12 col-md-5 user-detail-right column">
                <q-card-section class="q-pt-lg q-pb-none">
                  <div class="skeleton-line skeleton-line--md q-mb-md"></div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div
                    v-for="n in 4"
                    :key="'skel-glance-' + n"
                    class="row items-center justify-between q-px-md q-py-md user-detail-row"
                  >
                    <div class="skeleton-line skeleton-line--sm"></div>
                    <div class="skeleton-line skeleton-line--sm"></div>
                  </div>
                </q-card-section>

                <div class="invoice-block q-mt-auto">
                  <div class="invoice-header">
                    <div class="skeleton-line skeleton-line--sm"></div>
                    <div class="skeleton-line skeleton-line--avatar"></div>
                  </div>
                  <div class="invoice-lines">
                    <div
                      v-for="n in 3"
                      :key="'skel-invoice-' + n"
                      class="invoice-line"
                    >
                      <div
                        class="skeleton-line skeleton-line--md"
                        style="width: 100%"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <!-- REAL CONTENT -->
            <div class="row">
              <!-- LEFT: profile + activity rows -->
              <div class="col-12 col-md-7 user-detail-left">
                <!-- PROFILE -->
                <q-card-section class="q-pb-none q-pt-lg">
                  <div
                    class="font-size-responsive-md text-light text-bold q-mb-sm"
                  >
                    Profile
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div
                    v-for="(row, i) in profileRows"
                    :key="'profile-' + i"
                    class="row items-center q-px-md q-py-md user-detail-row"
                  >
                    <div class="col-4">
                      <span class="overline-tight text-dimmed text-caption">{{
                        row.label
                      }}</span>
                    </div>
                    <div class="col-8">
                      <q-select
                        v-if="
                          row.key === 'userType' &&
                          editMode === selectedUser._id
                        "
                        v-model="selectedUser.userType"
                        :options="userTypeOptions"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                        dense
                        outlined
                        dark
                        class="edit-user-type"
                        popup-content-class="period-select-menu"
                      />
                      <div v-else class="font-size-responsive-sm text-light">
                        {{ row.value }}
                      </div>
                    </div>
                  </div>
                </q-card-section>

                <!-- ACTIVITY -->
                <q-card-section
                  class="q-pb-none q-pt-lg"
                  style="border-top: 1px solid rgba(255, 255, 255, 0.1)"
                >
                  <div
                    class="font-size-responsive-md text-light text-bold q-mb-sm"
                  >
                    Activity
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div
                    v-for="(row, i) in activityRows"
                    :key="'activity-' + i"
                    class="row items-center q-px-md q-py-md user-detail-row"
                  >
                    <div class="col-4">
                      <span class="overline-tight text-dimmed text-caption">{{
                        row.label
                      }}</span>
                    </div>
                    <div class="col-8">
                      <q-badge
                        v-if="row.key === 'userId'"
                        outline
                        color="grey"
                        text-color="grey"
                        class="order-id-badge"
                      >
                        {{ formatUserId(selectedUser) }}
                      </q-badge>
                      <span v-else class="font-size-responsive-sm text-light">
                        {{ row.value }}
                      </span>
                    </div>
                  </div>
                </q-card-section>
              </div>

              <!-- RIGHT: at-a-glance + recent orders -->
              <div class="col-12 col-md-5 user-detail-right column">
                <q-card-section class="q-pt-lg q-pb-none">
                  <div
                    class="font-size-responsive-md text-light text-bold q-mb-sm"
                  >
                    At a glance
                  </div>
                </q-card-section>

                <q-card-section class="q-pa-none">
                  <div
                    v-for="(stat, i) in glanceStats"
                    :key="'glance-' + i"
                    class="row items-center q-px-md q-py-md user-detail-row"
                  >
                    <div class="col-6">
                      <span class="overline-tight text-dimmed text-caption">{{
                        stat.label
                      }}</span>
                    </div>
                    <div class="col-6 text-right">
                      <span
                        class="font-size-responsive-sm text-bold"
                        :class="
                          stat.highlight
                            ? 'text-gradient-primary'
                            : 'text-light'
                        "
                      >
                        {{ stat.value }}
                      </span>
                    </div>
                  </div>
                </q-card-section>

                <!-- invoice pinned to bottom -->
                <div class="invoice-block q-mt-auto">
                  <div class="invoice-header">
                    <span class="font-size-responsive-md text-light text-bold"
                      >Recent Orders</span
                    >
                    <span class="invoice-count">{{
                      recentUserOrders.length
                    }}</span>
                  </div>

                  <div
                    v-if="recentUserOrders.length === 0"
                    class="invoice-empty"
                  >
                    <q-icon
                      name="eva-shopping-bag-outline"
                      size="24px"
                      class="q-mb-sm"
                    />
                    <span class="text-caption text-dimmed">No orders yet</span>
                  </div>

                  <div v-else class="invoice-lines">
                    <div
                      v-for="order in recentUserOrders"
                      :key="order._id"
                      class="invoice-line cursor-pointer"
                      @click="viewOrder(order._id)"
                    >
                      <span class="invoice-line__label">
                        #{{ formatOrderId(order) }}
                      </span>
                      <span class="invoice-line__dots"></span>
                      <span class="invoice-line__value">
                        R {{ order.totalAmount }}.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- actions -->
          <q-card-section
            class="row items-center justify-between"
            style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="row items-center q-gutter-sm">
              <q-btn
                v-if="editMode !== selectedUser._id"
                rounded
                dense
                no-caps
                outline
                color="grey"
                text-color="grey"
                icon="eva-edit-outline"
                label="Edit"
                class="q-px-lg q-py-sm text-caption icon-btn text-bold"
                @click="editMode = selectedUser._id"
              />
              <template v-if="editMode === selectedUser._id">
                <q-btn
                  rounded
                  dense
                  no-caps
                  text-color="dark"
                  label="Save"
                  class="btn-gradient-primary q-px-lg q-py-sm rounded-button text-caption text-bold"
                  @click="updateUserType(selectedUser)"
                />
                <q-btn
                  rounded
                  dense
                  no-caps
                  flat
                  label="Cancel"
                  class="custom-button text-caption text-dimmed q-px-lg q-py-sm"
                  @click="cancelEdit"
                />
              </template>

              <q-btn
                rounded
                dense
                no-caps
                outline
                color="negative"
                text-color="negative"
                icon="eva-trash-2-outline"
                label="Delete"
                class="q-px-lg q-py-sm text-caption icon-btn text-bold"
                @click="deleteUser(selectedUser._id, selectedUser.username)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!----------------------------------- ALL USERS TABLE ----------------------------------->
      <div v-else>
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
                Registered Customers
              </div>
              <div class="text-caption text-dimmed">
                {{ filteredList.length }} registered
                {{ filteredList.length === 1 ? "profile" : "profiles" }}
              </div>
            </div>

            <q-select
              v-model="selectedLoginStatus"
              :options="loginStatus"
              dense
              outlined
              dark
              class="status-filter"
              popup-content-class="period-select-menu"
              @update:model-value="applyFilters"
            />
          </q-card-section>

          <q-card-section class="q-pa-none">
            <!-- header row -->
            <div
              class="row items-center q-px-md q-py-md"
              style="border-bottom: 1px solid rgba(255, 255, 255, 0.1)"
            >
              <div class="col-3 text-dimmed font-size-responsive-xs text-bold">
                USERNAME
              </div>
              <div class="col-3 text-dimmed font-size-responsive-xs text-bold">
                NAME
              </div>
              <div class="col-3 text-dimmed font-size-responsive-xs text-bold">
                LAST LOGIN
              </div>
              <div
                class="col-3 text-dimmed font-size-responsive-xs text-bold text-center"
              >
                STATUS
              </div>
            </div>

            <!-- data rows -->
            <div
              v-for="(user, index) in filteredList"
              :key="user._id"
              class="row items-center q-px-md q-py-md cursor-pointer user-row"
              :style="
                index !== filteredList.length - 1
                  ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)'
                  : ''
              "
              @click="openDetails(user)"
            >
              <div class="col-3">
                <q-badge
                  outline
                  color="grey"
                  text-color="grey"
                  class="user-badge"
                >
                  {{ user.username }}
                </q-badge>
              </div>
              <div class="col-3 font-size-responsive-sm text-dimmed">
                {{ user.firstName }} {{ user.lastName }}
              </div>
              <div class="col-3 font-size-responsive-sm text-dimmed">
                {{
                  user.loginInfo && user.loginInfo.lastLogin
                    ? formatDate(user.loginInfo.lastLogin)
                    : "—"
                }}
              </div>
              <div class="col-3 row justify-center">
                <div class="row items-center">
                  <div
                    class="status-dot"
                    :class="
                      user.loginInfo && user.loginInfo.isLoggedIn
                        ? 'status-dot--online'
                        : 'status-dot--offline'
                    "
                  ></div>
                  <span
                    class="text-caption text-bold q-ml-sm"
                    :class="
                      user.loginInfo && user.loginInfo.isLoggedIn
                        ? 'text-positive'
                        : 'text-dimmed'
                    "
                  >
                    {{
                      user.loginInfo && user.loginInfo.isLoggedIn
                        ? "ONLINE"
                        : "OFFLINE"
                    }}
                  </span>
                </div>
              </div>
            </div>

            <!-- empty state -->
            <div
              v-if="filteredList.length === 0"
              class="column items-center q-py-xl q-px-md"
            >
              <q-icon
                name="fa-solid fa-user-slash"
                color="primary"
                size="42px"
              />
              <div class="font-size-responsive-md text-light text-bold q-mt-md">
                NO USERS FOUND
              </div>
              <div class="text-caption text-dimmed q-mt-sm">
                Try adjusting your search or filters.
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </div>
</template>

<script>
import UserService from "src/services/UserService";
import Helper from "src/services/utils";
import OrderService from "src/services/OrderService";

export default {
  data() {
    return {
      users: [],
      editMode: null,
      loading: true,
      userLoading: false, // <- add this
      userOrders: [],

      userTypeOptions: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],

      selectedUser: null,

      search: "",
      selectedLoginStatus: "All",
      loginStatus: ["All", "Online", "Offline"],

      filteredList: [],
      combinedList: [],
      online: [],
      offline: [],
    };
  },

  computed: {
    glanceStats() {
      if (!this.selectedUser) return [];

      const userOrders = this.userOrders.filter(
        (o) => String(o.user) === String(this.selectedUser._id)
      );

      const paidStatuses = ["paid", "paid & picked up", "paid & delivered"];
      const paidOrders = userOrders.filter((o) =>
        paidStatuses.includes(o.status)
      );

      const lifetimeSpend = paidOrders.reduce(
        (sum, o) => sum + (o.totalAmount || 0),
        0
      );

      const returns = userOrders.filter(
        (o) => o.status === "refunded" || o.returns === "returned item(s)"
      ).length;

      return [
        {
          label: "LIFETIME SPEND",
          value: `R ${lifetimeSpend.toLocaleString("en-ZA")}`,
          highlight: true,
        },
        {
          label: "ORDERS PLACED",
          value: userOrders.length,
        },
        {
          label: "RETURNS",
          value: returns,
        },
        {
          label: "MEMBER SINCE",
          value: this.selectedUser.dateCreated
            ? new Date(this.selectedUser.dateCreated).toLocaleDateString(
                "en-GB",
                {
                  month: "short",
                  year: "numeric",
                }
              )
            : "—",
        },
      ];
    },

    recentUserOrders() {
      if (!this.selectedUser) return [];

      return this.userOrders
        .filter((o) => String(o.user) === String(this.selectedUser._id))
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 3);
    },

    profileRows() {
      return [
        {
          key: "username",
          label: "USERNAME",
          value: this.selectedUser.username,
          icon: "eva-person-outline",
        },
        {
          key: "firstName",
          label: "FIRST NAME",
          value: this.selectedUser.firstName,
          icon: "eva-edit-2-outline",
        },
        {
          key: "lastName",
          label: "LAST NAME",
          value: this.selectedUser.lastName,
          icon: "eva-edit-2-outline",
        },
        {
          key: "email",
          label: "EMAIL",
          value: this.selectedUser.email,
          icon: "eva-email-outline",
        },
        {
          key: "phone",
          label: "PHONE",
          value: this.selectedUser.phone,
          icon: "eva-phone-outline",
        },
        {
          key: "userType",
          label: "USER TYPE",
          value: this.selectedUser.userType,
          icon: "eva-shield-outline",
        },
      ];
    },
    activityRows() {
      return [
        {
          key: "userId",
          label: "USER ID",
          value: `#${this.selectedUser._id}`,
          icon: "eva-hash-outline",
        },
        {
          key: "lastLogin",
          label: "LAST LOGIN",
          value: this.formatDate(this.selectedUser.loginInfo?.lastLogin),
          icon: "eva-clock-outline",
        },
        {
          key: "loginCount",
          label: "LOGIN COUNT",
          value: this.selectedUser.loginInfo?.loginCount,
          icon: "eva-activity-outline",
        },
      ];
    },
  },

  created() {
    this.getAllUsers();
  },

  methods: {
    formatDate: Helper.formatDate,
    formatUserId: Helper.formatUserId,
    formatOrderId: Helper.formateOrderId,

    applyFilters() {
      let list = this.combinedList;

      if (this.selectedLoginStatus === "Online") {
        list = this.online;
      } else if (this.selectedLoginStatus === "Offline") {
        list = this.offline;
      }

      if (this.search.trim() !== "") {
        const term = this.search.toLowerCase();
        list = list.filter(
          (u) =>
            u.firstName?.toLowerCase().includes(term) ||
            u.lastName?.toLowerCase().includes(term) ||
            u.username?.toLowerCase().includes(term) ||
            u.email?.toLowerCase().includes(term) ||
            u._id?.toLowerCase().includes(term)
        );
      }

      this.filteredList = list;
    },

    async getAllUsers() {
      this.loading = true;
      try {
        const response = await UserService.findAllUsers();
        this.users = response || [];

        this.online = this.users.filter(
          (user) => user.loginInfo?.isLoggedIn === true
        );
        this.offline = this.users.filter(
          (user) => user.loginInfo?.isLoggedIn !== true
        );

        this.combinedList = [...this.online, ...this.offline];
        this.filteredList = this.combinedList;
      } catch (error) {
        console.error("Failed to fetch users:", error);
        this.users = [];
        this.filteredList = [];
        this.combinedList = [];
        this.online = [];
        this.offline = [];
      }
      this.loading = false;
    },

    async updateUserType(selectedUser) {
      const currentUser = await UserService.FindUserByToken();
      const userId = this.selectedUser._id;

      const updatedUser = {
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        email: this.selectedUser.email,
        phone: this.selectedUser.phone,
        username: this.selectedUser.username,
        password: this.selectedUser.password,
        userType: selectedUser.userType,
        location: this.selectedUser.location,
        loginInfo: this.selectedUser.loginInfo,
        order: this.selectedUser.order,
      };

      if (currentUser._id === userId) {
        this.$q.notify({
          type: "negative",
          message: "You cannot change your usertype!",
        });
        return;
      }

      this.$q
        .dialog({
          title: "Update user",
          message: `You are about to update ${updatedUser.username}, continue?`,
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          const response = await UserService.updateUserDetails(
            userId,
            updatedUser
          );
          if (response) {
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: "Update successful!",
            });
            this.editMode = null;
            this.selectedUser = null;
            this.getAllUsers();
          } else {
            this.$q.notify({
              type: "negative",
              message: "Update failed. Please try again.",
            });
          }
        })
        .onCancel(() => {
          this.editMode = null;
        });
    },

    cancelEdit() {
      this.editMode = null;
      this.getAllUsers();
    },

    async deleteUser(userId, username) {
      const currentUser = await UserService.FindUserByToken();

      if (currentUser._id === userId) {
        this.$q.notify({
          type: "negative",
          message: "You cannot delete yourself!",
        });
        return;
      }

      this.$q
        .dialog({
          title: "Delete user",
          message: `You are about to delete ${username}, continue?`,
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          const response = await UserService.deleteUser(userId);
          if (response) {
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: "Delete successful!",
            });
            this.selectedUser = null;
            this.getAllUsers();
          } else {
            this.$q.notify({
              type: "negative",
              message: "Delete failed. Please try again.",
            });
          }
        });
    },

    async openDetails(user) {
      this.selectedUser = user;
      this.editMode = null;
      this.userLoading = true;
      this.userOrders = [];

      try {
        const orders = await OrderService.findAllMyOrders(user._id);
        this.userOrders = orders || [];
      } catch (error) {
        console.error("Failed to fetch user orders:", error);
        this.userOrders = [];
      } finally {
        this.userLoading = false;
      }
    },

    closeDetails() {
      this.selectedUser = null;
      this.editMode = null;
    },
  },
};
</script>

<style lang="sass" scoped>
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

.user-detail-card
  overflow: hidden

.user-avatar-initials
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(249, 115, 22, 0.08))
  color: #f97316
  font-weight: 700
  font-size: 0.95rem
  display: flex
  align-items: center
  justify-content: center
  div
    transform: translateY(1px)


.user-detail-row
  border-bottom: 1px solid rgba(255, 255, 255, 0.08)

  &:last-child
    border-bottom: none

  &:hover
    background-color: rgba(255, 255, 255, 0.02)

.customer-search
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

.edit-user-type
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

.user-row
  transition: background-color 0.15s ease

  &:hover
    background-color: rgba(255, 255, 255, 0.03)

.user-badge
  font-family: 'Hind', sans-serif
  font-weight: 700
  letter-spacing: 0.03em
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

.status-dot--online
  background-color: #22c55e
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15)

.status-dot--offline
  background-color: #9b9b9b
  box-shadow: 0 0 0 3px rgba(155, 155, 155, 0.15)

.user-detail-left
  @media (min-width: 1024px)
    border-right: 1px solid rgba(255, 255, 255, 0.1)

.user-detail-right
  @media (max-width: 1023px)
    border-top: 1px solid rgba(255, 255, 255, 0.1)

// =================================================================================
// INVOICE-STYLE RECENT ORDERS BLOCK

.invoice-block
  background-color: #0d0d0d
  padding: 24px 20px
  border-radius: 6px

.invoice-header
  display: flex
  justify-content: space-between
  align-items: center
  padding-bottom: 12px
  margin-bottom: 16px
  border-bottom: 1px dashed rgba(255, 255, 255, 0.12)

.invoice-count
  font-family: 'Hind', sans-serif
  font-size: 0.75rem
  font-weight: 700
  color: #9b9b9b
  background-color: rgba(255, 255, 255, 0.05)
  padding: 2px 8px
  border-radius: 999px

.invoice-empty
  display: flex
  flex-direction: column
  align-items: center
  padding: 24px 0
  color: #6b6b6b

.invoice-lines
  display: flex
  flex-direction: column
  gap: 14px

.invoice-line
  display: flex
  align-items: baseline
  gap: 8px
  transition: opacity 0.15s ease

  &:hover
    opacity: 0.75

  &__label
    font-family: 'Hind', sans-serif
    font-weight: 700
    font-size: 0.8rem
    letter-spacing: 0.05em
    color: #c0c0c0
    white-space: nowrap

  &__dots
    flex: 1
    border-bottom: 1px dotted rgba(255, 255, 255, 0.15)
    transform: translateY(-3px)

  &__value
    font-family: 'Archivo Black', sans-serif
    font-size: 0.85rem
    letter-spacing: 0.02em
    color: #f97316
    white-space: nowrap
</style>
