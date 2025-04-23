<template>
  <div>
    <div v-if="lab_prop" class="text-caption font-weight-bold">{{ lab }}</div>
    <div v-if="!noval_prop">
      <div v-if="!bool_prop" class="text-description">
        <span v-if="!color_prop">
          <v-icon v-if="icon_prop" size="small">mdi-{{ icon }}</v-icon>
          <v-btn
            v-if="link_prop"
            icon
            size="x-small"
            :href="link"
            target="_blank"
          >
            <v-icon size="x-small">mdi-open-in-new</v-icon>
          </v-btn>
          {{ displayValue }}
        </span>
        <v-chip v-else size="x-small" :color="color">
          <v-icon v-if="icon_prop" size="small">mdi-{{ icon }}</v-icon>
          <v-btn
            v-if="link_prop"
            icon
            size="x-small"
            :href="link"
            target="_blank"
          >
            <v-icon size="x-small">mdi-open-in-new</v-icon>
          </v-btn>
          {{ displayValue }}
        </v-chip>
      </div>
      <div v-else>
        <v-icon size="small" :color="value ? 'info' : ''">
          mdi-checkbox-blank-circle{{ value ? "" : "-outline" }}
        </v-icon>
      </div>
    </div>
    <div v-if="sub_prop" class="text-caption">
      <small>{{ sub }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  val: [String, Number, Boolean, Object],
  lab: {
    type: String,
    default: undefined,
  },
  sub: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
  bool: {
    type: Boolean,
    default: undefined,
  },
  num: {
    type: [Number, String],
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  link: {
    type: String,
    default: undefined,
  },
  noval: {
    type: Boolean,
    default: undefined,
  },
});

const value = ref(null);
const lab_prop = ref(false);
const sub_prop = ref(false);
const color_prop = ref(false);
const bool_prop = ref(false);
const icon_prop = ref(false);
const link_prop = ref(false);
const noval_prop = ref(false);

const displayValue = computed(() => {
  if (bool_prop.value) return value.value;
  return typeof props.num === "undefined" &&
    (!value.value || value.value === "")
    ? "-"
    : value.value;
});

onMounted(() => {
  value.value = props.val;
  bool_prop.value = props.bool !== undefined;
  lab_prop.value = props.lab !== undefined;
  sub_prop.value = props.sub !== undefined;
  color_prop.value = props.color !== undefined;
  icon_prop.value = props.icon !== undefined;
  link_prop.value = props.link !== undefined;
  noval_prop.value = props.noval !== undefined;
});
</script>

<style scoped>
.text-description {
  white-space: pre-line;
}
</style>