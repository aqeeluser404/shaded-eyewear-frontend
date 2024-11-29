import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // better way of handling authentication and server status check
  Router.beforeEach(async (to, from, next) => {
    try {
      // Send a health check request to the server
      const response = await axios.get(`${API_BASE_URL}/health`);

      // If the server is healthy
      if (response.status === 200) {
        // Redirect to the home page only if navigating to /server-offline
        if (to.path === '/404') {
          next('/');
        } else {
          next();
        }
      }
    } catch (error) {
      // If the server is offline or an error occurs
      if (to.path !== '/404') {
        next('/404'); // Redirect to /server-offline
      } else {
        next(); // Allow navigation to /server-offline
      }
    }
  });


  return Router
})
