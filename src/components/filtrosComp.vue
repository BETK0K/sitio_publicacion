<template>
  <div v-if="$q.screen.xs" class="bg-grey-2" style="border-radius: 20px">
    <div class="text-h6 q-pl-md text-bold" style="color: grey">Consulta de votación:</div>
    <div class="subtitule-2 q-pl-md" style="color: grey">
      Selecciona el reporte que deseas consultar:
    </div>

    <!--------------------FILTROS PARA SMALLSCREEN----------------------------->
    <q-list v-if="!isDetallePage" dark bordered class="rounded-borders">
      <q-expansion-item
        icon="manage_search"
        expand-icon-class="text-purple-9"
        label="Seleccionar filtros de consulta"
        header-class="text-purple-9"
      >
        <q-card class="">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label class="label-title text-bold text-black">
                  Junta Auxiliar Operativa
                </q-item-label>
                <q-select
                  dense
                  color="purple"
                  rounded
                  outlined
                  bg-color="grey-3"
                  v-model="junta"
                  :options="list_Oficinas"
                  style="width: 100%"
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="label-title text-bold text-black"> Municipio </q-item-label>
                <q-select
                  dense
                  color="purple"
                  rounded
                  outlined
                  bg-color="grey-3"
                  v-model="municipio"
                  :options="list_Municipios_Filtrados"
                />
              </q-item-section>
            </q-item>

            <q-item :content-inset-level="2" :header-inset-level="2">
              <q-item-section>
                <q-item-label class="label-title text-bold text-black">Sección</q-item-label>
                <q-select
                  dense
                  color="purple"
                  rounded
                  outlined
                  bg-color="grey-3"
                  v-model="seccion"
                  :options="list_Secciones_Filtrados"
                />
              </q-item-section>
            </q-item>

            <div class="flex-center row">
              <div class="q-pr-xs">
                <q-btn
                  icon="cleaning_services"
                  size="sm"
                  @click="limpiarFiltros(true)"
                  outline
                  label="Limpiar campos"
                  style="color: #795177"
                />
              </div>
              <!-- <div class="q-pr-xs">
                <q-btn
                  size="sm"
                  icon="search"
                  @click="botonConsultar()"
                  push
                  label="Consultar"
                  class="bg-purple-pj text-white"
                />
              </div> -->
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useConfiguracionStore } from 'src/stores/configuracion-store'
import { useCandidatosStore } from 'src/stores/candidatos-store'
import loadingGif from '../assets/PEEPJ.gif'

const $q = useQuasar()
const router = useRouter()
const configuracionStore = useConfiguracionStore()
const candidatosStore = useCandidatosStore()

const { list_Oficinas, list_Municipios, list_Secciones, list_Tipos_Elecciones } =
  storeToRefs(configuracionStore)

const {
  junta,
  municipio,
  seccion,
  list_Candidatos_Judicial,
  list_Tradicional,
  list_Acusatorio,
  list_Penal,
  list_Laboral,
} = storeToRefs(candidatosStore)

const tab = ref('inicio')
const tab_Id = ref(null)
const nombre = ref(null)

const isCandidatos = ref(false)
const list_Municipios_Filtrados = ref([])
const list_Secciones_Filtrados = ref([])

watch(junta, async (val) => {
  if (val != 'Todas') {
    $q.loading.show({
      spinner: null,
      message: `<img src="${loadingGif}" style="width:333px; height:333px; opacity:.6;"><br>Espere un momento por favor...`,
      html: true,
      messageColor: 'black',
    })
    try {
      list_Municipios_Filtrados.value = list_Municipios.value.filter((x) => x.region === val.region)
      await configuracionStore.loadHoraCorte()
      await candidatosStore.loadCandidatosJudicialByJunta(tab_Id.value, junta.value.id)
      await candidatosStore.loadInformacion(tab_Id.value)
      await candidatosStore.loadInformacionJAO(tab_Id.value, junta.value.id)
      municipio.value = 'Todos'
      list_Tradicional.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 3)
      list_Acusatorio.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 4)
      list_Penal.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 5)
      list_Laboral.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 6)
    } catch (error) {
      console.error('Error al cargar candidatos:', error)
    } finally {
      $q.loading.hide()
    }
  }
})

