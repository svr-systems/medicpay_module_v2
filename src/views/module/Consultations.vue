<template>
  <v-card elevation="24" :disabled="ldg">
    <v-card-title>
      <v-row density="compact">
        <v-col cols="9">
          <CardTitle :icon="$route.meta.icon" :text="$route.meta.title"/>
        </v-col>
        <v-col cols="3" class="text-right">
          <v-text-field
            v-model="items_srch"
            density="compact"
            label="Buscar..."
            type="text"
            single-line
            hide-details
          >
            <template v-slot:append-inner>
              <v-icon size="small" icon="mdi-magnify"/>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        density="compact"
        :items="items"
        :search="items_srch"
        :headers="items_hdrs"
        :loading="ldg"
        :items-length="totalItems"
        @update:options="loadItems"
      >
        <template v-slot:item.key="{ item }">
          <b>{{ items.indexOf(item) + 1 }}</b>
        </template>
        <template v-slot:item.action="{ item }">
          <div class="text-right">
            <v-tooltip location="left">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  color="warning"
                  size="x-small"
                  icon="mdi-account-cash"
                  variant="text"
                  :to="{
                    name: routeName + '/update',
                    params: { id: encodeId(item.id) },
                  }"
                />
              </template>
              <span>Cobrar</span>
            </v-tooltip>
          </div>
        </template>
      </v-data-table-server>
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

//Imports
const authStore = useAuthStore();
const route = useRoute();
const encodeId = (id) => window.btoa(id);
const alert = inject("alert");
const { connect, disconnect, on, off } = useSocket();

//Refs
const routeName = "module/consultations";
const ldg = ref(false);
const items = ref([]);
const items_srch = ref("");
const itemsPerPage = ref(15);
const totalItems = ref(0);

const items_hdrs = ref([
  {
    text: "#",
    value: "key",
    filterable: false,
    sortable: false,
    width: "60",
  },
  {
    text: "Folio",
    value: "uiid",
  },
  {
    text: "F. registro",
    value: "created_at",
  },
  {
    value: "doctor.user.full_name",
    text: "Médico",
  },
  {
    value: "patient.user.full_name",
    text: "Paciente",
  },
  {
    value: "action",
    text: "",
    filterable: false,
    sortable: false,
    width: "60",
  },
]);

//Métodos
const getItems = async () => {
  ldg.value = true;

  try {
    const response = await axios.get(
      `${URL_API}/${routeName}`,
      getHdrs(authStore.getAuth.token)
    );
    const rsp = getRsp(response);
    items.value = rsp.data.items;
    totalItems.value = rsp.data.items.length;
  } catch (err) {
    alert?.show("error", getErr(err));
  } finally {
    ldg.value = false;
  }
};

const loadItems = ({ page, itemsPerPage, sortBy }) => {
  getItems();
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