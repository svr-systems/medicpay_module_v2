<template>
  <v-card elevation="24" :disabled="ldg" :loading="ldg">
    <v-card-title>
      <v-row density="compact">
        <v-col cols="11">
          <BtnBack :route="{ name: routeName }" />
          <CardTitle :text="route.meta.title" :icon="route.meta.icon" />
        </v-col>
        <v-col cols="1" class="text-right" />
      </v-row>
    </v-card-title>
    <v-card-text v-if="item">
      <v-form @submit.prevent="update" ref="itemForm">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row density="compact">
                  <v-col cols="8">
                    <CardTitle text="CONSULTA" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row density="compact">
                  <v-col cols="12" md="4">
                    <VisVal
                      lab="Folio"
                      :val="item.uiid"
                      :sub="item.created_at"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VisVal
                      lab="Médico"
                      :val="item.doctor.full_name"
                      :sub="item.doctor.uiid"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VisVal
                      lab="Paciente"
                      :val="item.patient.full_name"
                      :sub="
                        item.patient.uiid +
                        ' | Tel. ' +
                        item.patient.movil_phone
                      "
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row density="compact">
                  <v-col cols="8">
                    <CardTitle text="COBRO" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row density="compact">
                  <v-col cols="12" class="text-center">
                    <div class="text-caption font-weight-bold">MONTO</div>
                    <div class="text-h2 pb-4">
                      {{ getAmountFormat(item.charge_amount) }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      label="E-mail del paciente"
                      v-model="item.patient.email"
                      density="compact"
                      variant="outlined"
                      type="text"
                      :rules="rules.email"
                      maxlength="65"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      label="Forma de pago"
                      v-model="item.fiscal_payment_id"
                      density="compact"
                      variant="outlined"
                      :rules="rules.required"
                      :items="fiscal_payments"
                      :item-title="(v) => v.name + ' | ' + v.code"
                      item-value="id"
                      :loading="fiscal_payments_ldg"
                    />
                  </v-col>
                  <v-col cols="12" md="4" v-if="item.fiscal_payment_id == 3">
                    <v-text-field
                      label="Referencia"
                      v-model="item.charge_reference"
                      density="compact"
                      variant="outlined"
                      :rules="rules.txt_rqd"
                      type="text"
                      maxlength="20"
                      counter
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="2"
                    v-if="
                      item.fiscal_payment_id == 4 ||
                      item.fiscal_payment_id == 18
                    "
                  >
                    <v-text-field
                      label="Núm. aprobación"
                      v-model="item.charge_aprobattion"
                      density="compact"
                      variant="outlined"
                      :rules="rules.txt_rqd"
                      type="text"
                      maxlength="10"
                      counter
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="2"
                    v-if="
                      item.fiscal_payment_id == 4 ||
                      item.fiscal_payment_id == 18
                    "
                  >
                    <v-text-field
                      label="Tarjeta (4 últ. dig.)"
                      v-model="item.charge_card"
                      density="compact"
                      variant="outlined"
                      :rules="rules.txt_rqd"
                      type="text"
                      maxlength="4"
                      counter
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-divider />
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="¿Requiere factura fiscal?"
                      v-model="item.bill_patient"
                      density="compact"
                      variant="outlined"
                      :rules="[(v) => v != null || 'Campo requerido']"
                      :items="bill_patient_opts"
                      :item-title="(v) => v.name"
                      item-value="id"
                    />
                  </v-col>
                  <v-col cols="12" v-if="item.bill_patient">
                    <v-row density="compact">
                      <v-col cols="12" md="3">
                        <v-text-field
                          label="RFC"
                          v-model="item.fiscal_code"
                          density="compact"
                          variant="outlined"
                          :rules="rules.fiscal_code_rqd"
                          type="text"
                          maxlength="13"
                          counter
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          label="Nombre | Razón social"
                          v-model="item.fiscal_name"
                          density="compact"
                          variant="outlined"
                          :rules="rules.txt_rqd"
                          type="text"
                          maxlength="75"
                          counter
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          label="CP"
                          v-model="item.fiscal_zip"
                          density="compact"
                          variant="outlined"
                          :rules="rules.zip_rqd"
                          type="text"
                          maxlength="5"
                          counter
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-select
                          label="Tipo Fiscal"
                          v-model="item.fiscal_type_id"
                          density="compact"
                          variant="outlined"
                          :rules="rules.rqd"
                          :items="fiscal_types"
                          :item-title="(v) => v.name"
                          item-value="id"
                          :loading="fiscal_types_ldg"
                          @update:modelValue="getFiscalRegimes()"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-autocomplete
                          label="Régimen Fiscal"
                          v-model="item.fiscal_regime_id"
                          density="compact"
                          variant="outlined"
                          :rules="rules.rqd"
                          :items="fiscal_regimes"
                          :item-title="(v) => v.name + ' | ' + v.code"
                          item-value="id"
                          :loading="fiscal_regimes_ldg"
                          @update:modelValue="getFiscalUses()"
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-autocomplete
                          label="Uso CFDI"
                          v-model="item.fiscal_use_id"
                          density="compact"
                          variant="outlined"
                          :rules="rules.rqd"
                          :items="fiscal_uses"
                          :item-title="(v) => v.name + ' | ' + v.code"
                          item-value="id"
                          :loading="fiscal_uses_ldg"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-divider />
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      v-model="item.charge_proof_doc"
                      label="Comprobante"
                      density="compact"
                      variant="outlined"
                      :rules="rules.docLmt"
                      show-size
                      prepend-icon=""
                      accept=".jpg"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div class="text-right">
              <v-btn
                block
                size="small"
                color="success"
                :loading="ldg"
                @click.prevent="update"
              >
                Aceptar
                <v-icon icon="mdi-account-cash" size="small" end />
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed, inject } from "vue";
import { useAuthStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import {
  URL_API,
  getHdrs,
  getRsp,
  getErr,
  getRules,
  getObj,
  getFormData,
  getAmountFormat,
} from "@/general";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import VisVal from "@/components/VisVal.vue";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const alert = inject("alert");
const confirm = inject("confirm");

// Refs
const itemForm = ref(null);
const ldg = ref(true);
const item = ref(null);
const routeName = "module/consultations";
const id = ref(window.atob(route.params.id));

// Catálogos
const fiscal_payments = ref([]);
const fiscal_payments_ldg = ref(false);
const bill_patient_opts = ref([
  { id: 0, name: "NO" },
  { id: 1, name: "SI" },
  { id: null, name: "-" },
]);
const fiscal_types = ref([]);
const fiscal_types_ldg = ref(false);
const fiscal_regimes = ref([]);
const fiscal_regimes_ldg = ref(false);
const fiscal_uses = ref([]);
const fiscal_uses_ldg = ref(false);

const rules = getRules();

const getCatalogs = async () => {
  try {
    const [paymentsResponse, typesResponse] = await Promise.all([
      axios.get(
        `${URL_API}/module/fiscal_payments`,
        getHdrs(authStore.getAuth.token)
      ),
      axios.get(
        `${URL_API}/module/fiscal_types`,
        getHdrs(authStore.getAuth.token)
      ),
    ]);

    fiscal_payments.value = getRsp(paymentsResponse).data.items;
    fiscal_types.value = getRsp(typesResponse).data.items;
  } catch (err) {
    alert?.show("error", getErr(err));
  } finally {
    fiscal_payments_ldg.value = false;
    fiscal_types_ldg.value = false;
  }
};

const getItem = async () => {
  try {
    const response = await axios.get(
      `${URL_API}/${routeName}/${id.value}`,
      getHdrs(authStore.getAuth.token)
    );

    const rsp = getRsp(response);
    item.value = rsp.data.item;

    if (!item.value.charged_at && !item.value.patient.fiscal_name) {
      item.value.fiscal_name = item.value.patient.full_name;
    }

    await getFiscalRegimes(true);
    await getFiscalUses(true);
  } catch (err) {
    alert?.show("error", getErr(err));
  } finally {
    ldg.value = false;
  }
};

const getFiscalRegimes = async (isMounted = false) => {
  if (!isMounted) {
    item.value.fiscal_regime_id = null;
    item.value.fiscal_use_id = null;
  }

  fiscal_regimes_ldg.value = true;

  try {
    const response = await axios.get(
      `${URL_API}/module/fiscal_regimes?fiscal_type_id=${item.value.fiscal_type_id}`,
      getHdrs(authStore.getAuth.token)
    );
    fiscal_regimes.value = getRsp(response).data.items;
  } catch (err) {
    alert?.show("error", getErr(err));
  } finally {
    fiscal_regimes_ldg.value = false;
  }
};

const getFiscalUses = async (isMounted = false) => {
  if (!isMounted) {
    item.value.fiscal_use_id = null;
  }

  fiscal_uses_ldg.value = true;

  try {
    const response = await axios.get(
      `${URL_API}/module/fiscal_uses?fiscal_regime_id=${item.value.fiscal_regime_id}`,
      getHdrs(authStore.getAuth.token)
    );
    fiscal_uses.value = getRsp(response).data.items;
  } catch (err) {
    alert?.show("error", getErr(err));
  } finally {
    fiscal_uses_ldg.value = false;
  }
};

const update = async () => {
  const { valid } = await itemForm.value.validate();

  if (!valid) {
    alert?.show("error", "Revisa los detalles señalados");
    return;
  }

  const confirm = await confirm?.show("¿Confirma el cobro de la consulta?");
  if (!confirm) return;

  ldg.value = true;

  try {
    const obj = getObj(item.value, true);
    const response = await axios.post(
      `${URL_API}/${routeName}`,
      getFormData(obj),
      getHdrs(authStore.getAuth.token, true)
    );

    const rsp = getRsp(response);
    alert?.show("success", rsp.msg);
    router.push({ name: routeName });
  } catch (err) {
    alert?.show("error", getErr(err));
  } finally {
    ldg.value = false;
  }
};

onMounted(() => {
  getCatalogs();
  getItem();
});
</script>