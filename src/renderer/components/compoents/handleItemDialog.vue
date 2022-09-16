<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      @open="onOpen"
      @close="onClose"
      title="Dialog Titile"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        label-width="110px"
        label-position="left"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="字段" prop="fields">
          <el-input
            v-model="formData.fields"
            placeholder="请输入字段"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  components: {},
  props: {},
  data() {
    return {
      formData: {
        name: undefined,
        fields: undefined,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        fields: [
          {
            required: true,
            message: "请输入字段",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs["elForm"].resetFields();
    },
    close() {
      this.$emit("update:modelValue", false);
    },
    handelConfirm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        this.close();
      });
    },
  },
};
</script>
<style scoped></style>
