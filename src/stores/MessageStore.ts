import { ref } from 'vue'
import { defineStore } from 'pinia'
import { addMessage, decryptMessage } from '@/services/ApiService'
import type { MessageOptions } from '@/models/MessageOptions'

export const useMessageStore = defineStore('messageStore', () => {
  const id = ref<string | null>(null)
  const key = ref<string | null>(null)
  const decryptedMessage = ref<string | null>(null)

  const createMessage = async (message: string, options: MessageOptions) => {
    const response = await addMessage(message, options)
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

  /**
   * Get the decrypted message from the store and reset it to null
   * @returns {string | null} The decrypted message
   */
  const getDecryptedMessage = () => {
    const value = decryptedMessage.value;
    decryptedMessage.value = null;
    return value;
  }

  /**
   * Decrypt a message
   * @param {string} id The message id
   * @param {string} key The key
   * @returns {boolean} True if the decryption was successful
   */
  const decrypt = async (id: string, key: string) => {
    const response = await decryptMessage(id, key);
    
    if (response.status != 200) {
      return false;
    }
    
    decryptedMessage.value = response.data.data.message;
    return true;
  }

  return { id, createMessage, getKey, decrypt, getDecryptedMessage }
})
