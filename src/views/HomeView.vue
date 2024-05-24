<template>
  <div class="p-4 min-h-full w-screen bg-background text-text">
    <main class="mt-2 gap-4 flex flex-col items-center justify-center">
      <textarea v-model="message" class="mb-4 p-2 border-2 border-gray-300 rounded text-slate-700 w-3/4 h-20" placeholder="Enter text here"></textarea>
      <button class="p-2 bg-blue-500 text-white rounded" @click="sendMessage">Click me</button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/MessageStore';

let message = ref('');
const maxAttempts = 3; // replace with your value
const maxDecrypts = 3; // replace with your value

const store = useMessageStore();
const router = useRouter();

const sendMessage = async () => {
  if (message.value) {
    await store.createMessage(message.value, maxAttempts, maxDecrypts);
    
    router.push('/created');
  }
};
</script>
