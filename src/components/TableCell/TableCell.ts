import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    data: [Object, String],
    tableColumnIndex: Number,
    tableRowIndex: Number,
  },
  methods: {
    openPopup() {
      this.$emit("openPopup", [this.tableRowIndex, this.tableColumnIndex]);
    },
  },
});
