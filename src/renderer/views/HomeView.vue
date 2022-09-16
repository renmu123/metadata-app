<template>
  <div class="home">
    <MainHeader></MainHeader>
    <el-button type="primary" @click="selectFolder">选择文件夹</el-button>
    <MainContent :data="currentItems"></MainContent>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MainContent from "@/components/content.vue";
import MainHeader from "@/components/mainHeader.vue";
import { storeToRefs } from "pinia";

import { useLibraryStore } from "../store";
import { item } from "../db";

const store = useLibraryStore();
const { currentLibraryId, currentItems } = storeToRefs(store);

const selectFolder = async () => {
  const filePaths = await window.electronAPI.openFolder();
  if (filePaths) {
    store.addItems(currentLibraryId.value, filePaths);
  }
};
</script>
