import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // =================================================================================
  // SERVER STARTUP STATE (Render cold-start handling)
  // Router's only job now: decide ONCE per session whether we need to detour
  // through /server-loading before letting the app through to real routes.

  let serverReady = false

  Router.beforeEach((to, from, next) => {
    // Let the loading page and 404 through unconditionally
    if (to.path === '/server-loading' || to.path === '/404') {
      return next()
    }

    // Once the loading page has confirmed the server is up, never check again
    if (!serverReady) {
      if (to.meta.skipServerCheck) {
        // opt out per-route if you ever need it (e.g. a static landing page)
        return next()
      }
      return next({
        path: '/server-loading',
        query: { redirect: to.fullPath }
      })
    }

    // =================================================================================
    // ROUTE PROTECTIONS

    if (to.path === '/verify-email') {
      return to.query.token ? next() : next({ path: '/404' })
    }

    if (to.path === '/resend-verification') {
      return from.path === '/verify-email' ? next() : next({ path: '/404' })
    }

    if (to.path === '/payment-success') {
      return to.query.orderId ? next() : next({ path: '/404' })
    }

    if (to.path === '/reset-password') {
      return to.query.token ? next() : next({ path: '/404' })
    }

    next()
  })

  // Exposed so the loading page can flip this once the health check passes
  Router.markServerReady = () => { serverReady = true }
  Router.isServerReady = () => serverReady

  return Router
})
