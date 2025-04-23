<template>
  <span :class="sub ? 'text-caption' : 'text-subtitle-1'">
    <v-icon
      v-if="icon"
      :size="sub ? 'x-small' : 'small'"
      class="ml-1"
      :icon="icon"
    />
    {{ text }}
  </span>
</template>

<script setup>
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