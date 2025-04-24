<script setup>
import { ref, onMounted, getCurrentInstance, provide, computed } from "vue";
import { useRouter } from "vue-router";
import { APP_NAME } from "@/general";
import { useAuthStore } from "@/store/index.js";
import BtnTheme from "@/components/BtnTheme.vue";
import BtnLogout from "@/components/BtnLogout.vue";
import Alert from "@/components/Alert.vue";
import Confirm from "@/components/Confirm.vue";

//Refs
const authStore = useAuthStore();
const router = useRouter();
const alert = ref(null);
const confirm = ref(null);
const drawer = ref(false);
const app_name = APP_NAME;
const auth = computed(() => authStore.getAuth);
const app = getCurrentInstance()?.appContext.app;

//Proveer los componentes Alert y Confirm de forma global
provide("alert", {
  show: (color, msg) => alert.value?.show(color, msg),
});

provide("confirm", {
  show: (options) => confirm.value?.show(options),
});
</script>

<template>
  <v-app>
    <Alert ref="alert" />
    <Confirm ref="confirm" />
    <v-app-bar v-if="auth" :elevation="2">
      <v-app-bar-title>MEDICPAY</v-app-bar-title>
      <template v-slot:append>
        <BtnTheme />
        <BtnLogout />
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.theme--dark.v-application {
  background: #1e1e1e !important;
}
.v-tooltip__content {
  font-size: 12px !important;
}
.v-icon.v-icon {
  vertical-align: baseline !important;
}
.v-alert__icon {
  font-size: 16px !important;
  margin-right: 2px !important;
}
.v-card__title {
  padding: 10px !important;
}
.card_title_margin {
  margin-bottom: 16px !important;
}
.card_title_border {
  margin-bottom: 16px !important;
  border-bottom: 0.5px solid rgba(126, 126, 126, 0.2);
}
.v-color-picker {
  max-width: 100% !important;
}
</style>

