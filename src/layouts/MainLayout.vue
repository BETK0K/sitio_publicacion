<template>
  <div class="selectable-text-area">
    <q-layout :view="$q.screen.xs ? 'hHh lpR lff' : 'hHh LpR fFf'">
      <q-header
        elevated
        :style="{
          backgroundColor:
            tab == 'inicio'
              ? '#634086'
              : tab == 'MSJ'
                ? '#ff9bb8'
                : tab == 'MDJ'
                  ? '#8bb8ee'
                  : tab == 'JUE'
                    ? '#d4e3be'
                    : '#634086',
          color: tab == 'JUE' ? '#000000' : '#ffffff',
        }"
        height-hint="150"
      >
        <q-toolbar class="bg-grey-3 text-black q-pa-sm" style="height: 88px">
          <!-- Imagen izquierda -->
          <q-toolbar-title
            shrink
            class="q-ma-none"
            style="width: 150px; padding: 8px"
            v-if="!$q.screen.xs && !$q.screen.sm"
          >
            <a href="https://ieenayarit.org/" target="_blank">
              <q-img src="../assets/IEEN300.png" contain></q-img>
            </a>
          </q-toolbar-title>

          <!-- Texto centrado -->
          <div class="column items-center justify-center col-grow" v-if="!$q.screen.xs">
            <div class="text-h6 text-bold text-grey-8 text-center">
              <b class="text-blue-pj">Cómputos Parciales y Estatal</b>
            </div>
            <div class="text-subtitle1 text-bold text-grey-8 text-center">
              Proceso Electoral Extraordinario del Poder Judicial de Nayarit
              <b class="text-blue-pj">2025</b>
            </div>
          </div>
          <div v-else>
            <div class="text-h6 text-bold text-grey-8" style="text-align: center">
              <b class="text-blue-pj" style="text-align: center">Cómputos Parciales y Estatal</b>
            </div>
            <div
              class="text-subtitle1 text-bold text-grey-8"
              style="text-align: center; font-size: 18px"
            >
              Proceso Electoral Extraordinario del Poder Judicial de Nayarit 2025
            </div>
          </div>

          <!-- Imagen derecha -->
          <q-toolbar-title
            shrink
            class="q-ma-none"
            style="width: 150px; padding: 29px"
            v-if="!$q.screen.xs && !$q.screen.sm"
          >
            <a href="https://ieenayarit.org/eleccion-poder-judicial" target="_blank">
              <q-img src="../assets/Eleccion.png" contain></q-img>
            </a>
          </q-toolbar-title>
        </q-toolbar>

        <q-toolbar>
          <div class="row">
            <q-btn
              v-if="isHomePage || $q.screen.xs"
              dense
              class="absolute-left"
              flat
              round
              icon="menu"
              @click="toggleLeftDrawer"
            />
            <!--  -----------------------HEADER TABS-------------------------->
            <div v-if="!$q.screen.xs" class="absolute-center col-lg-8 col-md-8 col-sm-8 col-xs-9">
              <q-tabs v-model="tab" inline-label>
                <q-tab
                  :to="{ name: 'inicio', params: { eleccion_Id: eleccion.id } }"
                  v-model="tab"
                  v-for="eleccion in list_Tipos_Poder"
                  inline-label
                  :key="eleccion.siglas"
                  :name="eleccion.siglas"
                  :icon="eleccion.nombre == 'inicio' ? 'home' : none"
                  :label="eleccion.label"
                  @click="isTabSelected(eleccion.siglas, eleccion.id)"
                  :style="{
                    backgroundColor:
                      tab == 'inicio'
                        ? '#634086'
                        : tab == 'MSJ'
                          ? '#ff9bb8'
                          : tab == 'MDJ'
                            ? '#8bb8ee'
                            : tab == 'JUE'
                              ? '#d4e3be'
                              : '#634086',
                    color: tab == 'JUE' ? '#000000' : '#ffffff',
                  }"
                />
              </q-tabs>
            </div>
            <!--------------------------HEADER ISSMALLSREEN-------------------------->
            <div class="absolute-center text-center" v-else>
              <strong
                style="font-size: 12px"
                @click="isTabSelected(eleccion.siglas, eleccion.id)"
                >{{
                  tab == 'MSJ'
                    ? 'MAGISTRATURAS DEL TRIBUNAL SUPERIOR DE JUSTICIA'
                    : tab == 'MDJ'
                      ? 'MAGISTRATURAS DEL TRIBUNAL DE DISCIPLINA JUDICIAL'
                      : tab == 'JUE'
                        ? 'JUEZAS Y JUECES'
                        : 'INICIO'
                }}</strong
              >
            </div>
            <!-- Para pantallas pequeñas -->
            <div v-if="$q.screen.xs || $q.screen.sm" class="absolute-right q-pa-xs">
              <q-btn flat @click="exportarBD()" round dense>
                <q-icon
                  name="fa-solid fa-database"
                  :style="{ color: tab !== 'JUE' ? '#ffffff' : '#000000' }"
                />
                <q-tooltip>Exportar base de datos</q-tooltip>
              </q-btn>
            </div>

            <!-- Para pantallas medianas y grandes -->
            <div
              v-if="!$q.screen.xs && !$q.screen.sm"
              class="absolute-right q-pa-xs"
              style="display: flex; align-items: center; font-weight: 700; gap: 8px"
            >
              Exportar base de datos

              <q-btn @click="exportarBD()" flat round dense>
                <q-icon name="fa-solid fa-database" :color="tab !== 'JUE' ? 'white' : 'black'" />
                <q-tooltip>Exportar base de datos</q-tooltip>
              </q-btn>
            </div>
          </div>
        </q-toolbar>
      </q-header>
      <q-drawer
        v-if="tab != 'inicio' || $q.screen.xs"
        show-if-above
        v-model="leftDrawerOpen"
        side="left"
        bordered
        :class="{
          'bg-grey-3': $q.screen.xs,
        }"
      >
        <q-scroll-area style="height: calc(100% - 150px); border-right: 1px solid #ddd">
          <!---------------------------DRAWER NORMAL--------------------------->
          <q-list v-if="!$q.screen.xs">
            <q-item>
              <q-item-section style="border-radius: 20px; margin-top: 33px">
                <q-item-label
                  class="text-h5 label-title text-bold q-pa-xs"
                  style="color: gray"
                  id="speak"
                  >Consulta de votación:
                </q-item-label>
                <div class="text-subtitle2 q-pa-xs" style="color: grey" id="speak">
                  Selecciona el reporte que deseas consultar:
                </div>
              </q-item-section>
            </q-item>
            <!---------------FILTERS--------------->
            <q-item>
              <q-item-section>
                <q-item-label class="text-purple-ieen label-title text-bold" id="speak">
                  Junta Auxiliar Operativa
                </q-item-label>
                <q-select
                  color="purple"
                  rounded
                  outlined
                  bg-color="grey-3"
                  v-model="junta"
                  :options="list_Oficinas"
                  dense
                  style="width: 265px"
                />
              </q-item-section>
            </q-item>

            <q-item v-if="junta != 'Todas'">
              <q-item-section>
                <q-item-label class="text-purple-ieen label-title text-bold" id="speak">
                  Municipio</q-item-label
                >
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
            <q-item v-if="municipio != 'Todos'">
              <q-item-section>
                <q-item-label class="text-purple-ieen label-title text-bold" id="speak"
                  >Sección</q-item-label
                >
                <q-select
                  dense
                  color="purple"
                  rounded
                  outlined
                  bg-color="grey-3"
                  v-model="seccion"
                  :options="list_Secciones_Filtrados"
                  hint="Seleccione una sección"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <!---------------------------DRAWER ISSMALLSCREEN--------------------------->
          <q-list v-else class="absolute">
            <div class="text-center q-pa-md">
              <!-- <q-img src="../assets/Conoceles_PJ.png"></q-img> -->
            </div>
            <q-item>
              <q-item-section>
                <q-btn
                  v-for="eleccion in list_Tipos_Poder"
                  :key="eleccion"
                  @click="isTabSelected(eleccion.siglas, eleccion.id)"
                  rounded
                  :label="eleccion.label"
                  :class="tab == eleccion.siglas ? 'bg-purple-pj text-white' : ''"
                  :style="{
                    backgroundColor:
                      tab === eleccion.siglas
                        ? '#634086'
                        : eleccion.siglas == 'inicio'
                          ? '#b281e3'
                          : eleccion.siglas == 'MSJ'
                            ? '#ff9bb8'
                            : eleccion.siglas == 'MDJ'
                              ? '#8bb8ee'
                              : eleccion.siglas == 'JUE'
                                ? '#d4e3be'
                                : '#634086',
                    color: eleccion.siglas == 'JUE' ? '#000000' : '#ffffff',
                    margin: '11px 0px 11px 0px',
                  }"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <div class="row justify-center" style="width: 100%; margin: 33px 0px 0px 0px">
            <div class="q-pr-sm">
              <q-btn
                v-if="!$q.screen.xs"
                dense
                @click="limpiarFiltros()"
                outline
                style="color: #634086"
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="cleaning_services" size="xs" />
                  <div class="text-center">Limpiar campos</div>
                </div>
              </q-btn>
            </div>
            <!-- <div>
              <q-btn @click="botonConsultar()" dense push class="bg-purple-pj" text-color="white">
                <div class="row items-center no-wrap">
                  <div class="text-center">Consultar</div>
                </div>
              </q-btn>
            </div> -->
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

      <!---------------------------FOOTER--------------------------->
      <q-footer
        elevated
        class="text-white"
        :style="{
          backgroundColor:
            tab == 'inicio'
              ? '#634086'
              : tab == 'MSJ'
                ? '#ff9bb8'
                : tab == 'MDJ'
                  ? '#8bb8ee'
                  : tab == 'JUE'
                    ? '#d4e3be'
                    : '#634086',
          color: tab == 'JUE' ? '#000000 !important' : '#ffffff !important',
        }"
      >
        <q-toolbar>
          <q-toolbar-title>
            <!--Accesibilidad Inicia-->
            <!-- <div
              style="
                display: flex;
                justify-content: flex-end;
                margin: 0px 60px 0px 0px;
                position: static;
                transition: all 0s ease 0s;
              "
            >
              <div class="container-voice">
                <input type="checkbox" id="btn-mas" />
                <q-tooltip
                  anchor="center right"
                  self="top left"
                  :offset="[10, 10]"
                  class="bg-purple text-body2"
                >
                  <strong>Lectura por Voz</strong>
                </q-tooltip>
                <div class="Acces-voz">
                  <button
                    id="activar-voz"
                    class="fa fa-eye desactivado activar-voz"
                    style="display: block"
                    onClick="openToastr('Lectura por Parrafos Activada')"
                  ></button>
                  <button
                    id="desactivar-voz"
                    class="fa fa-eye-slash activado"
                    style="display: none"
                    onClick="openToastr('Lectura por Parrafos Desactivada')"
                  ></button>
                </div>
                <div class="btn-mas">
                  <label for="btn-mas" class="fa fa-assistive-listening-systems"></label>
                </div>
              </div>
              <div id="toastr" class="toastr"></div>
            </div> -->
            <!--Accesibilidad Termina-->
            <div class="row">
              <div
                :class="
                  $q.screen.xs
                    ? 'col-12 text-subtitle2 text-center'
                    : 'col-lg-3 col-md-3 col-sm-12 col-xs-12 text-subtitle1'
                "
                id="speak"
                :style="{
                  display: $q.screen.xs ? 'grid' : 'flex',
                  placeItems: $q.screen.xs ? 'center' : null,
                  justifyContent: $q.screen.xs ? 'center' : 'flex-start',
                }"
              >
                &#169; 2025 Instituto Estatal Electoral de Nayarit
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center text-caption">
                <div>
                  <q-icon
                    name="home"
                    color="tab == 'JUE' ? '#000000 !important' : '#ffffff !important'"
                  /><span id="speak">Domicilio</span>
                </div>
                <span id="speak"
                  >Av. Country Club 13, Colonia Versalles, 63138, Tepic, Nayarit</span
                >
              </div>
              <div class="text-caption col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center">
                <div>
                  <q-icon
                    name="phone"
                    color="tab == 'JUE' ? '#000000 !important' : '#ffffff !important'"
                  />
                  <span id="speak">Teléfono</span>
                </div>
                <span id="speak">(311) - 210 - 3235 /36 /47</span>
              </div>
              <div
                v-if="!$q.screen.xs"
                class="absolute-right q-pa-xs"
                style="display: flex; place-items: center"
              >
                <q-btn
                  flat
                  round
                  dense
                  href="https://www.facebook.com/IEENayarit?mibextid=sCpJLy"
                  target="_blank"
                  style="padding: 8px"
                >
                  <i
                    class="fa-brands fa-square-facebook fa-2xl"
                    :style="{ color: tab == 'JUE' ? '#000000 !important' : '#ffffff !important' }"
                  ></i>
                </q-btn>
                <q-btn
                  flat
                  round
                  dense
                  href="https://www.youtube.com/@IEENayarit"
                  target="_blank"
                  style="padding: 8px; margin-right: 11px"
                >
                  <i
                    class="fa-brands fa-youtube fa-2xl"
                    :style="{ color: tab == 'JUE' ? '#000000 !important' : '#ffffff !important' }"
                  ></i>
                </q-btn>
              </div>
            </div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
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

