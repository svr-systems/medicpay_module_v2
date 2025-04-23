<template>
  <v-snackbar
    v-model="visible"
    location="top"
    elevation="12"
    :color="color"
    :timeout="5500"
    transition="slide-y-transition"
  >
    <div class="text-center">
      {{ msg }}
    </div>
  </v-snackbar>
</template>

<script setup>
import { ref, provide } from "vue";

const color = ref(null);
const msg = ref(null);
const visible = ref(false);

const show = (Newcolor, NewMsg) => {
  color.value = Newcolor;
  msg.value = NewMsg;
  visible.value = true;
};

defineExpose({ show });
</script>