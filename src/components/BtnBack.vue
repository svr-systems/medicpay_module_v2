<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" icon size="x-small" class="mr-1" :to="route">
        <v-icon size="x-large">mdi-chevron-left</v-icon>
      </v-btn>
    </template>
    <span>Volver atrás</span>
  </v-tooltip>
</template>

<script setup>
defineProps({
  route: {
    type: [String, Object],
    required: true,
  },
});
</script>