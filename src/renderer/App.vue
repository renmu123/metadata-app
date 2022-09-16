<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script setup lang="ts">
import HomeView from "./views/HomeView.vue";

window.electronAPI.ipcRenderer.send("message", "Hello from App.vue!");
</script>
