<template>
  <span :class="sub ? 'text-caption' : 'text-subtitle-1'">
    <v-icon
      v-if="icon"
      :size="sub ? 'x-small' : 'small'"
      :icon="icon"
      class="ml-1"
    />
    {{ text }}
  </span>
</template>

<script setup>
//Props
defineProps({
  text: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: undefined, 
  },
  sub: {
    type: Boolean,
    default: false,
  },
});
</script>