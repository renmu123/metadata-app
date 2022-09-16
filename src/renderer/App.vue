<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script setup lang="ts">
import HomeView from "./views/HomeView.vue";
import { useLibraryStore } from "./store";

const store = useLibraryStore();
store.getCurrentLibrary();
</script>
