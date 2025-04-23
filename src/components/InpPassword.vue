<template>
  <v-text-field
    :label="label"
    v-model="val"
    variant="outlined"
    :type="password_show ? 'text' : 'password'"
    :rules="rules"
    maxlength="50"
    prepend-icon="mdi-lock"
    :disabled="isDisabled"
    :counter="isCounter"
  >
    <template v-slot:append-inner>
      <v-tooltip location="bottom">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            text
            size="x-small"
            :icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
            :disabled="isDisabled"
            variant="plain"
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

const props = defineProps({
  label: String,
  model: String,
  rules: Array,
  disabled: Boolean,
  counter: Boolean,
});

const password_show = ref(false);

const emit = defineEmits(["update:model"]);

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