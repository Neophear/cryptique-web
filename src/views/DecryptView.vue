<template>
  <div class="p-4 min-h-full w-screen bg-background text-text">
    <main class="mt-2 gap-4 flex flex-col items-center justify-center">
      <input
        type="text"
        v-model="messageId"
        class="mb-4 p-2 w-1/3 bg-gray-800 placeholder-gray-400 text-white focus:ring-primary focus:border-primary focus:outline-primary"
        placeholder="Enter Id here"
      />
      <input
        type="text"
        v-model="key"
        class="mb-4 p-2 w-1/3 bg-gray-800 placeholder-gray-400 text-white focus:ring-primary focus:border-primary focus:outline-primary"
        placeholder="Enter key here"
      />
      <button class="p-2 bg-primary text-white rounded" @click="decryptMessage">Decrypt</button>

      <textarea
        v-if="decryptedMessage"
        v-model="decryptedMessage"
        class="mb-4 p-2 w-3/4 h-20 bg-gray-800 placeholder-gray-400 text-white focus:ring-primary focus:border-primary focus:outline-primary"
        readonly
      ></textarea>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMessageStore } from '@/stores/MessageStore'
import { useToast } from 'vue-toast-notification'

let messageId = ref('')
let key = ref('')

let decryptedMessage = ref('')

const store = useMessageStore()
const route = useRoute()
const toast = useToast()

onMounted(() => {
  if (route.params.id) {
    messageId.value = route.params.id as string
  }
})

const decryptMessage = async () => {
  if (!messageId.value || !key.value) {
    return
  }

  try {
    const success = await store.decrypt(messageId.value, key.value)

    if (success) {
      decryptedMessage.value = store.getDecryptedMessage() ?? 'NO MESSAGE FOUND'
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      toast.error('Could not decrypt message or message does not exist')
    } else {
      toast.error('Server error')
    }
  }
}
</script>
