<template>
  <v-dialog v-model="show" persistent scrim="black" max-width="400">
    <v-card flat>
      <v-card-title class="card_title_border">
        <v-row density="compact">
          <v-col cols="6">
            <CardTitle text="REGISTRO" icon="mdi-database-clock" sub />
          </v-col>
          <v-col cols="6" class="text-right">
            <v-tooltip location="left">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  color="primary"
                  size="small"
                  icon
                  @click="show = false"
                >
                  <v-icon icon="mdi-close" size="small" />
                </v-btn>
              </template>
              <span>Cerrar</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text v-if="item">
        <v-row density="compact">
          <v-col cols="6">
            <VisVal
              lab="Creación"
              :val="item.created_by.email"
              :sub="item.created_at"
            />
          </v-col>
          <v-col cols="6">
            <VisVal
              lab="Últ. edición"
              :val="item.updated_by.email"
              :sub="item.updated_at"
            />
          </v-col>
          <v-col v-if="item.email_verified_at" cols="6">
            <VisVal lab="Verif." noval :sub="item.email_verified_at" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";
import CardTitle from "@/components/CardTitle.vue";
import VisVal from "@/components/VisVal.vue";

//Props
const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object,
    default: null,
    required: true,
  },
});

//Emits
const emit = defineEmits(["input"]);

//Métodos
const show = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});
</script>