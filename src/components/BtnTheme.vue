<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <v-btn size="small" icon="mdi-brightness-6" variant="text" v-on="on" @click="toggleTheme">
      </v-btn>
    </template>
    <span>Utilizar modo: {{ isDark ? "Obscuro" : "Claro" }}</span>
  </v-tooltip>
</template>

<script setup>
import { computed, watch } from "vue";
import { useTheme } from "vuetify";
import { useAuthStore } from "@/store/index.js";

//Imports
const authStore = useAuthStore();
const theme = useTheme();

//Refs
const isDark = computed(() => authStore.conf.theme_dark);

//Métodos
const toggleTheme = () => {
  authStore.themeDarkAction();
};

watch(
  isDark,
  (newVal) => {
    theme.global.name.value = newVal ? "dark" : "light";
  },
  { immediate: true }
);
</script>