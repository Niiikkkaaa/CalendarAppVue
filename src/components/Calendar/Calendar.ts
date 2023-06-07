import TableRow from "../TableRow/TableRow.vue";
import PlannerBasePopup from "../CalendarPopup/CalendarPopup.vue";
import { defineComponent } from "vue";

type EventType = {
  event_id?: number;
  section: number;
  date: string;
  title: string;
  description: string;
  priority: number;
};

type EventCellType = {
  title: string;
  description: string;
  priority: number;
  id?: number;
};

import moment from "moment";
export default defineComponent({
  components: {
    TableRow,
    PlannerBasePopup,
  },
  data() {
    return {
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thurstday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      dates: [] as string[],
      currentDate: new Date(),
      currentWeek: 0,
      isPopupOpen: false,
      isSection3Open: false,
      sections: ["9:00 - 12:00", "12:00 - 15:00", "15:00 - 18:00"],
      newTableRowData: ["", "", "", "", "", "", ""] as (string | EventType)[],
      tableData: [] as (string | EventType)[][],
      activeCell: [] as number[],
      cellData: "" as string | EventType,
      eventsData: [] as (string | EventType)[],
      defaultArray: [
        {
          event_id: 1,
          section: 2,
          date: "06/06/2023",
          title: "Event#1",
          description: "Description #1",
          priority: 1,
        },
        {
          event_id: 2,
          section: 1,
          date: "06/07/2023",
          title: "Event#2",
          description: "Description #2",
          priority: 2,
        },
        {
          event_id: 3,
          section: 0,
          date: "06/08/2023",
          title: "Event#3",
          description: "Description #3",
          priority: 3,
        },
        {
          event_id: 4,
          section: 3,
          date: "06/09/2023",
          title: "Event#4",
          description: "Description #4",
          priority: 4,
        },
        {
          event_id: 5,
          section: 2,
          date: "06/10/2023",
          title: "Event#5",
          description: "Description #5",
          priority: 5,
        },
        {
          event_id: 6,
          section: 1,
          date: "06/11/2023",
          title: "Event#6",
          description: "Description #6",
          priority: 6,
        },
        {
          event_id: 7,
          section: 0,
          date: "06/12/2023",
          title: "Event#7",
          description: "Description #7",
          priority: 7,
        },
        {
          event_id: 8,
          section: 3,
          date: "06/13/2023",
          title: "Event#8",
          description: "Description #8",
          priority: 10,
        },
        {
          event_id: 8,
          section: 2,
          date: "06/14/2023",
          title: "Event#8",
          description: "Description #8",
          priority: 4,
        },
        {
          event_id: 8,
          section: 1,
          date: "06/15/2023",
          title: "Event#8",
          description: "Description #8",
          priority: 5,
        },
        {
          event_id: 8,
          section: 0,
          date: "06/16/2023",
          title: "Event#8",
          description: "Description #8",
          priority: 6,
        },
        {
          event_id: 9,
          section: 3,
          date: "06/05/2023",
          title: "Event#9",
          description: "Description #8",
          priority: 10,
        },
      ],
    };
  },
  mounted() {
    if (!localStorage.getItem("eventsData")) {
      localStorage.setItem("eventsData", JSON.stringify(this.defaultArray));
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.eventsData = JSON.parse(localStorage.getItem("eventsData"));
    this.currentWeek = this.calculateWeek();
    this.setDates();
    this.filterEventData();
  },
  methods: {
    filterEventData() {
      this.sections = ["9:00 - 12:00", "12:00 - 15:00", "15:00 - 18:00"];
      this.tableData = [
        [...this.newTableRowData],
        [...this.newTableRowData],
        [...this.newTableRowData],
      ];
      const filteredEventData = this.eventsData.filter(
        (event) =>
          typeof event !== "string" &&
          this.calculateWeekForEvent(new Date(event.date)) === this.currentWeek
      );
      if (this.isSection4(filteredEventData)) {
        this.addSection();
      } else {
        this.hideSection();
      }
      filteredEventData.forEach((event) => {
        this.tableData = this.tableData.map((tableDataRow, tableRowIndex) =>
          tableDataRow.map((tableDataCell, tableCellIndex) => {
            if (
              typeof event !== "string" &&
              event.section === tableRowIndex &&
              this.countIndexOfWeekDay(event.date) === tableCellIndex
            ) {
              tableDataCell = event;
            }
            return tableDataCell;
          })
        );
      });
    },
    isSection4(events: (string | EventType)[]) {
      const section4Events = events.filter(
        (event) => typeof event !== "string" && event.section === 3
      );
      if (section4Events.length) {
        return true;
      } else {
        return false;
      }
    },
    countIndexOfWeekDay(date: string) {
      if (new Date(date).getDay() === 0) {
        return 6;
      } else {
        return new Date(date).getDay() - 1;
      }
    },
    calculateWeek() {
      const currentDate: Date = this.currentDate;
      const startDate: Date = new Date(currentDate.getFullYear(), 0, 0);
      const days = Math.floor(
        (new Date(currentDate).valueOf() - new Date(startDate).valueOf()) /
          (24 * 60 * 60 * 1000)
      );
      const weekNumber = Math.ceil(days / 7);
      return weekNumber;
    },
    calculateWeekForEvent(eventDate: Date) {
      const startDate = new Date(this.currentDate.getFullYear(), 0, 0);
      const days = Math.floor(
        (new Date(eventDate).valueOf() - new Date(startDate).valueOf()) /
          (24 * 60 * 60 * 1000)
      );
      const weekNumber = Math.ceil(days / 7);
      return weekNumber;
    },
    calculateDate(indexOfWeekDay: number) {
      const dateFormat = "MM/DD/YYYY";
      let indexOfCurrentDay = this.currentDate.getDay();
      if (indexOfCurrentDay === 0) {
        indexOfCurrentDay = 7;
      }
      const diff = indexOfWeekDay - indexOfCurrentDay;
      if (diff === 0) {
        return moment(this.currentDate).format(dateFormat);
      } else {
        return moment(this.formatDate(diff)).format(dateFormat);
      }
    },
    setDates() {
      this.dates = [
        this.getFullDateNew(1),
        this.getFullDateNew(2),
        this.getFullDateNew(3),
        this.getFullDateNew(4),
        this.getFullDateNew(5),
        this.getFullDateNew(6),
        this.getFullDateNew(7),
      ];
    },
    getFullDate(date: Date) {
      return `${date.getDate()} ${
        this.months[date.getMonth()]
      } ${date.getFullYear()}`;
    },
    formatDate(diff: number) {
      const resultDate = new Date(this.currentDate);
      return new Date(resultDate.setDate(resultDate.getDate() + diff));
    },
    getFullDateNew(dayOfWeek: number) {
      let currentDayOfWeek = new Date().getDay();
      if (currentDayOfWeek === 0) {
        currentDayOfWeek = 7;
      }
      const diff = dayOfWeek - currentDayOfWeek;
      if (diff === 0) {
        return this.getFullDate(this.currentDate);
      } else {
        return this.getFullDate(this.formatDate(diff));
      }
    },
    addSection() {
      this.sections = [...this.sections, "18:00 - 21:00"];
      this.tableData = [...this.tableData, [...this.newTableRowData]];
      this.isSection3Open = true;
    },
    hideSection() {
      this.sections = ["9:00 - 12:00", "12:00 - 15:00", "15:00 - 18:00"];
      this.isSection3Open = false;
    },
    nextWeek() {
      this.currentDate = new Date(
        this.currentDate.setDate(this.currentDate.getDate() + 7)
      );
      this.setDates();
      this.currentWeek += 1;
      this.filterEventData();
    },
    prevWeek() {
      this.currentDate = new Date(
        this.currentDate.setDate(this.currentDate.getDate() - 7)
      );
      this.setDates();
      this.currentWeek -= 1;
      this.filterEventData();
    },
    openPopup(coordinatesOfTableCell: number[]) {
      this.isPopupOpen = true;
      this.activeCell = [...coordinatesOfTableCell];
      this.cellData = this.tableData[this.activeCell[0]][this.activeCell[1]];
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    addEvent(eventData: EventCellType) {
      if (this.tableData[this.activeCell[0]][this.activeCell[1]] === "") {
        this.eventsData.push({
          event_id: Date.now(),
          section: this.activeCell[0],
          date: this.calculateDate(this.activeCell[1] + 1),
          title: eventData.title,
          description: eventData.description,
          priority: eventData.priority,
        });
      } else {
        this.changeEvent(eventData);
      }
      localStorage.setItem("eventsData", JSON.stringify(this.eventsData));
      this.isPopupOpen = false;
      this.filterEventData();
    },
    changeEvent(eventData: EventCellType) {
      this.eventsData = this.eventsData.map((event) => {
        if (typeof event !== "string" && event.event_id === eventData.id) {
          return {
            ...event,
            title: eventData.title,
            description: eventData.description,
            priority: eventData.priority,
          };
        }
        return event;
      });
    },
    clearEvent(id: number) {
      this.eventsData = this.eventsData.filter(
        (event) => typeof event !== "string" && event.event_id !== id
      );
      localStorage.setItem("eventsData", JSON.stringify(this.eventsData));
      this.isPopupOpen = false;
      this.filterEventData();
    },
  },
});
