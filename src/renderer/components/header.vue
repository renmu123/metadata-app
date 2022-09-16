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

<script>
import { db, library, setting } from "../db";
import handleLibraryDialog from "./compoents/handleLibraryDialog.vue";
export default {
  components: {
    handleLibraryDialog,
  },
  data() {
    return {
      handleLibraryDialogVisible: false,
      librarys: [],
      setting: {
        currentLibrary: "",
      },
      currentLibrary: "",
    };
  },
  created() {},
  async mounted() {
    this.librarys = await library.get();
    const settings = await setting.get();
    this.setting = Object.assign(settings, this.setting);
  },
  computed: {},
  watch: {},
  methods: {
    handleCurrentLibraryChange(value) {
      setting.set("currentLibrary", value);
    },
    async handleLibrary(data) {
      let res = await library.add(data);
      if (res) {
        this.handleLibraryDialogVisible = false;
        this.librarys = await library.get();
      }
    },
  },
};
</script>
<style scoped></style>