//---------------------------------------------------------------------------------
const $q = useQuasar()
const router = useRouter()
const configuracionStore = useConfiguracionStore()
const candidatosStore = useCandidatosStore()

const { list_Tipos_Poder, list_Oficinas, list_Municipios, list_Secciones, list_Tipos_Elecciones } =
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
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = async () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
  // await cargarColor(tab_Id.value);
}

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

// const botonConsultar = async () => {
//   seccion.value = seccion.value
//   await candidatosStore.loadCandidatosBySeccion(seccion.value.id, tab_Id.value)
// }

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

const exportarBD = async () => {
  $q.loading.show({
    spinner: null,
    message: `<img src="${loadingGif}" style="width:333px; height:333px; opacity:.6;"><br>Espere un momento por favor...`,
    html: true,
    messageColor: 'black',
  })

  const result = await candidatosStore.loadZip()

  if (result.success) {
    const link = document.createElement('a')
    link.href = candidatosStore.documentoZip
    link.setAttribute('download', 'Votacion_Candidatos.zip')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(candidatosStore.documentoZip)
  } else {
    // Mostrar mensaje de error al usuario
    alert(result.data)
  }

  $q.loading.hide()
}
</script>

<style lang="scss">
.rosaColor {
  background-color: #ff9bb8;
}
.azulColor {
  background-color: #8bb8ee;
}
.verdeColor {
  background-color: #d4e3be;
}
.purpleColor {
  background-color: #634086;
}

