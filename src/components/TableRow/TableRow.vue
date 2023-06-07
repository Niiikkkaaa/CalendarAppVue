<template>
  <tr>
    <th>
      <div class="calendar_header_cell">
        <span class="calendar_header_content">{{ title }}</span>
      </div>
    </th>
    <TableCell
      v-for="(data, index) in tableRowData"
      :data="data"
      :key="index"
      :tableRowIndex="tableRowIndex"
      :tableColumnIndex="index"
      @openPopup="openPopup"
    />
  </tr>
</template>

<script src="./TableRow.ts" lang="ts" />

<style scoped>
.calendar_add_button {
  cursor: pointer;
}
.calendar_cell_striped {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.calendar_cell:hover > .calendar_cell_striped {
  display: block;
  display: flex;
  align-items: center;
}
</style>
