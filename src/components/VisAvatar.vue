<template>
  <div>
    <v-avatar :size="size_val">
      <v-img v-if="val" :src="getImg(val)" />
      <v-icon v-else :size="size_val"> mdi-{{ icon_val }} </v-icon>
    </v-avatar>
    <span v-if="lab_prop" v-text="lab" class="ml-2 caption" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getBlob } from "@/general";

//Props
const props = defineProps({
  lab: {
    type: String,
    default: undefined,
  },
  val: {
    type: Object,
    default: null,
  },
  icon: {
    type: String,
    default: "account-circle",
  },
  size: {
    type: [Number, String],
    default: 21,
  },
});

//Refs
const doc_obj = ref(null);
const lab_prop = ref(false);
const icon_val = ref("account-circle");
const size_val = ref(21);

//Métodos
const getImg = (v) => {
  return URL.createObjectURL(getBlob(v.cnt, v.ext));
};

onMounted(() => {
  lab_prop.value = props.lab !== undefined;
  icon_val.value = props.icon !== undefined ? props.icon : "account-circle";
  size_val.value = props.size !== undefined ? props.size : 21;
});
</script>