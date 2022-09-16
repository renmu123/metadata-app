<!--  -->
<template>
  <header>
    <el-button
      type="primary"
      size="default"
      @click="handleLibraryDialogVisible = true"
      >创建库</el-button
    >
    <el-select
      v-model="setting.currentLibrary"
      placeholder="请选择"
      @change="handleCurrentLibraryChange"
    >
      <el-option
        v-for="item in librarys"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <handleLibraryDialog
      v-model="handleLibraryDialogVisible"
      @confirm="handleLibrary"
    ></handleLibraryDialog>
  </header>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { library, setting as settingDB } from "../db";
import handleLibraryDialog from "./compoents/handleLibraryDialog.vue";
import { useLibraryStore } from "../store";

const store = useLibraryStore();
const handleLibraryDialogVisible = ref(false);
const librarys = ref([]);
const setting = reactive({
  currentLibrary: "",
});

onMounted(async () => {
  librarys.value = await library.get();
  const currentLibrary = await settingDB.get("currentLibrary");
  setting.currentLibrary = currentLibrary;
});

const handleCurrentLibraryChange = (value) => {
  store.setCurrentLibraryId(value);
};
const handleLibrary = async (data) => {
  let res = await library.add(data);
  if (res) {
    handleLibraryDialogVisible.value = false;
    librarys.value = await library.get();
  }
};
</script>
<style scoped></style>
