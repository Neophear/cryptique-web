<template>
    <div>
      <button @click="checkHealth">Check Health</button>
      <button @click="sendMessage">Send Message</button>
      <button @click="uploadFile">Upload File</button>
      <button @click="decryptMsg">Decrypt Message</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { healthCheck, addMessage, addMessageFile, decryptMessage } from "@/services/ApiService";
  
  export default defineComponent({
    name: "ExampleComponent",
    methods: {
      async checkHealth() {
        const response = await healthCheck();
        console.log(response);
      },
      async sendMessage() {
        const response = await addMessage("Hello World");
        console.log(response);
      },
      async uploadFile(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const response = await addMessageFile(file);
          console.log(response);
        }
      },
      async decryptMsg() {
        const response = await decryptMessage("message-id", "your-key");
        console.log(response);
      }
    }
  });
  </script>
  