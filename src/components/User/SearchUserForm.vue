<script setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["search"]);

const formModel = ref({
  name: "",
});

const search = () => {
  const payload = structuredClone(formModel.value);
  emit("search", payload);
};

const reset = () => {
  formModel.value.name = "";
  emit("search", {});
};
</script>

<template>
  <v-card>
    <v-card-text>
      <form @submit.prevent="search">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="formModel.name"
              label="Search by Name"
              :disabled="loading"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="d-flex justify-end mt-4">
          <v-btn
            type="submit"
            color="teal"
            prepend-icon="mdi-magnify"
            :loading="loading"
            :disabled="loading"
            >Search</v-btn
          >
          <v-btn
            variant="outlined"
            color="teal"
            prepend-icon="mdi-close"
            :loading="loading"
            :disabled="loading"
            @click.stop="reset"
            class="ml-2"
            >Reset</v-btn
          >
        </div>
      </form>
    </v-card-text>
  </v-card>
</template>