.text-purple-pink {
  color: #af7ead;
}

.text-purple-pj {
  color: #634086;
}

.bg-purple-pj {
  background-color: #634086;
}

.bg-purple-pj-2 {
  background-color: #c282bf;
}

.bg-blue-pj-2 {
  background-color: #5791a4;
}

.bg-blue-pj-3 {
  background-color: #76c4de;
}

.bg-purple-pink {
  background-color: #af7ead;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-purple-ieen {
  color: #673e84 !important;
}

.bg-purple-ieen {
  background-color: #673e84 !important;
}
//#34344e
//#5E3686
.bg-pink-ieen {
  color: white;
  background: #d1308a !important;
}

.bg-pink-ieen-2 {
  background: #e97ebd !important;
}

.text-pink-ieen {
  background: #d1308a !important;
}

.text-purple-ieen-1 {
  color: #863399 !important;
}

.bg-purple-ieen-1 {
  background: #863399 !important;
}

.text-purple-ieen-2 {
  color: #a25eb5 !important;
}

.bg-purple-ieen-2 {
  background: #a25eb5 !important;
}

.text-purple-ieen-3 {
  color: #bb83ca !important;
}

.bg-purple-ieen-3 {
  background: #bb83ca !important;
}

.text-pink-ieen-1 {
  color: #b32572 !important;
}

