<template>
  <q-page>
    <section class="bg-dark q-px-md text-light q-md-px-0">
      <div class="section-spacer-sm"></div>
      <div class="constrain">
        <div class="overline text-dimmed text-caption">USER ACCOUNT</div>
        <div class="row justify-between items-center">
          <div
            class="font-size-responsive-giant archivo col-md-6 col-12"
            :class="$q.screen.gt.sm ? 'q-mb-none' : 'q-mb-md'"
          >
            YOUR SHADE.
          </div>
          <q-btn
            rounded
            no-caps
            outline
            label="Sign out of account"
            color="grey"
            text-color="grey"
            class="q-px-lg q-py-sm text-subtitle1 rounded-button text-bold"
            @click="logout"
          />
        </div>

        <div class="section-spacer-md large-screen-only"></div>
        <div class="section-spacer-sm small-screen-only"></div>

        <div class="row justify-start full-width dashboard-shell-row">
          <!-------------------------------------------------------- SIDEBAR / TABS -------------------------------------------------------->
          <div class="bg-transparent sidebar-collapsible col-12 col-md-3" :class="$q.screen.gt.sm ? 'q-pr-md' : 'q-pr-none'">
            <div class="sidebar-menu-list">
              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'ProfileComponent',
                }"
                @click="changePage('ProfileComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-user" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label">
                  Personal Details
                </q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'OrdersComponent',
                }"
                @click="changePage('OrdersComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-cube" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label">
                  Orders
                </q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'ReturnsComponent',
                }"
                @click="changePage('ReturnsComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-arrow-rotate-left" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label">
                  Returns
                </q-item-section>
              </q-item>
            </div>
          </div>

          <!-------------------------------------------------------- COMPONENT PANEL -------------------------------------------------------->
          <div class="col-12 col-md-9 dashboard-content-panel">
            <component :is="currentPageComponent"></component>
          </div>
        </div>
      </div>
      <div class="section-spacer-md"></div>
    </section>
  </q-page>
</template>

<script>
import ProfileComponent from "src/components/user/ProfileComponent.vue";
import OrdersComponent from "src/components/user/OrdersComponent.vue";
import ReturnsComponent from "src/components/user/ReturnsComponent.vue";
import Helper from "../../services/utils";
import UserService from "src/services/UserService";

export default {
  beforeRouteEnter: Helper.beforeRouteEnterUser,
  components: {
    ProfileComponent,
    OrdersComponent,
    ReturnsComponent,
  },
  data() {
    return {
      currentPageComponent: "ProfileComponent",
    };
  },
  methods: {
    changePage(componentName) {
      this.currentPageComponent = componentName;
    },
    async logout() {
      this.$q
        .dialog({
          title: "Logout",
          message: `You are about to logout, continue?`,
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            const user = await UserService.FindUserByToken();
            const response = await UserService.logout(user._id);

            if (response) {
              localStorage.removeItem("currentOrderId");

              this.$q.notify({
                type: "positive",
                color: "primary",
                message: "You have successfully logged out!",
              });

              this.$router.push("/");
              window.location.reload();
            } else {
              this.$q.notify({
                type: "negative",
                message: "Logout failed. Please try again.",
              });
            }
          } catch (error) {
            console.error("Logout failed:", error);
            this.$q.notify({
              type: "negative",
              message: "Logout failed. Please try again.",
            });
          }
        });
    },
  },
};
</script>

<style lang="sass" scoped>
// =================================================================================
// SHELL LAYOUT

.dashboard-shell-row
  flex-wrap: wrap

  @media (min-width: 1024px)
    flex-wrap: nowrap

.dashboard-content-panel
  flex: 1 1 auto
  min-width: 0


// =================================================================================
// SIDEBAR — mobile: icon tabs, desktop: vertical list

.sidebar-collapsible
  overflow: hidden
  white-space: nowrap
  flex-shrink: 0

  // ---------- MOBILE: horizontal icon tab bar ----------
  flex: 1 1 100%
  max-width: 100%
  border-right: none
  border-bottom: 1px solid rgba(255, 255, 255, 0.2)

  .menu-label
    display: none

  .sidebar-menu-list
    display: flex
    flex-direction: row
    justify-content: space-around
    border-bottom: none

  .menu-item
    flex: 1 1 auto
    min-width: 0
    margin-bottom: 0
    padding: 12px 0 !important
    justify-content: center
    align-items: center

    .q-item__section--avatar
      display: flex
      align-items: center
      justify-content: center
      min-width: 0
      padding: 0
      margin: 0

    // hide the whole label section on mobile
    .q-item__section:not(.q-item__section--avatar)
      display: none !important

  .menu-item--active
    background-color: rgba(255, 255, 255, 0.04)
    border-left: none
    border-bottom: 2px solid var(--q-primary)
    padding-left: 0 !important

  // ---------- DESKTOP: vertical list ----------
  @media (min-width: 1024px)
    flex: 0 0 auto
    max-width: 100%
    border-right: 1px solid rgba(255, 255, 255, 0.2)
    border-bottom: none

    .sidebar-menu-list
      display: block
      border-bottom: none

    // restore label section on desktop
    .menu-item .q-item__section:not(.q-item__section--avatar)
      display: block !important

    .menu-item
      flex: initial
      padding: 0 16px !important
      justify-content: flex-start
      align-items: center
      margin-bottom: 4px

      .q-item__section--avatar
        display: block
        align-items: initial
        justify-content: initial
        min-width: 32px
        padding: initial
        margin: initial

    .menu-label
      display: block
      opacity: 1
      width: auto
      overflow: visible

    .menu-item--active
      background-color: #1a1a1a
      border-left: 3px solid var(--q-primary)
      border-bottom: none
      padding-left: calc(16px - 3px) !important
</style>
