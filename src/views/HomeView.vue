<template>
  <div class="p-4 min-h-full w-screen bg-background text-text">
    <main class="mt-2 gap-4 flex flex-col items-center justify-center">
      <textarea
        v-model="message"
        class="mb-4 p-2 w-3/4 h-20 bg-gray-800 placeholder-gray-400 text-white focus:ring-primary focus:border-primary focus:outline-primary"
        placeholder="Enter text here"
      ></textarea>
      <button class="p-2 bg-primary text-white rounded" @click="sendMessage">Encrypt</button>
      <button
        class="p-2 hover:bg-primary outline outline-2 outline-primary text-white rounded mt-4 transition-colors"
        @click="showAdvancedOptions = !showAdvancedOptions"
      >
        Advanced Options
      </button>
      <transition name="slide-fade">
        <div
          v-show="showAdvancedOptions"
          class="mt-4 rounded-lg bg-slate-800 border-2 border-slate-500 p-4"
        >
          <div class="grid grid-cols-2 gap-2">
            <label for="maxAttempts">Max Attempts</label>
            <input
              id="maxAttempts"
              type="number"
              class="bg-gray-800 placeholder-gray-400 text-white focus:ring-primary focus:border-primary focus:outline-primary"
              v-model="maxAttempts"
            />

            <label for="maxDecrypts">Max Decrypts</label>
            <input
              id="maxDecrypts"
              type="number"
              class="bg-gray-800 placeholder-gray-400 text-white focus:ring-primary focus:border-primary focus:outline-primary"
              v-model="maxDecrypts"
            />

            <label for="expirationDate">Expiration date</label>
            <input
              id="expirationDate"
              type="date"
              class="bg-gray-800 placeholder-gray-400 text-white focus:ring-primary focus:border-primary focus:outline-primary"
              v-model="expirationDate"
            />

            <label for="expirationTime">Expiration time</label>
            <input
              id="expirationTime"
              type="time"
              class="bg-gray-800 placeholder-gray-400 text-white focus:ring-primary focus:border-primary focus:outline-primary"
              v-model="expirationTime"
            />
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/MessageStore'
import { useToast } from 'vue-toast-notification'
import type { MessageOptions } from '@/models/MessageOptions'

let message = ref('')
let showAdvancedOptions = ref(false)
let maxAttempts = ref(0)
let maxDecrypts = ref(0)
// Now + 7 days
let expirationDate = ref('')
let expirationTime = ref('')

const store = useMessageStore()
const router = useRouter()

onMounted(() => {
  const now = new Date()

  // Set expiration to 7 days from now
  now.setDate(now.getDate() + 7)

  // Set to this whole hour
  now.setMilliseconds(0)
  now.setSeconds(0)
  now.setMinutes(0)

  expirationDate.value = now.toISOString().split('T')[0]
  expirationTime.value = now.toTimeString().split(' ')[0]
})

const sendMessage = async () => {
  if (message.value) {
    try {
      const expirationDateTime = new Date(
        `${expirationDate.value}T${expirationTime.value}`
      ).toISOString()

      const options: MessageOptions = {
        maxAttempts: maxAttempts.value,
        maxDecrypts: maxDecrypts.value,
        expiration: expirationDateTime
      }

      await store.createMessage(message.value, options)

      router.push('/created')
    } catch (error) {
      const toast = useToast()
      toast.error('There was an issue creating the message')
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
