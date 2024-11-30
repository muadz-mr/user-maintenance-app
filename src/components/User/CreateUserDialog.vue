<script setup>
import { defineProps, defineEmits } from "vue";
import CreateUserForm from "./CreateUserForm.vue";

defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  formErrors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["create", "close"]);

const submit = (payload) => {
  create(payload);
};

const create = (payload) => {
  emit("create", payload);
};

const cancel = () => emit("close");
</script>

<template>
  <v-dialog
    model-value="dialog"
    width="420"
    persistent
    @update:modelValue="emit('close')"
  >
    <v-card>
      <v-card-title>Create New User</v-card-title>

      <v-card-text>
        <CreateUserForm
          :errors="formErrors"
          :loading="loading"
          @submit="submit"
          @cancel="cancel"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
