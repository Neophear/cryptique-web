import { ref } from 'vue'
import { defineStore } from 'pinia'
import { addMessage, decryptMessage } from '@/services/ApiService'

export const useMessageStore = defineStore('messageStore', () => {
  const id = ref<string | null>(null)
  const key = ref<string | null>(null)

  const createMessage = async (message: string, maxAttempts: number, maxDecrypts: number) => {
    const response = await addMessage(message, maxAttempts, maxDecrypts)
    id.value = response.data.data.id
    key.value = response.data.data.key
  }

  /**
   * Get the key from the store and reset it to null
   * @returns {string | null} The key
   */
  const getKey = () => {
    const value = key.value;
    key.value = null;
    return value;
  }

  const decrypt = async (id: string, key: string) => {
    const response = await decryptMessage(id, key);
    
    return response.data.data.message;
  }



  return { id, createMessage, getKey, decrypt }
})
