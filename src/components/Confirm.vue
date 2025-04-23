<template>
  <v-dialog v-model="visible" persistent scrim="black" max-width="400">
    <v-card elevation="24" rounded="lg">
      <v-card-text>
        <v-row dense class="text-center">
          <v-col cols="12">
            <v-icon color="warning" size="64">
              mdi-alert-octagon-outline
            </v-icon>
          </v-col>

          <v-col cols="12">
            <div class="text-h6 pt-2">
              {{ msg }}
            </div>
          </v-col>

          <v-col cols="12" class="d-flex justify-center align-center py-4">
            <v-btn
              color="error"
              icon="mdi-close"
              variant="flat"
              size="small"
              class="mx-2"
              @click="cancel"
              rounded="pill"
            ></v-btn>

            <v-btn
              color="success"
              icon="mdi-check"
              variant="flat"
              size="small"
              class="mx-2"
              @click="accept"
              rounded="pill"
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const msg = ref("");
const visible = ref(false);
const resolve = ref(null);

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

defineExpose({ show });
</script>