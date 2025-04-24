<template>
  <v-text-field
    v-model="val"
    prepend-icon="mdi-lock"
    variant="outlined"
    maxlength="50"
    :label="label"
    :type="password_show ? 'text' : 'password'"
    :rules="rules"
    :disabled="isDisabled"
    :counter="isCounter"
  >
    <template v-slot:append-inner>
      <v-tooltip location="bottom">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            size="x-small"
            text
            variant="plain"
            :icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
            :disabled="isDisabled"
            @click.prevent="password_show = !password_show"
          />
        </template>
        {{ password_show ? "Ocultar" : "Mostrar" }}
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

//Props
const props = defineProps({
  label: String,
  model: String,
  rules: Array,
  disabled: Boolean,
  counter: Boolean,
});

//Refs
const password_show = ref(false);

//Emits
const emit = defineEmits(["update:model"]);

//Métodos
const val = computed({
  get() {
    return props.model;
  },
  set(value) {
    emit("update:model", value);
  },
});

onMounted(() => {
  const isDisabled = computed(() => props.disabled ?? false);
  const isCounter = computed(() => props.counter ?? false);
});
</script>