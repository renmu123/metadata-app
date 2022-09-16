<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      @open="onOpen"
      @close="onClose"
      :title="isAdd ? '新增' : '编辑'"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        label-width="110px"
        label-position="left"
      >
        <el-form-item label="库名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="字段" prop="fields">
          <div
            v-for="(value, index) in formData.fields"
            :key="index"
            style="margin-top: 10px"
          >
            <el-input
              v-model="formData.fields[index]"
              placeholder="请输入字段"
              clearable
              :style="{ width: 'auto' }"
            >
            </el-input>
            <el-icon class="pointer" @click="addField"><Plus /></el-icon>
            <el-icon class="pointer" @click="removeField(index)"
              ><Minus
            /></el-icon>
          </div>
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
// TODO:字段名称支持排序
export default {
  inheritAttrs: false,
  components: {},
  props: {
    id: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      formData: {
        name: undefined,
        fields: [""],
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        // fields: [
        //   {
        //     required: true,
        //     message: "请输入字段",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  computed: {
    isAdd() {
      return !!this.id;
    },
  },
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
        this.$emit("confirm", this.formData);
      });
    },
    addField() {
      this.formData.fields.push("");
    },
    removeField(index) {
      this.formData.fields.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
