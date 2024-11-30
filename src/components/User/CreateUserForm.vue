<script setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["submit", "cancel"]);

const formModel = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
});

const submit = () => {
  emit("submit", structuredClone(formModel.value));
};

const cancel = () => {
  formModel.value.name = "";
  formModel.value.email = "";
  formModel.value.phone = "";
  formModel.value.password = "";
  emit("cancel");
};
</script>

<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="formModel.name"
      label="Name"
      :disabled="loading"
      hide-details="auto"
      :error="errors.name && errors.name.length > 0"
      :error-messages="errors.name ? errors.name[0] : ''"
    ></v-text-field>
    <v-text-field
      v-model="formModel.email"
      label="Email"
      type="email"
      :disabled="loading"
      hide-details="auto"
      class="mt-3"
      :error="errors.email && errors.email.length > 0"
      :error-messages="errors.email ? errors.email[0] : ''"
    ></v-text-field>
    <v-text-field
      v-model="formModel.phone"
      label="Phone"
      :disabled="loading"
      class="mt-3"
      persistent-hint
      hint="Format: 01x-xxxxxxxx"
      :error="errors.phone && errors.phone.length > 0"
      :error-messages="errors.phone ? errors.phone[0] : ''"
    ></v-text-field>
    <v-text-field
      v-model="formModel.password"
      label="Password"
      type="password"
      :disabled="loading"
      hide-details="auto"
      class="mt-3"
      :error="errors.password && errors.password.length > 0"
      :error-messages="errors.password ? errors.password[0] : ''"
    ></v-text-field>

    <div class="d-flex justify-end mt-4">
      <v-btn
        type="submit"
        color="teal"
        prepend-icon="mdi-plus"
        :loading="loading"
        :disabled="loading"
        >Create</v-btn
      >
      <v-btn
        color="teal"
        variant="text"
        prepend-icon="mdi-cancel"
        :loading="loading"
        :disabled="loading"
        @click.stop="cancel"
        class="ml-2"
        >Cancel</v-btn
      >
    </div>
  </form>
</template>
