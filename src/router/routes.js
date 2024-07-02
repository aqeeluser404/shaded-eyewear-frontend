const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // PUBLIC PAGES
      { path: "", component: () => import("pages/HomePage.vue") },
      {
        path: "/products",
        component: () => import("pages/ProductsPage.vue"),
      },
      {
        path: "/products/view/:id",
        component: () => import("pages/ProductDetailsPage.vue"),
      },
      // AUTHENTICATION PAGES
      {
        path: "/auth/login",
        component: () => import("pages/authentication/LoginPage.vue"),
      },
      {
        path: "/auth/register",
        component: () => import("pages/authentication/RegisterPage.vue"),
      },
      // USER PAGES
      {
        path: "/user/dashboard",
        component: () => import("pages/user/UserDashPage.vue"),
      },
      // ADMIN PAGES
      {
        path: "/admin/dashboard",
        component: () => import("pages/admin/AdminDashPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
