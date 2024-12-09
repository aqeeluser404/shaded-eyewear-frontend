<!-- PaymentSuccess.vue -->
<template>
  <q-page>
    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-center text-black">
        <q-card bordered flat class="q-pa-lg">
          <div class="column text-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">Payment Successful!</p>
            <br>
            <p class="text-subtitle1 ">
              <q-icon size="50px" name="eva-gift" /><br>
              <b>Thank you for your purchase.</b>
              <br> <span class="text-subtitle1">You will be redirected to the homepage shortly.</span>

              <br> <span class="text-subtitle1">Please wait...</span>

            </p>
            <!-- <q-btn rounded dense to="/user/dashboard" color="black" text-color="white" icon="eva-shopping-bag-outline " label="Track your order" class="q-py-sm q-px-lg custom-button font-size-responsive-md" /> -->
          </div>
        </q-card>
      </div>
    </q-img>
  </q-page>
</template>

<script>
import PaymentService from '../../services/PayService'

export default {
  async created() {
    try {
      const orderId = this.$route.query.orderId; // Get orderId from query parameters
      await PaymentService.paymentSuccess(orderId); // Call the paymentSuccess method

      // Navigate to home after 5 seconds
      setTimeout(() => {
        this.$router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Error handling payment success:', error);
    }
  }
}
</script>

