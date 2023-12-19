import userService from 'src/services/user.service'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'ProductPage', component: () => import('pages/ProductPage.vue') },
      { path: 'login', name: 'LoginPage', component: () => import('pages/LoginPage.vue') },
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        console.log('check token for' + ' ' + to.path)
        let response = await userService.verifyToken()
      if(response.status === 200) {
        next();
      } else {
        next('/login')
      }
      } catch (error) {
        // console.error(error);
        // Handle other errors if needed
        next('/login');
      }
      
    },
    children: [
      { path: '', name:'DashboardPage', component: () => import('pages/DashboardPage.vue') },
      { path: 'products', name:'AdminProductPage', component: () => import('pages/ProductPage.vue'),  props: { admin: true } },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
