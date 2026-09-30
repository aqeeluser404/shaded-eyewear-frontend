<template>
  <q-page>
    <section class="bg-dark q-px-md text-light q-md-px-0">
      <div class="section-spacer-sm"></div>
      <div class="constrain">
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)">
          <div class="overline-tight text-dimmed text-caption">
            SHADED OPERATIONS
          </div>
          <div class="row justify-between items-center">
            <div
              class="font-size-responsive-giant archivo col-md-8 col-12"
              :class="$q.screen.gt.sm ? 'q-mb-none' : 'q-mb-md'"
            >
              CONTROL ROOM.
            </div>
            <q-btn
              rounded
              no-caps
              outline
              label="Back to site"
              color="grey"
              text-color="grey"
              to="/"
              class="q-px-lg q-py-sm text-subtitle1 rounded-button text-bold"
            />
          </div>
          <div class="section-spacer-xs"></div>
        </div>

        <div class="section-spacer-xs"></div>

        <div class="row justify-start full-width">
          <!-------------------------------------------------------- SIDEBAR -------------------------------------------------------->
          <div
            class="bg-transparent col-12 col-md-3 border-right"
            :class="$q.screen.gt.sm ? 'q-pr-lg' : 'q-pr-none'"
          >
            <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)">
              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active': currentPageComponent === 'UserComponent',
                }"
                @click="changePage('User Panel', 'UserComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-people-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1">Users</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'SunglassesComponent',
                }"
                @click="changePage('Sunglasses Panel', 'SunglassesComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-eye-off-2-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1"
                  >Sunglasses</q-item-section
                >
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'OrdersComponent',
                }"
                @click="changePage('Order Panel', 'OrdersComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-clipboard-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1">Orders</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'ReturnsComponent',
                }"
                @click="changePage('Return Panel', 'ReturnsComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-calendar-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1">Returns</q-item-section>
              </q-item>
              <div class="section-spacer-sm"></div>
            </div>

            <div class="section-spacer-xs"></div>
            <div>
              <div class="overline-tight text-dimmed text-caption q-mb-sm">
                SIGNED IN AS
              </div>

              <div class="text-subtitle1 text-light text-bold">
                {{ userDetails.firstName }} {{ userDetails.lastName }}
              </div>

              <div class="text-caption text-light text-dimmed">
                {{ capitalizeFirstLetter(userDetails.userType) }} Account Type
              </div>
            </div>

            <!-- admin profile -->

          </div>

          <!-------------------------------------------------------- COMPONENT PANEL -------------------------------------------------------->
          <div class="col-12 col-md-9">
            <component :is="currentPageComponent"></component>
          </div>
        </div>
      </div>
      <div class="section-spacer-md"></div>
    </section>
  </q-page>
</template>

<script>
import UserService from "src/services/UserService";
import UserComponent from "../../components/admin/UserComponent.vue";
import SunglassesComponent from "../../components/admin/SunglassesComponent.vue";
import OrdersComponent from "../../components/admin/OrdersComponent.vue";
import ReturnsComponent from "../../components/admin/ReturnsComponent.vue";
import Helper from "../../services/utils.js";

export default {
  name: "AdminDashPage",

  components: {
    UserComponent,
    SunglassesComponent,
    OrdersComponent,
    ReturnsComponent,
  },

  data() {
    return {
      currentUser: { _id: "" },
      userDetails: {},
      currentPageTitle: "User Panel",
      currentPageComponent: "UserComponent",
    };
  },

  methods: {
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    changePage(title, component) {
      this.currentPageTitle = title;
      this.currentPageComponent = component;
    },

    async fetchUserDetails() {
      const userId = await UserService.FindUserByToken();
      this.currentUser = userId;

      const user = await UserService.findUserById(this.currentUser._id);
      this.userDetails = user;
    },
  },

  created() {
    this.fetchUserDetails();
  },

  beforeRouteEnter: Helper.beforeRouteEnter,
};
</script>

<style lang="sass" scoped>
.menu-item
  margin-bottom: 4px
  transition: background-color 0.2s ease

  &:hover
    background-color: rgba(255, 255, 255, 0.04)

.menu-item--active
  background-color: #1a1a1a
  border-left: 3px solid var(--q-primary)
  padding-left: calc(16px - 3px)
</style>
