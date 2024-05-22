import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatedView from '@/views/CreatedView.vue';
import DecryptView from '@/views/DecryptView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Home",
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
      path: '/decrypt/:id',
      name: 'decrypt',
      component: DecryptView,
      meta: {
        title: "Decrypt",
      },
    }
  ]
})

const DEFAULT_TITLE = 'DEFAULT TITLE';
router.afterEach((to, from) => {
  let title = DEFAULT_TITLE;

  if (to.meta.title != undefined) {
    title = "PAGE | " + to.meta.title;
  }
  document.title = title;
});

export default router
