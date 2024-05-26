<template>
  <div class="min-h-screen w-screen overflow-x-hidden bg-background text-text font-inter flex flex-col pt-5 items-center">
    <nav class="mb-4">
      <router-link to="/" class="m-2">Home</router-link>
      <router-link to="/about" class="m-2">About</router-link>
      <router-link to="/decrypt" class="m-2">Decrypt</router-link>
    </nav>
    <h1 class="text-3xl text-green-600">Cryptique</h1>
    <RouterView v-slot="{ Component }">
      <Transition name="slide" mode="out-in" class="p-8">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <FooterNav class="footer-nav" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import FooterNav from './components/FooterNav.vue';
import { healthCheck } from './services/ApiService';
import { useToast } from 'vue-toast-notification'

onMounted(async () => {
  // Call the healthCheck function
  let success = false;
  try {
    const response = await healthCheck();
    success = response.data.ok;
  } catch (error) {
    console.error(error);
  }
  if (!success) {
    // If there are issues, display a toast
    const toast = useToast();
    toast.error('There was an issue connecting to the server');
  }
});

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: 600ms ease all;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: 400ms ease all;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(60px);
}

.footer-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
