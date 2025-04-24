<template>
  <v-dialog v-model="visible" persistent scrim="black" max-width="400">
    <v-card elevation="24" rounded="lg">
      <v-card-text>
        <v-row dense class="text-center">
          <v-col cols="12">
            <v-icon
              color="warning"
              size="64"
              icon="mdi-alert-octagon-outline"
            />
          </v-col>

          <v-col cols="12">
            <div class="text-h6 pt-2">
              {{ msg }}
            </div>
          </v-col>

          <v-col cols="12" class="d-flex justify-center align-center py-4">
            <v-btn
              color="error"
              size="small"
              icon="mdi-close"
              class="mx-2"
              variant="flat"
              rounded="pill"
              @click="cancel"
            />

            <v-btn
              color="success"
              size="small"
              icon="mdi-check"
              class="mx-2"
              variant="flat"
              rounded="pill"
              @click="accept"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

//Refs
const msg = ref("");
const visible = ref(false);
const resolve = ref(null);

//Métodos
const show = (message) => {
  msg.value = message;
  visible.value = true;

  return new Promise((res) => {
    resolve.value = res;
  });
};

const accept = () => {
  resolve.value?.(true);
  visible.value = false;
};

const cancel = () => {
  resolve.value?.(false);
  visible.value = false;
};

//Exponer la función show de forma global para usarse en otros componentes
defineExpose({ show });
</script>