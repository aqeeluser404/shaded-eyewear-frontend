<!-- PaymentSuccess.vue -->
<template>
  <q-page>
    <div class="constrain window-height">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
    </div>
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

