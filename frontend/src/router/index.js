import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import CreateRegister from '../views/CreateRegister.vue'

const routes = [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requireAuth: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateRegister,
      meta: { requireAuth: true }
    }  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes 
})

router.beforeEach((to, from,next)=>{
  const protectedRoute = to.matched.some(record => record.meta.requireAuth);
  if(protectedRoute && localStorage.getItem('dataUser') === null){
    next({name: 'login'})
  }else next()
})

export default router
