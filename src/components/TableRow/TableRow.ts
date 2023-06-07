import TableCell from "../TableCell/TableCell.vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    tableRowData: Array,
    tableRowIndex: Number,
  },
  components: {
    TableCell,
  },
  methods: {
    openPopup(coordinatesOfTableCell: string[]) {
      this.$emit("openPopup", coordinatesOfTableCell);
    },
  },
});
