import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isPopupOpen: Boolean,
    // eslint-disable-next-line vue/require-prop-type-constructor
    cellData: [String, Object],
  },
  data() {
    return {
      eventTitle: "",
      eventDescription: "",
      priority: "" as string | number,
      isDropdownActive: false,
      isEventTitleError: false,
      isEventDescriptionError: false,
      isPriorityError: false,
    };
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
      this.eventTitle = "";
      this.eventDescription = "";
      this.isEventTitleError = false;
      this.isEventDescriptionError = false;
      this.isPriorityError = false;
    },
    addEvent() {
      if (!this.eventTitle) {
        this.isEventTitleError = true;
      }
      if (!this.eventDescription) {
        this.isEventDescriptionError = true;
      }
      if (!this.priority) {
        this.isPriorityError = true;
      }
      if (
        !this.isEventTitleError &&
        !this.isEventDescriptionError &&
        !this.isPriorityError
      ) {
        this.$emit("addEvent", {
          title: this.eventTitle,
          description: this.eventDescription,
          priority: this.priority,
          id: typeof this.cellData !== "string" && this.cellData?.event_id,
        });
        this.eventTitle = "";
        this.eventDescription = "";
        this.priority = "";
      }
    },
    clearEvent() {
      if (typeof this.cellData !== "string") {
        this.$emit("clearEvent", this.cellData?.event_id);
      }
      this.eventTitle = "";
      this.eventDescription = "";
      this.priority = "";
      this.isEventTitleError = false;
      this.isEventDescriptionError = false;
      this.isPriorityError = false;
      console.log("this.eventTitle", this.eventTitle);
    },
    setPriority(index: number) {
      this.priority = index;
      this.isDropdownActive = false;
    },
    clearPriority() {
      this.priority = "";
      this.isDropdownActive = false;
    },
    openDropdown() {
      this.isDropdownActive = true;
    },
    hideDropdown() {
      this.isDropdownActive = false;
    },
  },
  watch: {
    isPopupOpen() {
      this.eventTitle = "";
      this.eventDescription = "";
      this.priority = "";
      if (typeof this.cellData !== "string") {
        this.eventTitle = this.cellData?.title;
        this.eventDescription = this.cellData?.description;
        this.priority = this.cellData?.priority;
      }
    },
    eventTitle() {
      this.isEventTitleError = false;
    },
    eventDescription() {
      this.isEventDescriptionError = false;
    },
    priority() {
      this.isPriorityError = false;
    },
  },
});
