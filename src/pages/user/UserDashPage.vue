<template>
  <!-- constrains -->
  <q-page>
    <div class="constrain window-height">

      <!-- =================================== USER HEADER -->
      <q-card bordered flat class="column flex-center q-mb-md">
        <h4>My Account</h4>
      </q-card>

      <!-- =================================== USER CONTROLS -->
      <div class="row q-pa-md q-gutter-lg justify-center">

        <!-- navigation -->
        <q-card class="q-pa-md" >
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
        <div class="col-12 col-md-6">
          <component :is="currentPageComponent"></component>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ProfileComponent from 'src/components/user/ProfileComponent.vue';
import OrdersComponent from 'src/components/user/OrdersComponent.vue';


export default {
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
