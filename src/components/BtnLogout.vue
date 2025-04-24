<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        size="small"
        icon="mdi-logout-variant"
        @click.prevent="logoutHandle"
      >
      </v-btn>
    </template>
    Cerrar Sesión
  </v-tooltip>
</template>

<script setup>
import { inject } from "vue";
import { useAuthStore } from "@/store/index.js";
import { useRouter } from "vue-router";
import axios from "axios";
import { URL_API, getHdrs, getErr } from "@/general";


//Imports
const authStore = useAuthStore();
const router = useRouter();
const confirm = inject("confirm");
const alert = inject("alert");

//Métodos
const logout = () => {
  authStore.logoutAction();
  router.push({ name: "login" });
};

const logoutHandle = async () => {
  try {
    const confirmed = await confirm?.show("¿Cerrar sesión?");
    if (!confirmed) return;

    await axios.get(
      `${URL_API}/auth/logout`,
      getHdrs(authStore.getAuth?.token)
    );
    logout(); 
  } catch (err) {
    alert?.show("error", getErr(err));
    logout();
  }
};
</script>