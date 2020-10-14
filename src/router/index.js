import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile.vue'
import UserProfile from '../views/Admin.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/profile/:userId',
  name: 'UserProfile',
  component: UserProfile
}, {
  path: '/admin',
  name: 'Admin',
  component: Admin

}]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  const isAdmin = true;
  const requiredAdmin = to.matched.some(record => record.meta.requiredAdmin)
})

export default router