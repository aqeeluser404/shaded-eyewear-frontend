<template>
  <q-page>
    <q-img src="~src/assets/abstract5.jpg" class="column" alt="Hero Image" style="width: 100%; height: 150%;" >

      <div class="text-black" style="width: 100%; height: 100%;">
        <div style="height: 50px;"></div>
        <div class="row justify-center" >

          <!-- navigation -->
          <q-card class="q-pa-md col-12 col-md-3" >
            <q-item clickable @click="changePage('ProfileComponent')" >
              <q-item-section avatar><q-icon name="eva-person-outline" /></q-item-section>
              <q-item-section>Personal Details</q-item-section>
            </q-item>
            <q-item clickable @click="changePage('OrdersComponent')" >
              <q-item-section avatar><q-icon name="eva-clipboard-outline" /></q-item-section>
              <q-item-section>Orders</q-item-section>
            </q-item>
            <q-item clickable >
              <q-item-section avatar><q-icon name="eva-credit-card-outline" /></q-item-section>
              <q-item-section>Invoices</q-item-section>
            </q-item>
            <q-item clickable >
              <q-item-section avatar><q-icon name="eva-navigation-2-outline" /></q-item-section>
              <q-item-section>Address Book</q-item-section>
            </q-item>
          </q-card>

          <!-- personal details -->
          <div class="col-12 col-md-6 q-ml-md" style="height: 100%;">
            <component :is="currentPageComponent" class=""></component>
          </div>
        </div>
      </div>
    </q-img>


  </q-page>
</template>

<script>
import ProfileComponent from 'src/components/user/ProfileComponent.vue'
import OrdersComponent from 'src/components/user/OrdersComponent.vue'
import Helper from '../../services/utils'

export default {

  beforeRouteEnter: Helper.beforeRouteEnterUser,

  components: {
    ProfileComponent,
    OrdersComponent,
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
