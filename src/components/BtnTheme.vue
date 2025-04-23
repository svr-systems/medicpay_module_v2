<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <v-btn size="small" variant="text"  v-on="on" icon="mdi-brightness-6" @click="toggleTheme">
      </v-btn>
    </template>
    <span>Utilizar modo: {{ isDark ? "Obscuro" : "Claro" }}</span>
  </v-tooltip>
</template>

<script setup>
import { computed, watch } from "vue";
import { useTheme } from "vuetify";
import { useAuthStore } from "@/store/index.js";

const authStore = useAuthStore();
const theme = useTheme();

const isDark = computed(() => authStore.conf.theme_dark);

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