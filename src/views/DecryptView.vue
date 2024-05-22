<template>
    <div class="p-4 min-h-full w-screen bg-background text-text">
      <main class="mt-2 gap-4 flex flex-col items-center justify-center">
        <p>Decrypt Message with id {{ messageId }}</p>
        <input type="text" v-model="key" class="mb-4 p-2 border-2 border-gray-300 rounded" placeholder="Enter key here">
        <button class="p-2 bg-blue-500 text-white rounded" @click="decryptMessage">Decrypt</button>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMessageStore } from '@/stores/MessageStore';
  
  let messageId = ref('');
  let key = ref('');
  const maxAttempts = 3; // replace with your value
  const maxDecrypts = 3; // replace with your value
  
  const store = useMessageStore();
  const route = useRoute();

  onMounted(() => {
    messageId.value = route.query.id as string;
  });
  
  const decryptMessage = async () => {
    if (messageId.value && key.value) {
      await store.decrypt(messageId.value, key.value);
      
    }
  };
  </script>
  