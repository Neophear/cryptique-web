<template>
  <div class="p-4 min-h-full w-screen bg-background text-text">
    <main class="mt-2 gap-4 flex flex-col items-center justify-center">
      <p>Id: {{ id }}</p>
      <div class="border p-2 min-w-[200px] rounded">
        <div class="flex items-center justify-between">
          <p>Key: {{ key }}</p>
          <button @click="copyKey" class="relative w-6 h-6 flex items-center justify-center">
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
import { ClipboardIcon, CheckIcon } from '@heroicons/vue/24/solid'

let id = ref('')
let key = ref('')
let copied = ref(false)

const store = useMessageStore()

onMounted(() => {
  id.value = store.id ?? ''
  key.value = store.getKey() ?? ''
});

const copyKey = () => {
  navigator.clipboard.writeText(key.value)
  copied.value = true
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>