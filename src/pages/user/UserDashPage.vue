<template>
  <q-page>
    <section class="bg-dark q-px-md text-light q-md-px-0">
      <div class="section-spacer-sm"></div>
      <div class="constrain">

        <div class="overline text-dimmed text-caption">USER ACCOUNT</div>
        <div class="row justify-between items-center">
          <div class="font-size-responsive-giant archivo">YOUR SHADE.</div>
          <q-btn
            rounded
            no-caps
            outline
            label="Sign out of account"
            color="grey"
            text-color="grey"
            class="q-px-xl q-py-md text-subtitle1 rounded-button text-bold"
            @click="logout"
          />

                  <!-- <q-btn
                    @click="navigateToCart"
                    label="View cart"
                    rounded
                    dense
                    no-caps
                    outline
                    color="grey"
                    text-color="grey"
                    class="q-px-xl q-py-md q-mr-md text-subtitle1 rounded-button text-bold"
                  /> -->
        </div>

        <div class="section-spacer-md"></div>

        <div class="row justify-start full-width">

          <!-- Sidebar -->
          <div class="bg-transparent col-12 col-md-3 q-pr-lg" style="border-right: 1px solid rgba(255, 255, 255, 0.2)">
            <q-item
              clickable
              class="menu-item"
              :class="{ 'menu-item--active': currentPageComponent === 'ProfileComponent' }"
              @click="changePage('ProfileComponent')"
            >
              <q-item-section avatar>
                <q-icon name="eva-person-outline" />
              </q-item-section>
              <q-item-section class="text-subtitle1">
                Personal Details
              </q-item-section>
            </q-item>

            <q-item
              clickable
              class="menu-item"
              :class="{ 'menu-item--active': currentPageComponent === 'OrdersComponent' }"
              @click="changePage('OrdersComponent')"
            >
              <q-item-section avatar>
                <q-icon name="eva-clipboard-outline" />
              </q-item-section>
              <q-item-section class="text-subtitle1">Orders</q-item-section>
            </q-item>

            <q-item
              clickable
              class="menu-item"
              :class="{ 'menu-item--active': currentPageComponent === 'ReturnsComponent' }"
              @click="changePage('ReturnsComponent')"
            >
              <q-item-section avatar>
                <q-icon name="eva-credit-card-outline" />
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
