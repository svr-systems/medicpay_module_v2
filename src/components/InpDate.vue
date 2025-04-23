<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    location="bottom"
    min-width="auto"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-text-field
        v-bind="activatorProps"
        v-model="val"
        :label="label"
        :rules="rules"
        :disabled="$attrs.disabled"
        readonly
        density="compact"
        :variant="outlined ? 'outlined' : 'underlined'"
      />
    </template>
    <v-date-picker
      v-model="val"
      title=""
      scrollable
      :min="date_min"
      :max="date_max"
      color="warning"
    >
      <template v-slot:actions>
        <v-spacer />
        <v-tooltip location="left">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="tooltipProps"
              size="x-small"
              icon
              color="error"
              @click="cancel"
            >
              <v-icon icon="mdi-close" size="small" />
            </v-btn>
          </template>
          <span>Cancelar</span>
        </v-tooltip>

        <v-tooltip v-if="clean" location="left">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="tooltipProps"
              size="x-small"
              icon
              color="info"
              class="ml-1"
              @click="erase"
            >
              <v-icon icon="mdi-eraser" size="small" />
            </v-btn>
          </template>
          <span>Limpiar</span>
        </v-tooltip>

        <v-tooltip location="left">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="tooltipProps"
              size="x-small"
              icon
              color="warning"
              class="ml-1"
              @click="select"
            >
              <v-icon icon="mdi-check" size="small" />
            </v-btn>
          </template>
          <span>Aceptar</span>
        </v-tooltip>
      </template>
    </v-date-picker>
  </v-menu>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getDateTime } from "@/general";

const props = defineProps({
  label: String,
  model: String,
  rules: Array,
  disabled: Boolean,
  clean: Boolean,
  outlined: Boolean,
  before: Boolean,
  after: Boolean,
});

const emit = defineEmits(["update:model"]);

const menu = ref(false);
const date_min = ref("1920-01-01");
const date_max = ref("");
const menuRef = ref(null);

const val = computed({
  get: () => props.model,
  set: (value) => emit("update:model", value),
});

const cancel = () => {
  menu.value = false;
};

const erase = () => {
  menuRef.value?.save(null);
};

const select = () => {
  menuRef.value?.save(val.value);
};

onMounted(() => {
  if (props.before || props.after) {
    const now = getDateTime().substring(0, 10);

    if (props.before) {
      date_max.value = now;
    }

    if (props.after) {
      date_min.value = now;
      date_max.value = "";
    }
  }
});
</script>