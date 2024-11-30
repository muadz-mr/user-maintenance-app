<script setup>
import { ref, inject, onMounted } from "vue";
import ManageUsersDataTable from "@/components/User/ManageUsersDataTable.vue";
import SearchUserForm from "@/components/User/SearchUserForm.vue";
import CreateUserDialog from "@/components/User/CreateUserDialog.vue";

const headers = [
  { title: "ID", value: "id" },
  { title: "Name", value: "name" },
  { title: "Email", value: "email" },
  { title: "Phone", value: "phone" },
  { title: "Password", value: "password" },
];

const isLoading = ref(false);
const params = ref({});
const users = ref([]);

const handleSearchUser = async (payload) => {
  params.value = payload;
  await fetchData();
};

const axios = inject("axios");
const fetchData = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get("/api/user/all", { params: params.value });
    users.value = response.data.data ?? [];
  } catch (error) {
    handleRequestError(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchData();
});

const showDialog = ref(false);
const formErrors = ref({});
const clearPreviousErrors = () => {
  formErrors.value = {};
};

const closeDialog = () => {
  clearPreviousErrors();
  showDialog.value = false;
};

const handleFormSubmitError = (error) => {
  if (typeof error.response !== "undefined") {
    return handleRequestError(error);
  }

  console.error(error);
};

const handleRequestError = (error) => {
  const {
    response: {
      status,
      data: { errors, errMsg: message },
    },
  } = error;

  if (status === 422) {
    formErrors.value = errors;
  } else {
    console.error(message || "Unknown server error.");
  }
};

const requestCreateUser = async (payload) => {
  try {
    isLoading.value = true;
    await axios.post("/api/user/add", payload);
    showDialog.value = false;
    await fetchData();
  } catch (error) {
    handleFormSubmitError(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <h1 class="text-h6 font-weight-medium mb-2">Users</h1>

    <SearchUserForm :loading="isLoading" @search="handleSearchUser" />

    <div class="d-flex justify-end my-4">
      <v-btn color="teal" :disabled="isLoading" @click="showDialog = true" prepend-icon="mdi-plus"
        >Create</v-btn
      >
    </div>

    <ManageUsersDataTable
      :headers="headers"
      :items="users"
      :loading="isLoading"
    />

    <CreateUserDialog
      v-model="showDialog"
      :formErrors="formErrors"
      :loading="isLoading"
      @create="requestCreateUser"
      @close="closeDialog"
    />
  </div>
</template>
