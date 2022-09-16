<!--  -->
<template>
  <div class="">
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="dir" label="路径"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
};
</script>
<style scoped></style>