.bg-pink-ieen-1 {
  background: #b32572 !important;
}

.text-pink-ieen-2 {
  color: #cc5599 !important;
}

.bg-pink-ieen-2 {
  background: #cc5599 !important;
}

.text-pink-ieen-3 {
  color: #dd85ba !important;
}

.bg-pink-ieen-3 {
  color: white;
  background: #dd85ba !important;
}

.text-gray-ieen-1 {
  color: #76777a !important;
}

.bg-gray-ieen-1 {
  background: #76777a !important;
}

.text-gray-ieen-2 {
  color: #98989a !important;
}

.bg-gray-ieen-2 {
  background: #98989a !important;
}

.text-gray-ieen-3 {
  color: #b1b1b1 !important;
}

.bg-gray-ieen-3 {
  background: #b1b1b1 !important;
}

.text-pink-conoceles {
  color: #d1308a !important;
}

.text-purple-pj {
  color: #634086 !important;
}

.text-blue-pj {
  color: #5791a4 !important;
}
.sticky {
  position: sticky;
}

/*ACCESIBILIDAD*/
/*BOTONES*/

.btn2 {
  width: 30px;
  height: 30px;
  color: #673e84;
  background-color: #fff;
  cursor: pointer;
  border: 2px solid #673e84;
  border-radius: 30%;
  display: inline;
  z-index: 10;
  margin-left: 10px;
}

