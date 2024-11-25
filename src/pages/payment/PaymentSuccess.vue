<!-- PaymentSuccess.vue -->
<template>
  <q-page>
    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-center text-black">
        <q-card bordered flat class="q-pa-lg">
          <div class="column items-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">Payment Successful!</p>
            <p>Thank you for your purchase.</p>
            <q-btn rounded dense to="/user/dashboard" icon="eva-shopping-bag-outline " label="Track your order" size="12px" class="q-py-sm q-px-lg" />
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
      console.log('Payment success handled successfully');

      // Navigate to home after 5 seconds
      setTimeout(() => {
        this.$router.push('/');
      }, 5000);
    } catch (error) {
      console.error('Error handling payment success:', error);
    }
  }
}
</script>

