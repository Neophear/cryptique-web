<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterNav from './components/FooterNav.vue';
</script>

<template>
  <div class="min-h-screen w-screen overflow-x-hidden bg-background text-text font-inter flex flex-col justify-center items-center">
    <h1 class="text-3xl text-green-600">Cryptique</h1>
    <RouterView v-slot="{ Component }">
      <Transition name="slide" class="p-8">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <FooterNav class="footer-nav" />
  </div>
</template>

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
