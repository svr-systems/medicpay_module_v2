<template>
  <v-tooltip v-if="val" location="left">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        icon
        size="small"
        :color="color"
        class="ml-1"
        @click.prevent="docDwd"
      >
        <v-icon :icon="`mdi-${icon}`" size="small" />
      </v-btn>
    </template>
    <span>{{ lab }}</span>
  </v-tooltip>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getBlob, getDateTime } from "@/general";

const props = defineProps({
  lab: {
    type: String,
    required: true,
  },
  val: {
    type: [Object, null],
    default: null,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
});

const doc_obj = ref(null);

const docDwd = () => {
  if (!doc_obj.value) return;

  const link = document.createElement("a");
  link.setAttribute("target", "_blank");
  link.href = doc_obj.value;
  link.download = `${getDateTime("", "", "")}.${props.val.ext}`;
  link.click();
};

onMounted(() => {
  if (props.val) {
    doc_obj.value = URL.createObjectURL(getBlob(props.val.cnt, props.val.ext));
  }
});
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>