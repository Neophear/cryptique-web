import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatedView from '@/views/CreatedView.vue';
import DecryptView from '@/views/DecryptView.vue';
import AboutView from '@/views/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: "What is this?",
      },
    },
    {
      path: '/created',
      name: 'created',
      component: CreatedView,
      meta: {
        title: "Created",
      },
    },
    {
      path: '/decrypt/:id?',
      name: 'decrypt',
      component: DecryptView,
      meta: {
        title: "Decrypt",
      },
    }
  ]
})

const DEFAULT_TITLE = 'Cryptique | Securely share secrets';
router.afterEach((to, from) => {
  let title = DEFAULT_TITLE;

  if (to.meta.title != undefined) {
    title = "Cryptique | " + to.meta.title;
  }
  document.title = title;
});

export default router