watch(municipio, async (val) => {
  if (val != 'Todos') {
    $q.loading.show({
      spinner: null,
      message: `<img src="${loadingGif}" style="width:333px; height:333px; opacity:.6;"><br>Espere un momento por favor...`,
      html: true,
      messageColor: 'black',
    })
    try {
      seccion.value = null
      list_Secciones_Filtrados.value = list_Secciones.value.filter(
        (x) => x.municipio_Id == municipio.value.id || x.municipio_Id == 0,
      )
      await configuracionStore.loadHoraCorte()
      await candidatosStore.loadCandidatosJudicialByMunicipio(tab_Id.value, municipio.value.id)
      await candidatosStore.loadInformacion(tab_Id.value)
      await candidatosStore.loadInformacionMunicipio(tab_Id.value, municipio.value.id)
      list_Tradicional.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 3)
      list_Acusatorio.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 4)
      list_Penal.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 5)
      list_Laboral.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 6)
    } catch (error) {
      console.error('Error al cargar candidatos:', error)
    } finally {
      $q.loading.hide()
    }
  }
})

watch(seccion, async (val) => {
  if (val != null) {
    $q.loading.show({
      spinner: null,
      message: `<img src="${loadingGif}" style="width:333px; height:333px; opacity:.6;"><br>Espere un momento por favor...`,
      html: true,
      messageColor: 'black',
    })
    try {
      await configuracionStore.loadHoraCorte()
      await candidatosStore.loadInformacion(tab_Id.value)
      if (val.municipio_Id == 0) {
        await candidatosStore.loadCandidatosBySeccionesMunicipio(municipio.value.id, tab_Id.value)
      } else {
        await candidatosStore.loadCandidatosBySeccion(seccion.value.id, tab_Id.value)
      }
    } catch (error) {
      console.error('Error al cargar candidatos:', error)
    } finally {
      $q.loading.hide()
    }
  }
})

onBeforeMount(async () => {
  await configuracionStore.loadOficinas()
  await configuracionStore.loadMunicipios()
  await configuracionStore.loadSecciones()
  await configuracionStore.loadTipoElecciones()
  await configuracionStore.loadHoraCorte()

  list_Municipios_Filtrados.value = list_Municipios.value
  list_Secciones_Filtrados.value = list_Secciones.value
  list_Tipos_Elecciones.value = list_Tipos_Elecciones.value.filter((x) => x.nombre.includes('Jue'))
  const currentRoute = router.currentRoute.value

  const param = currentRoute.params.eleccion_Id
  if (tab.value == '') {
    if (param != undefined) {
      if (param == 1) {
        isTabSelected('MSJcards', param)
        tab.value = 'MSJ'
      } else if (param == 2) {
        isTabSelected('MDJcards', param)
        tab.value = 'MDJ'
      } else if (param == 3) {
        isTabSelected('JUEcards', param)
        tab.value = 'JUE'
      } else {
        tab.value = 'inicio'
        nombre.value = 'inicio'
      }
    } else {
      tab.value = 'inicio'
      router.push({
        name: 'inicio',
      })
    }
  }
  limpiarFiltros()
  cargarData()
})

// const botonConsultar = async () => {
//   if (seccion.value != null) {
//     seccion.value = seccion
//     await candidatosStore.loadCandidatosBySeccion(seccion.value, tab_Id.value)
//   }
// }

const isTabSelected = async (nombre, id) => {
  tab.value = nombre
  tab_Id.value = id
  await cargar(id, tab.value, nombre)

  isCandidatos.value = true
  limpiarFiltros()
  junta.value = 'Todas'
  municipio.value = 'Todos'
  candidatosStore.actualizarButtonColor(true)
  router.push({
    name: `${tab.value}cards`,
    params: { eleccion_Id: tab_Id.value },
  })
}

const limpiarFiltros = async () => {
  junta.value = 'Todas'
  municipio.value = 'Todos'
  seccion.value = null
}

const cargarData = async () => {
  limpiarFiltros()
}

const cargar = async (val, tab, nombre) => {
  if (tab != 'inicio') {
    await router.push({
      name: nombre,
      params: { eleccion_Id: val },
    })
  } else {
    await router.push({
      name: 'inicio',
    })
  }
}
</script>

<style></style>
