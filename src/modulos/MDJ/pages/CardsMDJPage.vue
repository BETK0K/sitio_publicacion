<template>
  <q-page padding>
    <div class="row" style="justify-content: center; margin-bottom: 11px">
      <q-card class="ultra-compact-card q-pa-sm" v-if="list_Candidatos_Judicial.length > 0">
        <div class="row items-center no-wrap">
          <div class="text-caption text-bold q-mr-sm">Último corte:</div>
          <div class="text-caption text-bold q-mr-sm">{{ fecha_Corte.fecha }}</div>
          <div class="tiny-text q-mr-xs">{{ fecha_Corte.zona }}</div>
          <div class="text-caption text-bold">18:30 h UTC-7</div>
        </div>
      </q-card>
    </div>
    <filtros v-if="$q.screen.xs" class="q-mb-md" :poderPostula="true" />
    <cardsComp :eleccion_Id="props.eleccion_Id" :eleccion="'MDJ'" />
  </q-page>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { defineProps } from 'vue'
import filtros from '../../../components/filtrosComp.vue'
import cardsComp from 'src/components/cardsComp.vue'
import { useConfiguracionStore } from 'src/stores/configuracion-store'
import { useCandidatosStore } from 'src/stores/candidatos-store'

const candidatosStore = useCandidatosStore()
const { list_Candidatos_Judicial } = storeToRefs(candidatosStore)

//---------------------------------------------------------------------------------

const props = defineProps({
  eleccion_Id: { type: String, required: true },
})

//---------------------------------------------------------------------------------

const configuracionStore = useConfiguracionStore()
const { fecha_Corte } = storeToRefs(configuracionStore)
</script>

<style>
.ultra-compact-card {
  max-width: fit-content;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 12px;
  line-height: 1.2;
  display: inline-block;
}

.tiny-text {
  font-size: 11px;
  color: #666;
}

.border-right {
  border-right: 1px solid #ccc;
  padding-right: 8px;
}

.pr-sm {
  padding-right: 8px;
}

.pl-sm {
  padding-left: 8px;
}
</style>
