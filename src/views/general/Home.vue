<template>
  <v-row class="text-center">
    <v-col cols="12" class="pt-5" />
    <v-col cols="12">
      <v-img :src="logoPath" class="my-3" contain height="55" />
    </v-col>
    <v-col cols="12">
      <div class="text-h4">BIENVENIDO</div>
    </v-col>
  </v-row>
</template>

<script setup>
import logo from "@/assets/vue.svg";

const logoPath = logo;
</script>