<template>
  <v-container>
    <v-row density="compact" justify="center">
      <v-col cols="4" xs="12">
        <v-card :elevation="24" :disabled="ldg" :loading="ldg">
          <v-card-title>
            <v-row density="compact">
              <v-col cols="12" class="text-right">
                <BtnTheme />
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent ref="itemForm">
              <v-row class="mt-1 text-center">
                <v-col cols="12">
                  <img height="55" :src="logo" />
                </v-col>
                <v-col cols="12">
                  <span class="text-caption">{{ app_name }}</span>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.email"
                    label="E-mail"
                    density="compact"
                    variant="outlined"
                    type="text"
                    :rules="rules.email_rqd"
                    maxlength="50"
                    prepend-icon="mdi-at"
                  />
                </v-col>
                <v-col cols="12">
                  <InpPassword
                    :model-value="item.password"
                    @update:model-value="(val) => (item.password = val)"
                    density="compact"
                    label="Contraseña"
                    :rules="rules.rqd"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="text-right">
                    <v-btn
                      block
                      size="small"
                      color="warning"
                      @click.prevent="loginHandle"
                    >
                      Iniciar sesión
                      <v-icon end size="small">mdi-login</v-icon>
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" class="mt-1">
                  <small>V{{ app_version }}</small>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, inject } from "vue";
import { useAuthStore } from "@/store/index.js";
import { useRouter } from "vue-router";
import axios from "axios";
import {
  APP_VERSION,
  APP_NAME,
  URL_API,
  getHdrs,
  getRsp,
  getErr,
  getRules,
} from "@/general";
import BtnTheme from "@/components/BtnTheme.vue";
import InpPassword from "@/components/InpPassword.vue";
import logo from "@/assets/vue.svg";

// Refs
const authStore = useAuthStore();
const router = useRouter();
const itemForm = ref(null);
const ldg = ref(false);      
const alert = inject("alert");
const item = ref({
  email: "",
  password: "",
});

// Constantes
const app_version = APP_VERSION;
const app_name = APP_NAME;
const rules = getRules();
const logoPath = logo;

// Métodos
const loginHandle = async () => {
  const { valid } = await itemForm.value.validate();

  if (valid) {
    ldg.value = true;

    try {
      const response = await axios.post(
        `${URL_API}/auth/login`,
        item.value,
        getHdrs()
      );
      const rsp = getRsp(response);
      authStore.loginAction(rsp.data.auth);
      router.push({ name: "module/consultations" });
    } catch (error) {
      alert?.show("error", getErr(error));
    } finally {
      ldg.value = false;
    }
  }
};
</script>