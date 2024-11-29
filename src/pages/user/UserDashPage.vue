<template>
  <q-page>
    <!-- <q-img src="~src/assets/abstract5.jpg" class="column" alt="Hero Image" style="width: 100%; height: 150%;" > -->

      <div class="text-black q-pa-md" style="width: 100%; height: 100%; background-color: #f0f0f0;">
        <div style="height: 50px;"></div>
        <div class="row justify-center q-gutter-md" >

          <!-- navigation -->
          <q-card class="col-12 col-md-3 q-pa-md" >
            <q-item clickable @click="changePage('ProfileComponent')" >
              <q-item-section avatar><q-icon name="eva-person-outline" /></q-item-section>
              <q-item-section>Personal Details</q-item-section>
            </q-item>
            <q-item clickable @click="changePage('OrdersComponent')" >
              <q-item-section avatar><q-icon name="eva-clipboard-outline" /></q-item-section>
              <q-item-section>Orders</q-item-section>
            </q-item>
            <q-item clickable @click="changePage('ReturnsComponent')" >
              <q-item-section avatar><q-icon name="eva-credit-card-outline" /></q-item-section>
              <q-item-section>Returns</q-item-section>
            </q-item>
            <!-- <q-item clickable @click="changePage('AddressComponent')" >
              <q-item-section avatar><q-icon name="eva-navigation-2-outline" /></q-item-section>
              <q-item-section>Address Book</q-item-section>
            </q-item> -->
          </q-card>

          <!-- personal details -->
          <div class="col-12 col-md-6" style="height: 100%;">
            <component :is="currentPageComponent" class=""></component>
          </div>
        </div>
      </div>
    <!-- </q-img> -->


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

      // if (componentName === 'InvoiceComponent') {
      //   this.$q.notify({ type: 'negative', color: 'red', message: 'Currently under development! We apologize for any inconvenience.' })
      //   return
      // }
      // if (componentName === 'AddressComponent') {
      //   this.$q.notify({ type: 'negative', color: 'red', message: 'Currently under development! We apologize for any inconvenience.' })
      //   return
      // }
      this.currentPageComponent = componentName;
    }
  }
}
</script>
