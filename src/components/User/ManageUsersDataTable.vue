<script setup>
import { defineProps } from "vue";

defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="-1"
    :loading="loading"
    loading-text="Loading users... Please wait"
    hide-default-footer
    disable-sort
  >
  </v-data-table>
</template>
