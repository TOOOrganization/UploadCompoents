
const routes = [
  {
    path: '/',
    component: () => import('pages/index.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/index.vue')
  }
]

export default routes
