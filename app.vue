<template>
  <div>
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script setup lang="ts">
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './app.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
</script>
