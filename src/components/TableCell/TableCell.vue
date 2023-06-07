<template>
  <td>
    <div class="calendar_cell" v-show="!data">
      <span class="calendar_cell_header">Add</span>
    </div>
    <div
      class="calendar_cell calendar_cell_game_plan"
      :class="[`priority_${typeof data === 'object' && data.priority}`]"
      v-show="data"
    >
      <span class="calendar_cell_header">{{
        typeof data === "object" && data.title
      }}</span>
      <span class="calendar_cell_header">{{
        typeof data === "object" && data.description
      }}</span>
    </div>
    <div class="calendar_cell calendar_cell_striped">
      <button
        class="radius_button_primary radius_button_primary_planner"
        @click="openPopup"
      >
        <span v-show="!data">Add</span>
        <span v-show="data">Edit</span>
      </button>
    </div>
  </td>
</template>

<script src="./TableCell.ts" lang="ts" />

<style scoped>
.calendar_cell {
  width: auto;
  word-wrap: break_word;
}
.calendar_add_button {
  cursor: pointer;
}
.calendar_cell_striped {
  display: none;
  position: absolute;
  height: auto;
  top: 8px;
  bottom: 8px;
  right: 8px;
  left: 8px;
}
td:hover > .calendar_cell_striped {
  display: flex;
}
td:hover > .calendar_cell_game_plan {
  display: none;
}
</style>
