<template>
  <v-menu
    v-model="menu"
    location="bottom"
    ref="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-text-field
        v-model="val"
        v-bind="activatorProps"
        density="compact"
        :label="label"
        :rules="rules"
        :disabled="$attrs.disabled"
        readonly
        :variant="outlined ? 'outlined' : 'underlined'"
      />
    </template>
    <v-date-picker
      v-model="val"
      color="warning"
      title=""
      scrollable
      :min="date_min"
      :max="date_max"
    >
      <template v-slot:actions>
        <v-spacer />
        <v-tooltip location="left">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="tooltipProps"
              color="error"
              size="x-small"
              icon
              @click="cancel"
            >
              <v-icon size="small" icon="mdi-close"/>
            </v-btn>
          </template>
          <span>Cancelar</span>
        </v-tooltip>

        <v-tooltip v-if="clean" location="left">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="tooltipProps"
              color="info"
              size="x-small"
              icon
              class="ml-1"
              @click="erase"
            >
              <v-icon size="small" icon="mdi-eraser"  />
            </v-btn>
          </template>
          <span>Limpiar</span>
        </v-tooltip>

        <v-tooltip location="left">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="tooltipProps"
              color="warning"
              size="x-small"
              icon
              class="ml-1"
              @click="select"
            >
              <v-icon size="small" icon="mdi-check"  />
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

//Props
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

//Emits
const emit = defineEmits(["update:model"]);

//Refs
const menu = ref(false);
const date_min = ref("1920-01-01");
const date_max = ref("");
const menuRef = ref(null);

const val = computed({
  get: () => props.model,
  set: (value) => emit("update:model", value),
});

//Métodos
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