const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [

      // PUBLIC PAGES
      { path: "", component: () => import("pages/HomePage.vue") },
      { path: "/sunglasses", component: () => import("src/pages/sunglasses/SunglassesPage.vue"), },
      { path: "/sunglasses/view/:id", component: () => import("src/pages/sunglasses/SunglassesDetailsPage.vue"), },

      // AUTHENTICATION PAGES
      { path: "/auth/login", component: () => import("pages/auth/LoginPage.vue"), },
      { path: "/auth/register", component: () => import("pages/auth/RegisterPage.vue"), },

      // USER PAGES
      { path: "/user/dashboard", component: () => import("pages/user/UserDashPage.vue"), },

      // ADMIN PAGES
      { path: "/admin/dashboard", component: () => import("pages/admin/AdminDashPage.vue"), },

      // CART & ORDER
      { path: "/cart", component: () => import("pages/CartPage.vue"), },
      { path: "/buy/review", component: () => import("pages/CheckoutPage.vue"), },

      // PAYMENT STATUSES
      { path: '/payment-success', component: () => import('pages/payment/PaymentSuccess.vue') },
      { path: '/payment-cancel', component: () => import('pages/payment/PaymentCancel.vue') },
      { path: '/payment-failure', component: () => import('pages/payment/PaymentFailure.vue') },

      // EMAILS
      { path: '/verify-email', component: () => import('src/pages/email/VerifyEmail.vue')},
      { path: '/resend-verification', component: () => import('src/pages/email/ResendVerificationEmail.vue') },
      { path: '/forgot-password', component: () => import('src/pages/email/ForgotPasswordPage.vue') },
      { path: '/reset-password', component: () => import('src/pages/email/ResetPasswordPage.vue')}
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
