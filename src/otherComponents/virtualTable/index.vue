<template>
  <div class="box">
    <vxe-table
      border
      show-overflow
      ref="xTable1"
      height="300"
      :row-config="{ isHover: true }"
      :loading="loading"
    >
      <vxe-column type="seq"></vxe-column>
      <vxe-column field="id" title="ID"></vxe-column>
      <vxe-column field="name" title="名字"></vxe-column>
      <vxe-column field="value" title="对应值"></vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    const res = await axios.get("http://ashuai.work:10000/bigData");
    this.loading = false;
    this.render(res.data.data);
  },
  methods: {
    render(data) {
      this.$nextTick(() => {
        const $table = this.$refs.xTable1;
        $table.loadData(data);
      });
    },
  },
};
</script>