.btn2:hover {
  color: #fff;
  background-color: #673e84;
}

.btn2 i {
  pointer-events: none;
  display: block;
  font-size: 20px;
}

.btn3 {
  display: none;
}

#btnVoz {
  color: #673e84;
  background-color: #fff;
  cursor: pointer;
  border: 2px solid #673e84;
  position: absolute;
  transition:
    color 0.2s,
    background-color 0.2s ease-in-out;
}

.btnEntrance {
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-name: btnEntrance;
}

/*BOTONES ACTIVAR-DESACTIVAR*/

#btn-mas {
  display: none;
}

.container-voice {
  position: fixed;
  bottom: 64px;
  margin-left: 4px;
}

.Acces-voz button,
.btn-mas label {
  text-decoration: none;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  transition: all 500ms ease;
}

.Acces-voz button:hover {
  background: #fff;
  color: #673e84;
}

.Acces-voz button {
  margin-bottom: -16px;
  opacity: 0;
  visibility: hidden;
}

#btn-mas:checked ~ .Acces-voz button {
  margin-bottom: 8px;
  opacity: 1;
  visibility: visible;
}

.btn-mas label {
  cursor: pointer;
  background: #673e84;
  color: #fff;
  font-size: 20px;
}

#btn-mas:checked ~ .btn-mas label {
  transform: rotate(360deg);
  font-size: 18px;
}

.activado {
  background: #76777a;
  color: #fff;
}

.desactivado {
  background: #673e84;
  color: #fff;
}

/*ALERTA ACTIVADO-DESACTIVADO*/

.toastr {
  position: fixed;
  bottom: 244px;
  left: 10px;
  display: none;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
  line-height: 40px;
  margin-left: 10px;
  float: left;
  background: #fff;
  border: 2px solid #c80096;
  font-family:
    Century Gothic,
    sans-serif;
  color: #673e84;
  font-weight: bold;
  margin: 3px;
}

/*BOTON SELECCIONAR TEXTO*/

.seleccionar-texto {
  width: 40px;
  height: 40px;
  font-size: 24px;
  color: #673e84;
  background-color: #fff;
  cursor: pointer;
  border: 2px solid #c80096;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 12;
  display: none;
  transition:
    color 0.2s,
    background-color 0.2s ease-in-out;
}

.seleccionar-texto:hover {
  color: #fff;
  background-color: #c80096;
}

.seleccionar-texto i {
  pointer-events: none;
}

.btnEntrance {
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-name: btnEntrance;
}

.custom-select .q-field__control {
  text-overflow: ellipsis; /* Agrega puntos suspensivos si el texto es demasiado largo */
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
  overflow: hidden; /* Oculta el texto que excede el ancho del contenedor */
}

.custom-select .q-item__label {
  text-overflow: ellipsis; /* Agrega puntos suspensivos en las opciones */
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
  overflow: hidden; /* Oculta el texto que excede el ancho del contenedor */
}

@keyframes btnEntrance {
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}

@media screen and (max-width: 992px) {
  .container-voice {
    left: 2px;
    z-index: 2;
  }

  .toastr {
    z-index: 3;
  }
}
</style>
