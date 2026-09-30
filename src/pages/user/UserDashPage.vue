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

        <div class="row justify-start full-width">
          <!-- Sidebar -->
          <div
            class="bg-transparent col-12 col-md-3 border-right"
            :class="$q.screen.gt.sm ? 'q-pr-lg' : 'q-pr-none'"
          >
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
              <q-item-section class="text-subtitle1">
                Personal Details
              </q-item-section>
            </q-item>

            <q-item
              clickable
              class="menu-item"
              :class="{
                'menu-item--active': currentPageComponent === 'OrdersComponent',
              }"
              @click="changePage('OrdersComponent')"
            >
              <q-item-section avatar>
                <q-icon name="fa-solid fa-cube" size="18px" />
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
              @click="changePage('ReturnsComponent')"
            >
              <q-item-section avatar>
                <q-icon name="fa-solid fa-arrow-rotate-left" size="18px" />
              </q-item-section>
              <q-item-section class="text-subtitle1">Returns</q-item-section>
            </q-item>
          </div>

          <!-- Component panel -->
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
              // Clear the cart session too — same as MainLayout.handleLogout does
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
.menu-item
  // border-radius: 4px
  margin-bottom: 4px
  transition: background-color 0.2s ease

  &:hover
    background-color: rgba(255, 255, 255, 0.04)

.menu-item--active
  background-color: #1a1a1a
  border-left: 3px solid var(--q-primary)
  padding-left: calc(16px - 3px)
</style>
