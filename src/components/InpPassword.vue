<template>
  <v-text-field
    :label="label"
    v-model="val"
    variant="outlined"
    :type="showVal ? 'text' : 'password'"
    maxlength="50"
    :rules="rules"
    :counter="counter"
    :disabled="disabled"
  >
    <template v-slot:append-inner>
      <v-btn
        size="x-small"
        variant="plain"
        :icon="showVal ? 'mdi-eye' : 'mdi-eye-off'"
        :disabled="disabled"
        @click.prevent="showVal = !showVal"
      />
    </template>
  </v-text-field>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  label: String,
  model: String,
  rules: Array,
  counter: Boolean,
  disabled: Boolean,
});

const showVal = ref(false);
const counter = ref(props.counter !== "undefined" ? props.counter : false);
const disabled = ref(props.disabled !== "undefined" ? props.disabled : false);

const emit = defineEmits(["update:model"]);

const val = computed({
  get() {
    return props.model;
  },
  set(value) {
    emit("update:model", value);
  },
});
</script>