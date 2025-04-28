<template>
  <v-card elevation="24" :disabled="ldg">
    <v-card-title>
      <v-row density="compact">
        <v-col cols="12" md="9">
          <CardTitle :icon="$route.meta.icon" :text="$route.meta.title" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="Buscar"
            v-model="items_srch"
            type="text"
            density="compact"
            append-inner-icon="mdi-magnify"
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="items_hdrs"
        :items="items"
        :items-per-page="25"
        density="compact"
        :search="items_srch"
        :loading="ldg"
      >
        <template v-slot:item.key="{ item }">
          <b>{{ items.indexOf(item) + 1 }}</b>
        </template>
        <template v-slot:item.action="{ item }">
          <div class="text-right">
            <v-btn
              size="x-small"
              variant="text"
              icon="mdi-account-cash"
              color="warning"
              :to="{
                name: routeName + '/update',
                params: { id: encodeId(item.id) },
              }"
            >
              <v-icon />
              <v-tooltip activator="parent" location="start">
                Cobrar
              </v-tooltip>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed, inject, onBeforeUnmount } from "vue";
import { useAuthStore } from "@/store";
import { useRoute } from "vue-router";
import axios from "axios";
import { URL_API, getHdrs, getRsp, getErr } from "@/general";
import CardTitle from "@/components/CardTitle.vue";
import { useSocket } from "@/plugins/socket.js";

const authStore = useAuthStore();
const route = useRoute();
const encodeId = (id) => window.btoa(id);
const alert = inject("alert");
const { connect, disconnect, on, off } = useSocket();

const routeName = "module/consultations";
const ldg = ref(false);
const items = ref([]);
const items_srch = ref("");
const items_hdrs = [
  {
    title: "#",
    value: "key",
    filterable: false,
    sortable: false,
    width: "60",
  },
  {
    title: "Folio",
    value: "uiid",
  },
  {
    title: "F. registro",
    value: "created_at",
  },
  {
    title: "Médico",
    value: "doctor.user.full_name",
  },
  {
    title: "Paciente",
    value: "patient.user.full_name",
  },
  {
    title: "",
    value: "action",
    filterable: false,
    sortable: false,
    width: "60",
  },
];

const getItems = async () => {
  ldg.value = true;

  try {
    const rsp = getRsp(
      await axios.get(
        URL_API + "/" + routeName,
        getHdrs(authStore.getAuth.token)
      )
    );
    items.value = rsp.data.items;
  } catch (err) {
    alert?.show("error", getErr(err));
  } finally {
    ldg.value = false;
  }
};

const handleReload = () => {
  getItems();
};

onMounted(() => {
  getItems();

  connect();
  on("reloadItems", handleReload);
});

onBeforeUnmount(() => {
  off("reloadItems", handleReload);
  disconnect();
});
</script>