
const routes = [
  {
    path: '/',
    component: () => import('pages/index.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/hua',
    component: () => import('components/UpLoadPic.vue')
  }
]

export default routes
