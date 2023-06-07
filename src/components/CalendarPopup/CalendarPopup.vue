<template>
  <div class="popup" v-show="isPopupOpen">
    <div class="popup_container">
      <h1 class="popup_header">Add new event</h1>
      <div class="planner_event">
        <div class="planner_event_wrapper">
          <span class="planner_event_field_header">Event title</span>
          <input
            type="text"
            v-model="eventTitle"
            class="input"
            v-bind:class="{ error: isEventTitleError }"
            placeholder="Event title"
          />
          <span class="planner_event_field_header">Event description</span>
          <input
            type="text"
            v-model="eventDescription"
            class="input"
            v-bind:class="{ error: isEventDescriptionError }"
            placeholder="Event description"
          />
          <div class="input_priority_container">
            <div class="planner_event_field_header">Priority</div>
            <div
              type="text"
              class="input input_priority"
              v-bind:class="{ error: isPriorityError }"
            >
              {{ priority }}
            </div>
            <div class="calendar_cell">
              <div class="calendar_priority">
                <button
                  class="radius_button_primary"
                  v-show="!isDropdownActive"
                  @click="openDropdown"
                >
                  <span>Select priority</span>
                </button>
                <button
                  class="radius_button_primary"
                  v-show="isDropdownActive"
                  @click="hideDropdown"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
            <ul
              class="dropdown dropdown_priority dropdown_open"
              v-show="isDropdownActive"
            >
              <li
                class="dropdown_item"
                v-for="index in 10"
                :key="index"
                @click="setPriority(index)"
              >
                <span class="dropdown_content">{{ index }}</span>
              </li>
              <li class="dropdown_item">
                <span
                  class="dropdown_content dropdown_content_red"
                  @click="clearPriority"
                  >Clear</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="popup_button_container popup_button_container_right">
        <button
          class="radius_button_secondary_margin_right radius_button_secondary"
          v-show="cellData"
          @click="clearEvent"
        >
          Clear Event
        </button>
        <button class="radius_button_secondary" @click="closePopup">
          Cancel
        </button>
        <button class="radius_button_primary" @click="addEvent">Save</button>
      </div>
    </div>
  </div>
</template>

<script src="./CalendarPopup.ts" lang="ts" />

<style scoped>
.error {
  border-color: rgb(228, 63, 63);
}
</style>
