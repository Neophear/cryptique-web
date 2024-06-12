import { ref } from 'vue'
import { defineStore } from 'pinia'
import { addMessage, decryptMessage } from '@/services/ApiService'
import type { MessageOptions } from '@/models/MessageOptions'

export const useMessageStore = defineStore('messageStore', () => {
  const id = ref<string | null>(null)
  const key = ref<string | null>(null)
  const decryptedMessage = ref<string | null>(null)

  const createMessage = async (message: string, options: MessageOptions): Promise<void> => {
    const response = await addMessage(message, options)
    id.value = response.data.data.id
    key.value = response.data.data.key
  }

  /**
   * Get the key from the store and reset it to null
   * @returns {string | null} The key
   */
  const getKey = (): string | null => {
    const value = key.value;
    key.value = null;
    return value;
  }

  /**
   * Get the decrypted message from the store and reset it to null
   * @returns {string | null} The decrypted message
   */
  const getDecryptedMessage = (): string | null => {
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
  const decrypt = async (id: string, key: string): Promise<boolean> => {
    const response = await decryptMessage(id, key);
    
    if (response.status != 200) {
      return false;
    }
    
    // Try to Decode the message as base64 to binary and then to text. If it fails, just use the message as is
    // TODO - This should be handled with some type of type check
    try {
      const decoded = Buffer.from(response.data.data.message, 'base64').toString('utf-8');
      decryptedMessage.value = decoded;
    } catch (e) {
      decryptedMessage.value = response.data.data.message;
    }

    return true;
  }

  return { id, createMessage, getKey, decrypt, getDecryptedMessage }
})
