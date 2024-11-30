<script setup>
import { ref, inject, onMounted } from "vue";
import ManageUsersDataTable from "@/components/User/ManageUsersDataTable.vue";
import SearchUserForm from "@/components/User/SearchUserForm.vue";

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
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div>
    <h1 class="text-h6 font-weight-medium mb-2">Users</h1>

    <SearchUserForm :loading="isLoading" @search="handleSearchUser" />

    <ManageUsersDataTable
      :headers="headers"
      :items="users"
      :loading="isLoading"
    />
  </div>
</template>
