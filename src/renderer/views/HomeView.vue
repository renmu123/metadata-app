<template>
  <div class="home">
    <MainHeader></MainHeader>
    <el-button type="primary" @click="selectFolder">选择文件夹</el-button>
    <MainContent :data="filePath"></MainContent>
  </div>
</template>

<script>
import MainContent from "@/components/content.vue";
import MainHeader from "@/components/header.vue";

import { db, item } from "../db";

export default {
  name: "HomeView",
  components: {
    MainContent,
    MainHeader,
  },
  data() {
    return {
      filePath: [],
      library: [],
    };
  },
  async mounted() {
    this.filePath = await item.get(2);
  },
  methods: {
    async selectFile() {
      const filePath = await window.electronAPI.openFile();
      if (filePath) {
        alert(filePath);
      }
    },
    async selectFolder() {
      const filePath = await window.electronAPI.openFolder();
      if (filePath) {
        console.log(filePath);
        const libraryId = 2;
        await item.add(
          filePath.map((item) => {
            item.libraryId = libraryId;
            return item;
          })
        );
        this.filePath = await item.get(libraryId);
      }
    },
  },
};
</script>
