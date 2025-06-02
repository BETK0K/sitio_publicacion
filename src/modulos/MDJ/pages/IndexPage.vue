<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
            <q-breadcrumbs-el icon="bar_chart" label="Numeralia" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <filtros v-if="$q.screen.xs" class="q-mb-md" :poderPostula="false" />
    <numeraliaComp />
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCandidatosStore } from 'src/stores/candidatos-store'
import filtros from '../../../components/filtrosComp.vue'

//---------------------------------------------------------------------------------

const candidatosStore = useCandidatosStore()

//---------------------------------------------------------------------------------

onMounted(() => {
  candidatosStore.actualizarMenu(true)
})

//---------------------------------------------------------------------------------
</script>
<style></style>
