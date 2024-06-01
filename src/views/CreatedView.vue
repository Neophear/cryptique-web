<template>
  <div class="p-4 min-h-full w-screen bg-background text-text">
    <main class="mt-2 gap-4 flex flex-col items-center justify-center">
      <p class="cursor-pointer" @click="copyText(key, 'Key copied', false)">Key: {{ key }}</p>
      <div class="border p-2 min-w-[200px] rounded">
        <div
          @click="copyText(id, 'URL copied', true)"
          class="flex items-center justify-between p-1 font-mono text-xl tracking-wider cursor-pointer"
        >
          <p>{{ id }}</p>
          <button class="relative w-6 h-6 ml-1 flex items-center justify-center">
            <transition name="fade">
              <component :is="iconComponent" class="h-6 w-6 absolute" />
            </transition>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useMessageStore } from '@/stores/MessageStore'
import { ClipboardIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { useToast } from 'vue-toast-notification'

let id = ref('')
let key = ref('')
let copied = ref(false)

const store = useMessageStore()

onMounted(() => {
  key.value = store.getKey() ?? 'NO KEY FOUND'

  id.value = store.id != null ? `${window.location.host}/decrypt/${store.id}` : 'NO ID FOUND'
})

const copyText = (text: string, copiedText: string, setCopiedIcon: boolean) => {
  navigator.clipboard.writeText(text)

  if (setCopiedIcon) {
    copied.value = true
  }

  const toast = useToast()
  toast.info(copiedText)
}

// ---------------- Button fade logic
watchEffect(() => {
  if (copied.value) {
    setTimeout(() => {
      copied.value = false
    }, 1000)
  }
})

let iconComponent = ref(ClipboardIcon)
watchEffect(() => {
  iconComponent.value = copied.value ? CheckIcon : ClipboardIcon
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
