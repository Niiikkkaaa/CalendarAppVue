<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Calendar</title>
    </head>

    <body>
      <main class="main">
        <div class="content_wrapper content_wrapper_calendar">
          <div class="calendar_navigation_container">
            <a href="#" class="radius_button_primary" @click="prevWeek"
              >Prev week</a
            >
            <a href="#" class="radius_button_primary" @click="nextWeek">
              Next week
            </a>
          </div>
          <div>
            <table class="calendar_calendar_table">
              <tr>
                <th>
                  <div class="calendar_header_cell">
                    <span class="calendar_header_content">Date</span>
                  </div>
                </th>
                <th v-for="index in 7" v-bind:key="index">
                  <div class="calendar_header_cell">
                    <span class="calendar_header_content">{{
                      daysOfWeek[index - 1]
                    }}</span>
                    <span class="calendar_header_time">{{
                      dates[index - 1]
                    }}</span>
                  </div>
                </th>
              </tr>
              <TableRow
                v-for="(item, index) in sections"
                :key="index"
                :tableRowData="tableData[index]"
                :tableRowIndex="index"
                :title="item"
                @openPopup="openPopup"
              />
            </table>
          </div>
          <div v-show="!isSection3Open" class="calendar_sessions">
            <button
              class="calendar_add_button"
              @click="addSection"
              v-show="!isSection3Open"
            >
              Add more events
            </button>
          </div>
        </div>
      </main>
      <PlannerBasePopup
        :isPopupOpen="isPopupOpen"
        :cellData="cellData"
        @closePopup="closePopup"
        @clearEvent="clearEvent"
        @addEvent="addEvent"
      />
    </body>
  </html>
</template>

<script src="./Calendar.ts" lang="ts" />

<style>
@import "../../styles/styles.css";
</style>
