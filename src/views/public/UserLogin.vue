<template>
  <v-row justify="center">
    <v-col cols="12" md="4" class="mt-11">
      <v-card elevation="24" :loading="ldg" :disabled="ldg">
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="12" class="text-right">
              <BtnTheme />
            </v-col>
            <v-col cols="12">
              <img height="80" :src="logo" />
            </v-col>
            <v-col cols="12">
              <h2 class="font-weight-light">Iniciar Sesión</h2>
            </v-col>
            <v-col cols="12">
              <v-form @submit.prevent ref="itemForm">
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      label="E-mail"
                      v-model="item.email"
                      variant="outlined"
                      type="text"
                      density="compact"
                      maxlength="50"
                      :rules="rules.email_rqd"
                    />
                  </v-col>
                  <v-col cols="12">
                    <InpPassword
                      label="Contraseña"
                      :model-value="item.password"
                      @update:model-value="(val) => (item.password = val)"
                      density="compact"
                      :rules="rules.rqd"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      block
                      size="small"
                      color="warning"
                      :loading="ldg"
                      @click.prevent="handleAction"
                    >
                      Continuar
                      <v-icon end size="small">mdi-login</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" class="pt-11 pb-5">
                    <small
                      class="text-caption font-weight-thin text-medium-emphasis"
                    >
                      Desarrollado por SOLMETEC © 2025
                    </small>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, inject } from "vue";
import { useAuthStore } from "@/store/index.js";
import { useRouter } from "vue-router";
import axios from "axios";
import { URL_API, getHdrs, getRsp, getErr, getRules } from "@/general";
import BtnTheme from "@/components/BtnTheme.vue";
import logo from "@/assets/logo.png";
import InpPassword from "@/components/InpPassword.vue";

const authStore = useAuthStore();
const router = useRouter();
const alert = inject("alert");

const rules = getRules();

const itemForm = ref(null);
const ldg = ref(false);
const item = ref({
  email: "",
  password: "",
});

const handleAction = async () => {
  const { valid } = await itemForm.value.validate();

  if (valid) {
    ldg.value = true;

    try {
      const rsp = getRsp(
        await axios.post(URL_API + "/auth/login", item.value, getHdrs())
      );

      authStore.loginAction(rsp.data.auth);
      router.push({ name: "module/consultations" });
    } catch (err) {
      alert?.show("error", getErr(err));
    } finally {
      ldg.value = false;
    }
  }
};
</script>