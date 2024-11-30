<script setup>
import { ref } from "vue";

const drawer = ref(true);

const menuItems = [
  { text: "Home", icon: "mdi-home", to: "/" },
  { text: "Users", icon: "mdi-account", to: "/users" },
];
</script>

<template>
  <v-app>
    <v-app-bar color="teal">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-app-bar-title>User Maintenance Application</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer color="teal-lighten-5" v-model="drawer">
      <v-list nav>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :value="item"
          color="teal"
          :to="item.to"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-5">
      <div class="pa-4 fill-height">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>
