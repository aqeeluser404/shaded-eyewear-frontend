<template>
  <q-page>
    <!-- constraints -->
    <div class="text-black q-pa-md" style="width: 100%; height: 100%; background-color: #f0f0f0;">
      <div style="height: 50px;"></div>

      <!------------------------------------------------------------ NAVIGATION PANEL --------------------------------------------->
      <div class="row justify-center q-gutter-md">
        <q-card class="col-12 col-md-3 q-pa-md" >
          <q-item clickable @click="changePage('ProfileComponent')" >
            <q-item-section avatar><q-icon name="eva-person-outline" /></q-item-section>
            <q-item-section class="text-subtitle1">Personal Details</q-item-section>
          </q-item>
          <q-item clickable @click="changePage('OrdersComponent')" >
            <q-item-section avatar><q-icon name="eva-clipboard-outline" /></q-item-section>
            <q-item-section class="text-subtitle1">Orders</q-item-section>
          </q-item>
          <q-item clickable @click="changePage('ReturnsComponent')" >
            <q-item-section avatar><q-icon name="eva-credit-card-outline" /></q-item-section>
            <q-item-section class="text-subtitle1">Returns</q-item-section>
          </q-item>
        </q-card>

        <!---------------------------------------------------------- COMPONENTS PANEL --------------------------------------------->
        <div class="col-12 col-md-6" style="height: 100%;">
          <component :is="currentPageComponent"></component>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ProfileComponent from 'src/components/user/ProfileComponent.vue'
import OrdersComponent from 'src/components/user/OrdersComponent.vue'
import ReturnsComponent from 'src/components/user/ReturnsComponent.vue'
import Helper from '../../services/utils'

export default {
  beforeRouteEnter: Helper.beforeRouteEnterUser,
  components: {
    ProfileComponent,
    OrdersComponent,
    ReturnsComponent
  },
  data() {
    return {
      currentPageComponent: 'ProfileComponent'
    }
  },
  methods: {
    changePage(componentName) {
      this.currentPageComponent = componentName;
    }
  }
}
</script>
