<template>
  <!---------------------------BANNER--------------------------->
  <banner>
    <template v-slot:icono>
      <q-icon name="badge" color="purple-ieen" />
    </template>
  </banner>
  <!---------------------------CARDS--------------------------->
  <template v-if="list_Candidatos_Judicial.length == 0"
    ><div
      :class="
        $q.screen.xs ? 'flex-center text-h6 text-grey-8' : 'absolute-center text-h6 text-grey-8'
      "
    >
      <span id="speak">No hay información con los filtros seleccionados...</span>
    </div>
  </template>
  <template v-else-if="list_Candidatos_Judicial.length >= 0">
    <div class="row q-col-gutter-md" style="margin: 0px 0px 20px 0px">
      <div class="col-12 col-sm-4">
        <q-card style="border-radius: 10px">
          <q-card-section
            class="q-pa-sm"
            :class="
              propss.eleccion_Id == '1'
                ? 'color-1 text-white text-bold'
                : propss.eleccion_Id == '2'
                  ? 'color-2 text-white text-bold'
                  : 'color-3 text-black text-bold'
            "
          >
            <div class="text-h6 text-center text-bold">Resumen de la votación a Nivel Estatal</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <div class="row q-mb-sm">
              <div class="col text-subtitle1 text-bold text-center" style="place-content: center">
                Votos candidaturas:
              </div>
              <div class="col text-subtitle1 text-bold text-center" style="place-content: center">
                Votos nulos:
              </div>
              <div class="col text-subtitle1 text-bold text-center" style="place-content: center">
                Total de votos:
              </div>
            </div>

            <div class="row q-mb-sm">
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h3 text-bold text-center'
                "
                style="color: #634086"
              >
                {{ Number(informacion.votos_Candidatura || 0).toLocaleString('es-MX') }}
              </div>
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h3 text-bold text-center'
                "
                style="color: #634086"
              >
                {{ Number(informacion.votos_Nulos || 0).toLocaleString('es-MX') }}
              </div>
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h3 text-bold text-center'
                "
                style="color: #634086"
              >
                {{ Number(informacion.total || 0).toLocaleString('es-MX') }}
              </div>
            </div>
            <div class="row q-mb-sm">
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h6 text-bold text-center'
                "
                style="color: #634086"
              >
                {{
                  informacion.total
                    ? ((informacion.votos_Candidatura / informacion.total) * 100).toFixed(4)
                    : '0.0000'
                }}%
              </div>
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h6 text-bold text-center'
                "
                style="color: #634086"
              >
                {{
                  informacion.votos_Nulos
                    ? ((informacion.votos_Nulos / informacion.total) * 100).toFixed(4)
                    : '0.0000'
                }}%
              </div>
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h6 text-bold text-center'
                "
                style="color: #634086"
              >
                100.0000%
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card style="border-radius: 10px">
          <q-card-section
            class="q-pa-sm"
            :class="
              propss.eleccion_Id == '1'
                ? 'color-1 text-white text-bold'
                : propss.eleccion_Id == '2'
                  ? 'color-2 text-white text-bold'
                  : 'color-3 text-black text-bold'
            "
          >
            <div class="text-h6 text-center text-bold">
              Avance de Casillas Computadas a Nivel Estatal
            </div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <div class="row justify-around items-center q-mb-sm">
              <div class="text-subtitle1 text-bold">
                Casillas Computadas:
                {{ Number(informacion.casillas_Computadas || 0).toLocaleString('es-MX') }}
              </div>
              <div class="text-subtitle1 text-bold">
                Casillas Esperadas:
                {{ Number(informacion.casillas_Esperadas || 0).toLocaleString('es-MX') }}
              </div>
            </div>
            <div class="text-h6 text-center text-bold text-black">
              <q-linear-progress
                dark
                stripe
                rounded
                size="46px"
                :value="informacion.avance"
                :class="
                  propss.eleccion_Id == '1'
                    ? 'color-A1'
                    : propss.eleccion_Id == '2'
                      ? 'color-A2'
                      : 'color-A3'
                "
              />
            </div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <div class="row justify-around items-center q-mb-sm">
              <div class="text-subtitle1 text-bold">
                Avance:
                {{ informacion.avance != null ? (informacion.avance * 100).toFixed(4) : '0%' }}%
              </div>
              <div class="text-subtitle1 text-bold">
                Restante:
                {{
                  informacion.avance != null ? ((1 - informacion.avance) * 100).toFixed(4) : '0%'
                }}%
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card style="border-radius: 10px">
          <q-card-section
            class="q-pa-sm"
            :class="
              propss.eleccion_Id == '1'
                ? 'color-1 text-white text-bold'
                : propss.eleccion_Id == '2'
                  ? 'color-2 text-white text-bold'
                  : 'color-3 text-black text-bold'
            "
          >
            <div class="text-h6 text-center text-bold">Participación Computada a Nivel Estatal</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <div class="row q-mb-sm">
              <div class="col text-subtitle1 text-bold text-center" style="place-content: center">
                Participación ciudadana:
              </div>
              <div class="col text-subtitle1 text-bold text-center" style="place-content: center">
                Lista Nominal:
              </div>
            </div>

            <div class="row q-mb-sm">
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h3 text-bold text-center'
                "
                style="color: #634086"
              >
                {{ Number(informacion.participacion || 0).toLocaleString('es-MX') }}
              </div>
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h3 text-bold text-center'
                "
                style="color: #634086"
              >
                {{ Number(informacion.lista_Nominal || 0).toLocaleString('es-MX') }}
              </div>
            </div>
            <div class="row q-mb-sm">
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h6 text-bold text-center'
                "
                style="color: #634086"
              >
                {{
                  informacion.porcentaje_Participacion !== undefined
                    ? (informacion.porcentaje_Participacion * 100).toFixed(4)
                    : '0.0000'
                }}%
              </div>
              <div
                :class="
                  $q.screen.xs ? 'col text-bold text-center' : 'col text-h6 text-bold text-center'
                "
                style="color: #634086"
              >
                100.0000%
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="q-pt-lg" v-if="seccion == null">
      <div v-if="!$q.screen.xs" style="margin: 0px 0px 20px; display: flex; place-items: center">
        <div class="row items-center justify-between q-mb-md" style="width: 100%">
          <!-- IZQUIERDA -->
          <div class="col-auto text-left" style="font-size: 33px; color: #634086; font-weight: 600">
            Estatal
            {{
              junta != 'Todas'
                ? ' / ' + ('JAO ' + junta.no_Oficina + junta.nombre.replace('JAO ', ' '))
                : ''
            }}
            {{ municipio != 'Todos' ? ' / ' + municipio.nombre : '' }}
            {{ seccion != null ? ' / ' + seccion.nombre : '' }}
          </div>

          <!-- DERECHA -->
          <div class="col-auto text-right" v-if="seccion == null">
            Poder que postula:
            <q-chip>
              <q-avatar square size="sm" color="black" text-color="white">PE</q-avatar>
              Poder Ejecutivo
            </q-chip>
            <q-chip>
              <q-avatar square size="sm" color="black" text-color="white">PL</q-avatar>
              Poder Legislativo
            </q-chip>
            <q-chip>
              <q-avatar square size="sm" color="black" text-color="white">PJ</q-avatar>
              Poder Judicial
            </q-chip>
            <q-chip>
              <q-avatar square size="sm" color="black" text-color="white">EF</q-avatar>
              En funciones
            </q-chip>
          </div>
        </div>
      </div>
      <div v-if="propss.eleccion_Id != 3">
        <q-table
          :rows="list_Candidatos_Judicial"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="{ rowsPerPage: 0 }"
          :rows-per-page-options="[10, 15, 20, 25, 30, 50]"
          hide-bottom
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-center">
                <div v-if="col.name === 'no_Formula'">
                  {{ col.label }}
                  <q-badge
                    align="middle"
                    :class="
                      propss.eleccion_Id == '1'
                        ? 'color-1 text-white text-bold'
                        : propss.eleccion_Id == '2'
                          ? 'color-2 text-white text-bold'
                          : 'color-3 text-black text-bold'
                    "
                    style="font-size: large"
                  >
                    {{
                      propss.eleccion_Id == '1'
                        ? 'ROSA'
                        : propss.eleccion_Id == '2'
                          ? 'AZUL'
                          : 'VERDE'
                    }}
                  </q-badge>
                </div>
                <div v-else>
                  {{ col.label }}
                </div>
              </q-th>
            </q-tr>
          </template>

          <!-- FOTO -->
          <template v-slot:body-cell-fotografia_URL="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <q-avatar v-if="props.row.fotografia_URL" size="85px">
                <q-img :src="props.row.fotografia_URL" />
              </q-avatar>
              <q-avatar size="85px" v-else>
                <q-img v-if="props.row.sexo === 'Femenino'" src="../assets/avatarmujer.jpg" />
                <q-img v-if="props.row.sexo === 'Masculino'" src="../assets/avatarHombre.jpg" />
              </q-avatar>
            </q-td>
          </template>

          <!-- VOTOS -->
          <template v-slot:body-cell-votos="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ Number(props.row.votos || 0).toLocaleString('es-MX') }}
            </q-td>
          </template>

          <!-- PORCENTAJE -->
          <template v-slot:body-cell-porcentaje="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{
                props.row?.porcentaje !== undefined
                  ? (props.row.porcentaje * 100).toFixed(4) + '%'
                  : ''
              }}
            </q-td>
          </template>

          <!-- PODER POSTULANTE -->
          <template v-slot:body-cell-poder_Postulante="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <div class="q-gutter-xs flex justify-center">
                <q-avatar
                  v-for="poder in props.row.poder_Postulante.split('|')"
                  :key="poder"
                  square
                  size="sm"
                  color="black"
                  text-color="white"
                >
                  {{ poder.trim().split(':')[0] }}
                </q-avatar>
              </div>
            </q-td>
          </template>

          <!-- NO FORMULA -->
          <template v-slot:body-cell-no_Formula="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ props.row.no_Formula }}
            </q-td>
          </template>
        </q-table>
        <div
          class="row q-col-gutter-md"
          style="margin: 0px 0px 20px 0px"
          v-if="junta != 'Todas' || municipio != 'Todos'"
        >
          <div class="col-12 col-sm-4">
            <q-card style="border-radius: 10px">
              <q-card-section
                class="q-pa-sm"
                :class="
                  propss.eleccion_Id == '1'
                    ? 'color-1 text-white text-bold'
                    : propss.eleccion_Id == '2'
                      ? 'color-2 text-white text-bold'
                      : 'color-3 text-black text-bold'
                "
              >
                <div class="text-h6 text-center text-bold" style="font-size: 14px">
                  {{
                    junta != 'Todas' && municipio == 'Todos'
                      ? 'Resumen de la Votación de la ' +
                        ('JAO ' + junta.no_Oficina + junta.nombre.replace('JAO ', ' '))
                      : municipio != 'Todos'
                        ? 'Resumen de la Votación del Municipio de ' + municipio.nombre
                        : 'Resumen de la Votación'
                  }}
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row q-mb-sm">
                  <div
                    class="col text-subtitle1 text-bold text-center"
                    style="place-content: center"
                  >
                    Votos candidaturas:
                  </div>
                  <div
                    class="col text-subtitle1 text-bold text-center"
                    style="place-content: center"
                  >
                    Votos nulos:
                  </div>
                  <div
                    class="col text-subtitle1 text-bold text-center"
                    style="place-content: center"
                  >
                    Total de votos:
                  </div>
                </div>
                <div class="row q-mb-sm">
                  <div class="col text-h6 text-bold text-center" style="color: #634086">
                    {{ Number(informacion_JAO_MUN.votos_Candidatura || 0).toLocaleString('es-MX') }}
                  </div>
                  <div class="col text-h6 text-bold text-center" style="color: #634086">
                    {{ Number(informacion_JAO_MUN.votos_Nulos || 0).toLocaleString('es-MX') }}
                  </div>
                  <div class="col text-h6 text-bold text-center" style="color: #634086">
                    {{ Number(informacion_JAO_MUN.total || 0).toLocaleString('es-MX') }}
                  </div>
                </div>
                <div class="row q-mb-sm">
                  <div class="col text-h6 text-bold text-center" style="color: #634086">
                    {{
                      informacion_JAO_MUN.total
                        ? (
                            (informacion_JAO_MUN.votos_Candidatura / informacion_JAO_MUN.total) *
                            100
                          ).toFixed(4)
                        : '0.0000'
                    }}%
                  </div>
                  <div class="col text-h6 text-bold text-center" style="color: #634086">
                    {{
                      informacion_JAO_MUN.votos_Nulos
                        ? (
                            (informacion_JAO_MUN.votos_Nulos / informacion_JAO_MUN.total) *
                            100
                          ).toFixed(4)
                        : '0.0000'
                    }}%
                  </div>
                  <div class="col text-h6 text-bold text-center" style="color: #634086">
                    100.0000%
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card style="border-radius: 10px">
              <q-card-section
                class="q-pa-sm"
                :class="
                  propss.eleccion_Id == '1'
                    ? 'color-1 text-white text-bold'
                    : propss.eleccion_Id == '2'
                      ? 'color-2 text-white text-bold'
                      : 'color-3 text-black text-bold'
                "
              >
                <div class="text-h6 text-center text-bold" style="font-size: 14px">
                  {{
                    junta != 'Todas' && municipio == 'Todos'
                      ? 'Avance de Casillas Computadas de la ' +
                        ('JAO ' + junta.no_Oficina + junta.nombre.replace('JAO ', ' '))
                      : municipio != 'Todos'
                        ? 'Avance de Casillas Computadas del Municipio de ' + municipio.nombre
                        : 'Avance de Casillas Computadas'
                  }}
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row justify-around items-center q-mb-sm">
                  <div class="text-subtitle1 text-bold">
                    Casillas Computadas:
                    {{
                      Number(informacion_JAO_MUN.casillas_Computadas || 0).toLocaleString('es-MX')
                    }}
                  </div>
                  <div class="text-subtitle1 text-bold">
                    Casillas Esperadas:
                    {{
                      Number(informacion_JAO_MUN.casillas_Esperadas || 0).toLocaleString('es-MX')
                    }}
                  </div>
                </div>
                <div class="text-h6 text-center text-bold text-black">
                  <q-linear-progress
                    dark
                    stripe
                    rounded
                    size="46px"
                    :value="informacion_JAO_MUN.avance"
                    :class="
                      propss.eleccion_Id == '1'
                        ? 'color-A1'
                        : propss.eleccion_Id == '2'
                          ? 'color-A2'
                          : 'color-A3'
                    "
                  />
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row justify-around items-center q-mb-sm">
                  <div class="text-subtitle1 text-bold">
                    Avance:
                    {{
                      informacion_JAO_MUN.avance != null
                        ? (informacion_JAO_MUN.avance * 100).toFixed(4)
                        : '0%'
                    }}%
                  </div>
                  <div class="text-subtitle1 text-bold">
                    Restante:
                    {{
                      informacion_JAO_MUN.avance != null
                        ? ((1 - informacion_JAO_MUN.avance) * 100).toFixed(4)
                        : '0%'
                    }}%
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card style="border-radius: 10px">
              <q-card-section
                class="q-pa-sm"
                :class="
                  propss.eleccion_Id == '1'
                    ? 'color-1 text-white text-bold'
                    : propss.eleccion_Id == '2'
                      ? 'color-2 text-white text-bold'
                      : 'color-3 text-black text-bold'
                "
              >
                <div class="text-h6 text-center text-bold" style="font-size: 14px">
                  {{
                    junta != 'Todas' && municipio == 'Todos'
                      ? 'Resumen de la Participación Computada de la ' +
                        ('JAO ' + junta.no_Oficina + junta.nombre.replace('JAO ', ' '))
                      : municipio != 'Todos'
                        ? 'Resumen de la Participación Computada del Municipio de ' +
                          municipio.nombre
                        : 'Resumen de la Participación Computada'
                  }}
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row q-mb-sm">
                  <div
                    class="col text-subtitle1 text-bold text-center"
                    style="place-content: center"
                  >
                    Participación ciudadana:
                  </div>
                  <div
                    class="col text-subtitle1 text-bold text-center"
                    style="place-content: center"
                  >
                    Lista Nominal:
                  </div>
                </div>

                <div class="row q-mb-sm">
                  <div class="col text-h6 text-bold text-center" style="color: #634086">
                    {{ Number(informacion_JAO_MUN.participacion || 0).toLocaleString('es-MX') }}
                  </div>
                  <div class="col text-h6 text-bold text-center" style="color: #634086">
                    {{ Number(informacion_JAO_MUN.lista_Nominal || 0).toLocaleString('es-MX') }}
                  </div>
                </div>
                <div class="row q-mb-sm">
                  <div class="col text-h6 text-bold text-center" style="color: #634086">
                    {{
                      informacion_JAO_MUN.porcentaje_Participacion !== undefined
                        ? (informacion_JAO_MUN.porcentaje_Participacion * 100).toFixed(4)
                        : '0.0000'
                    }}%
                  </div>
                  <div class="col text-h6 text-bold text-center" style="color: #634086">100%</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="col-12 col-sm-6">
          <q-card style="border-radius: 10px">
            <q-card-section
              class="q-pa-sm text-white text-bold"
              style="background-color: #c4c5ba; margin: 11px 0px 33px 0px"
            >
              <div class="text-h6 text-center text-bold">SISTEMA TRADICIONAL</div>
            </q-card-section>
          </q-card>
        </div>
        <q-table
          :rows="list_Tradicional"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="{ rowsPerPage: 0 }"
          :rows-per-page-options="[10, 15, 20, 25, 30, 50]"
          hide-bottom
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-center">
                <div v-if="col.name === 'no_Formula'">
                  {{ col.label }}
                  <q-badge
                    align="middle"
                    :class="
                      propss.eleccion_Id == '1'
                        ? 'color-1 text-white text-bold'
                        : propss.eleccion_Id == '2'
                          ? 'color-2 text-white text-bold'
                          : 'color-3 text-black text-bold'
                    "
                    style="font-size: large"
                  >
                    {{
                      propss.eleccion_Id == '1'
                        ? 'ROSA'
                        : propss.eleccion_Id == '2'
                          ? 'AZUL'
                          : 'VERDE'
                    }}
                  </q-badge>
                </div>
                <div v-else>
                  {{ col.label }}
                </div>
              </q-th>
            </q-tr>
          </template>
          <!-- FOTO -->
          <template v-slot:body-cell-fotografia_URL="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <q-avatar v-if="props.row.fotografia_URL" size="85px">
                <q-img :src="props.row.fotografia_URL" />
              </q-avatar>
              <q-avatar size="85px" v-else>
                <q-img v-if="props.row.sexo === 'Femenino'" src="../assets/avatarmujer.jpg" />
                <q-img v-if="props.row.sexo === 'Masculino'" src="../assets/avatarHombre.jpg" />
              </q-avatar>
            </q-td>
          </template>

          <!-- VOTOS -->
          <template v-slot:body-cell-votos="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ Number(props.row.votos || 0).toLocaleString('es-MX') }}
            </q-td>
          </template>

          <!-- PORCENTAJE -->
          <template v-slot:body-cell-porcentaje="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{
                props.row?.porcentaje !== undefined
                  ? (props.row.porcentaje * 100).toFixed(4) + '%'
                  : ''
              }}
            </q-td>
          </template>

          <!-- PODER POSTULANTE -->
          <template v-slot:body-cell-poder_Postulante="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <div class="q-gutter-xs flex justify-center">
                <q-avatar
                  v-for="poder in props.row.poder_Postulante.split('|')"
                  :key="poder"
                  square
                  size="sm"
                  color="black"
                  text-color="white"
                >
                  {{ poder.trim().split(':')[0] }}
                </q-avatar>
              </div>
            </q-td>
          </template>

          <!-- NO FORMULA -->
          <template v-slot:body-cell-no_Formula="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ props.row.no_Formula }}
            </q-td>
          </template>
        </q-table>
        <div class="col-12 col-sm-6">
          <q-card style="border-radius: 10px">
            <q-card-section
              class="q-pa-sm text-white text-bold"
              style="background-color: #e9d0d9; margin: 33px 0px 22px"
            >
              <div class="text-h6 text-center text-bold">SISTEMA PENAL ACUSATORIO Y ORAL</div>
            </q-card-section>
          </q-card>
        </div>
        <q-table
          :rows="list_Acusatorio"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="{ rowsPerPage: 0 }"
          :rows-per-page-options="[10, 15, 20, 25, 30, 50]"
          hide-bottom
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-center">
                <div v-if="col.name === 'no_Formula'">
                  {{ col.label }}
                  <q-badge
                    align="middle"
                    :class="
                      propss.eleccion_Id == '1'
                        ? 'color-1 text-white text-bold'
                        : propss.eleccion_Id == '2'
                          ? 'color-2 text-white text-bold'
                          : 'color-3 text-black text-bold'
                    "
                    style="font-size: large"
                  >
                    {{
                      propss.eleccion_Id == '1'
                        ? 'ROSA'
                        : propss.eleccion_Id == '2'
                          ? 'AZUL'
                          : 'VERDE'
                    }}
                  </q-badge>
                </div>
                <div v-else>
                  {{ col.label }}
                </div>
              </q-th>
            </q-tr>
          </template>
          <!-- FOTO -->
          <template v-slot:body-cell-fotografia_URL="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <q-avatar v-if="props.row.fotografia_URL" size="85px">
                <q-img :src="props.row.fotografia_URL" />
              </q-avatar>
              <q-avatar size="85px" v-else>
                <q-img v-if="props.row.sexo === 'Femenino'" src="../assets/avatarmujer.jpg" />
                <q-img v-if="props.row.sexo === 'Masculino'" src="../assets/avatarHombre.jpg" />
              </q-avatar>
            </q-td>
          </template>

          <!-- VOTOS -->
          <template v-slot:body-cell-votos="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ Number(props.row.votos || 0).toLocaleString('es-MX') }}
            </q-td>
          </template>

          <!-- PORCENTAJE -->
          <template v-slot:body-cell-porcentaje="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{
                props.row?.porcentaje !== undefined
                  ? (props.row.porcentaje * 100).toFixed(4) + '%'
                  : ''
              }}
            </q-td>
          </template>

          <!-- PODER POSTULANTE -->
          <template v-slot:body-cell-poder_Postulante="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <div class="q-gutter-xs flex justify-center">
                <q-avatar
                  v-for="poder in props.row.poder_Postulante.split('|')"
                  :key="poder"
                  square
                  size="sm"
                  color="black"
                  text-color="white"
                >
                  {{ poder.trim().split(':')[0] }}
                </q-avatar>
              </div>
            </q-td>
          </template>

          <!-- NO FORMULA -->
          <template v-slot:body-cell-no_Formula="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ props.row.no_Formula }}
            </q-td>
          </template>
        </q-table>
        <div class="col-12 col-sm-6">
          <q-card style="border-radius: 10px">
            <q-card-section
              class="q-pa-sm text-white text-bold"
              style="background-color: #93b2cc; margin: 33px 0px 22px"
            >
              <div class="text-h6 text-center text-bold">
                SISTEMA INTEGRAL DE JUSTICIA PENAL PARA ADOLESCENTES
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-table
          :rows="list_Penal"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="{ rowsPerPage: 0 }"
          :rows-per-page-options="[10, 15, 20, 25, 30, 50]"
          hide-bottom
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-center">
                <div v-if="col.name === 'no_Formula'">
                  {{ col.label }}
                  <q-badge
                    align="middle"
                    :class="
                      propss.eleccion_Id == '1'
                        ? 'color-1 text-white text-bold'
                        : propss.eleccion_Id == '2'
                          ? 'color-2 text-white text-bold'
                          : 'color-3 text-black text-bold'
                    "
                    style="font-size: large"
                  >
                    {{
                      propss.eleccion_Id == '1'
                        ? 'ROSA'
                        : propss.eleccion_Id == '2'
                          ? 'AZUL'
                          : 'VERDE'
                    }}
                  </q-badge>
                </div>
                <div v-else>
                  {{ col.label }}
                </div>
              </q-th>
            </q-tr>
          </template>
          <!-- FOTO -->
          <template v-slot:body-cell-fotografia_URL="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <q-avatar v-if="props.row.fotografia_URL" size="85px">
                <q-img :src="props.row.fotografia_URL" />
              </q-avatar>
              <q-avatar size="85px" v-else>
                <q-img v-if="props.row.sexo === 'Femenino'" src="../assets/avatarmujer.jpg" />
                <q-img v-if="props.row.sexo === 'Masculino'" src="../assets/avatarHombre.jpg" />
              </q-avatar>
            </q-td>
          </template>

          <!-- VOTOS -->
          <template v-slot:body-cell-votos="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ Number(props.row.votos || 0).toLocaleString('es-MX') }}
            </q-td>
          </template>

          <!-- PORCENTAJE -->
          <template v-slot:body-cell-porcentaje="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{
                props.row?.porcentaje !== undefined
                  ? (props.row.porcentaje * 100).toFixed(4) + '%'
                  : ''
              }}
            </q-td>
          </template>

          <!-- PODER POSTULANTE -->
          <template v-slot:body-cell-poder_Postulante="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <div class="q-gutter-xs flex justify-center">
                <q-avatar
                  v-for="poder in props.row.poder_Postulante.split('|')"
                  :key="poder"
                  square
                  size="sm"
                  color="black"
                  text-color="white"
                >
                  {{ poder.trim().split(':')[0] }}
                </q-avatar>
              </div>
            </q-td>
          </template>

          <!-- NO FORMULA -->
          <template v-slot:body-cell-no_Formula="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ props.row.no_Formula }}
            </q-td>
          </template>
        </q-table>
        <div class="col-12 col-sm-6">
          <q-card style="border-radius: 10px">
            <q-card-section
              class="q-pa-sm text-white text-bold"
              style="background-color: #e1e498; margin: 33px 0px 22px"
            >
              <div class="text-h6 text-center text-bold">TRIBUNAL LABORAL</div>
            </q-card-section>
          </q-card>
        </div>
        <q-table
          :rows="list_Laboral"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="{ rowsPerPage: 0 }"
          :rows-per-page-options="[10, 15, 20, 25, 30, 50]"
          hide-bottom
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-center">
                <div v-if="col.name === 'no_Formula'">
                  {{ col.label }}
                  <q-badge
                    align="middle"
                    :class="
                      propss.eleccion_Id == '1'
                        ? 'color-1 text-white text-bold'
                        : propss.eleccion_Id == '2'
                          ? 'color-2 text-white text-bold'
                          : 'color-3 text-black text-bold'
                    "
                    style="font-size: large"
                  >
                    {{
                      propss.eleccion_Id == '1'
                        ? 'ROSA'
                        : propss.eleccion_Id == '2'
                          ? 'AZUL'
                          : 'VERDE'
                    }}
                  </q-badge>
                </div>
                <div v-else>
                  {{ col.label }}
                </div>
              </q-th>
            </q-tr>
          </template>
          <!-- FOTO -->
          <template v-slot:body-cell-fotografia_URL="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <q-avatar v-if="props.row.fotografia_URL" size="85px">
                <q-img :src="props.row.fotografia_URL" />
              </q-avatar>
              <q-avatar size="85px" v-else>
                <q-img v-if="props.row.sexo === 'Femenino'" src="../assets/avatarmujer.jpg" />
                <q-img v-if="props.row.sexo === 'Masculino'" src="../assets/avatarHombre.jpg" />
              </q-avatar>
            </q-td>
          </template>

          <!-- VOTOS -->
          <template v-slot:body-cell-votos="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ Number(props.row.votos || 0).toLocaleString('es-MX') }}
            </q-td>
          </template>

          <!-- PORCENTAJE -->
          <template v-slot:body-cell-porcentaje="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{
                props.row?.porcentaje !== undefined
                  ? (props.row.porcentaje * 100).toFixed(4) + '%'
                  : ''
              }}
            </q-td>
          </template>

          <!-- PODER POSTULANTE -->
          <template v-slot:body-cell-poder_Postulante="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              <div class="q-gutter-xs flex justify-center">
                <q-avatar
                  v-for="poder in props.row.poder_Postulante.split('|')"
                  :key="poder"
                  square
                  size="sm"
                  color="black"
                  text-color="white"
                >
                  {{ poder.trim().split(':')[0] }}
                </q-avatar>
              </div>
            </q-td>
          </template>

          <!-- NO FORMULA -->
          <template v-slot:body-cell-no_Formula="props">
            <q-td :props="props" class="text-center" v-if="!props.row.subtitulo">
              {{ props.row.no_Formula }}
            </q-td>
          </template>
        </q-table>
        <div
          class="row q-col-gutter-md"
          style="margin: 0px 0px 20px 0px"
          v-if="junta != 'Todas' || municipio != 'Todos'"
        >
          <div class="col-12 col-sm-4">
            <q-card style="border-radius: 10px">
              <q-card-section
                class="q-pa-sm"
                :class="
                  propss.eleccion_Id == '1'
                    ? 'color-1 text-white text-bold'
                    : propss.eleccion_Id == '2'
                      ? 'color-2 text-white text-bold'
                      : 'color-3 text-black text-bold'
                "
              >
                <div class="text-h6 text-center text-bold" style="font-size: 14px">
                  {{
                    junta != 'Todas' && municipio == 'Todos'
                      ? 'Resumen de la Votación de la ' +
                        ('JAO ' + junta.no_Oficina + junta.nombre.replace('JAO ', ' '))
                      : municipio != 'Todos'
                        ? 'Resumen de la Votación del Municipio de ' + municipio.nombre
                        : 'Resumen de la Votación'
                  }}
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row q-mb-sm">
                  <div class="col text-subtitle1 text-bold text-center">Votos candidaturas:</div>
                  <div class="col text-subtitle1 text-bold text-center">Votos nulos:</div>
                  <div class="col text-subtitle1 text-bold text-center">Total de votos:</div>
                </div>
                <div class="row q-mb-sm">
                  <div
                    :class="
                      !$q.screen.xs
                        ? 'col text-h3 text-bold text-center'
                        : 'col text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    {{ Number(informacion_JAO_MUN.votos_Candidatura || 0).toLocaleString('es-MX') }}
                  </div>
                  <div
                    :class="
                      !$q.screen.xs
                        ? 'col text-h3 text-bold text-center'
                        : 'col text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    {{ Number(informacion_JAO_MUN.votos_Nulos || 0).toLocaleString('es-MX') }}
                  </div>
                  <div
                    :class="
                      !$q.screen.xs
                        ? 'col text-h3 text-bold text-center'
                        : 'col text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    {{ Number(informacion_JAO_MUN.total || 0).toLocaleString('es-MX') }}
                  </div>
                </div>
                <div class="row q-mb-sm">
                  <div
                    :class="
                      $q.screen.xs
                        ? 'col 6 text-bold text-center'
                        : 'col text-h6 text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    {{
                      informacion_JAO_MUN.total
                        ? (
                            (informacion_JAO_MUN.votos_Candidatura / informacion_JAO_MUN.total) *
                            100
                          ).toFixed(4)
                        : '0.0000'
                    }}%
                  </div>
                  <div
                    :class="
                      $q.screen.xs
                        ? 'col 6 text-bold text-center'
                        : 'col text-h6 text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    {{
                      informacion_JAO_MUN.votos_Nulos
                        ? (
                            (informacion_JAO_MUN.votos_Nulos / informacion_JAO_MUN.total) *
                            100
                          ).toFixed(4)
                        : '0.0000'
                    }}%
                  </div>
                  <div
                    :class="
                      $q.screen.xs
                        ? 'col 6 text-bold text-center'
                        : 'col text-h6 text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    100.0000%
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card style="border-radius: 10px">
              <q-card-section
                class="q-pa-sm"
                :class="
                  propss.eleccion_Id == '1'
                    ? 'color-1 text-white text-bold'
                    : propss.eleccion_Id == '2'
                      ? 'color-2 text-white text-bold'
                      : 'color-3 text-black text-bold'
                "
              >
                <div class="text-h6 text-center text-bold" style="font-size: 14px">
                  {{
                    junta != 'Todas' && municipio == 'Todos'
                      ? 'Avance de Casillas Computadas de la ' +
                        ('JAO ' + junta.no_Oficina + junta.nombre.replace('JAO ', ' '))
                      : municipio != 'Todos'
                        ? 'Avance de Casillas Computadas del Municipio de ' + municipio.nombre
                        : 'Avance de Casillas Computadas'
                  }}
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row justify-around items-center q-mb-sm">
                  <div class="text-subtitle1 text-bold">
                    Casillas Computadas:
                    {{
                      Number(informacion_JAO_MUN.casillas_Computadas || 0).toLocaleString('es-MX')
                    }}
                  </div>
                  <div class="text-subtitle1 text-bold">
                    Casillas Esperadas:
                    {{
                      Number(informacion_JAO_MUN.casillas_Esperadas || 0).toLocaleString('es-MX')
                    }}
                  </div>
                </div>
                <div class="text-h6 text-center text-bold text-black">
                  <q-linear-progress
                    dark
                    stripe
                    rounded
                    size="46px"
                    :value="informacion_JAO_MUN.avance"
                    :class="
                      propss.eleccion_Id == '1'
                        ? 'color-A1'
                        : propss.eleccion_Id == '2'
                          ? 'color-A2'
                          : 'color-A3'
                    "
                  />
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row justify-around items-center q-mb-sm">
                  <div class="text-subtitle1 text-bold">
                    Avance:
                    {{
                      informacion_JAO_MUN.avance != null
                        ? (informacion_JAO_MUN.avance * 100).toFixed(4)
                        : '0%'
                    }}%
                  </div>
                  <div class="text-subtitle1 text-bold">
                    Restante:
                    {{
                      informacion_JAO_MUN.avance != null
                        ? ((1 - informacion_JAO_MUN.avance) * 100).toFixed(4)
                        : '0%'
                    }}%
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card style="border-radius: 10px">
              <q-card-section
                class="q-pa-sm"
                :class="
                  propss.eleccion_Id == '1'
                    ? 'color-1 text-white text-bold'
                    : propss.eleccion_Id == '2'
                      ? 'color-2 text-white text-bold'
                      : 'color-3 text-black text-bold'
                "
              >
                <div class="text-h6 text-center text-bold" style="font-size: 14px">
                  {{
                    junta != 'Todas' && municipio == 'Todos'
                      ? 'Resumen de la Participación Computada de la ' +
                        ('JAO ' + junta.no_Oficina + junta.nombre.replace('JAO ', ' '))
                      : municipio != 'Todos'
                        ? 'Resumen de la Participación Computada del Municipio de ' +
                          municipio.nombre
                        : 'Resumen de la Participación Computada'
                  }}
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row q-mb-sm">
                  <div class="col text-subtitle1 text-bold text-center">
                    Participación ciudadana:
                  </div>
                  <div class="col text-subtitle1 text-bold text-center">Lista Nominal:</div>
                </div>

                <div class="row q-mb-sm">
                  <div
                    :class="
                      !$q.screen.xs
                        ? 'col text-h3 text-bold text-center'
                        : 'col text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    {{ Number(informacion_JAO_MUN.participacion || 0).toLocaleString('es-MX') }}
                  </div>
                  <div
                    :class="
                      !$q.screen.xs
                        ? 'col text-h3 text-bold text-center'
                        : 'col text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    {{ Number(informacion_JAO_MUN.lista_Nominal || 0).toLocaleString('es-MX') }}
                  </div>
                </div>
                <div class="row q-mb-sm">
                  <div
                    :class="
                      $q.screen.xs
                        ? 'col 6 text-bold text-center'
                        : 'col text-h6 text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    {{
                      informacion_JAO_MUN.porcentaje_Participacion !== undefined
                        ? (informacion_JAO_MUN.porcentaje_Participacion * 100).toFixed(4)
                        : '0.0000'
                    }}%
                  </div>
                  <div
                    :class="
                      $q.screen.xs
                        ? 'col 6 text-bold text-center'
                        : 'col text-h6 text-bold text-center'
                    "
                    style="color: #634086"
                  >
                    100%
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!$q.screen.xs" style="margin: 0px 0px 20px; display: flex; place-items: center">
        <div class="row items-center justify-between q-mb-md" style="width: 100%">
          <!-- IZQUIERDA -->
          <div class="col-auto text-left" style="font-size: 33px; color: #634086; font-weight: 600">
            Estatal
            {{
              junta != 'Todas'
                ? ' / ' + ('JAO ' + junta.no_Oficina + junta.nombre.replace('JAO ', ' '))
                : ''
            }}
            {{ municipio != 'Todos' ? ' / ' + municipio.nombre : '' }}
            {{ seccion != null ? ' /Sección ' + seccion.nombre : '' }}
          </div>

          <!-- DERECHA -->
          <div class="col-auto text-right" v-if="tab == 'JUE'">
            <q-chip>
              <q-avatar
                square
                size="sm"
                style="font-size: 14px; background-color: #c4c5ba"
              ></q-avatar>
              Tradicional
            </q-chip>
            <q-chip>
              <q-avatar
                square
                size="sm"
                style="font-size: 14px; background-color: #e9d0d9"
              ></q-avatar>
              Penal Acusatorio y Oral
            </q-chip>
            <q-chip>
              <q-avatar
                square
                size="sm"
                style="font-size: 14px; background-color: #93b2cc"
              ></q-avatar>
              Integral de Justicia Penal para Adolescentes
            </q-chip>
            <q-chip>
              <q-avatar
                square
                size="sm"
                style="font-size: 14px; background-color: #e1e498"
              ></q-avatar>
              Laboral
            </q-chip>
          </div>
        </div>
      </div>
      <q-table
        :rows="list_Candidatos_Seccion"
        :columns="columnss"
        flat
        bordered
        row-key="casilla_Id"
        hide-bottom
        :pagination="{ rowsPerPage: 0 }"
        :rows-per-page-options="[0]"
      >
        <template v-slot:header-cell="props">
          <q-th :props="props">
            <div v-if="props.col.fotografia_URL">
              <q-avatar size="42px">
                <img :src="props.col.fotografia_URL" alt="Foto" />
              </q-avatar>
              <div style="display: block; font-weight: 600; margin: 4px 0px 0px 0px">
                <div
                  v-if="propss.eleccion_Id == 3"
                  :style="{
                    background:
                      props.col.tipo_Eleccion_Id == 3
                        ? '#C4C5BA'
                        : props.col.tipo_Eleccion_Id == 4
                          ? '#E9D0D9'
                          : props.col.tipo_Eleccion_Id == 5
                            ? '#93B2CC'
                            : '#E1E498',
                    borderRadius: '50%',
                    width: '11px',
                    height: '11px',
                    display: 'inline-block',
                    placeItems: 'center',
                    position: 'relative',
                  }"
                ></div>
                cand. {{ props.col.no_Formula }}
              </div>
            </div>
            <div v-else>
              {{ props.col.label }}
            </div>
          </q-th>
        </template>

        <template v-slot:body-cell-acta_URL="props">
          <q-td :props="props" class="text-center">
            <template v-if="props.row.acta_URL">
              <q-btn
                dense
                flat
                round
                icon="description"
                :style="{
                  color:
                    propss.eleccion_Id == '1'
                      ? '#ff9bb8'
                      : propss.eleccion_Id == '2'
                        ? '#8bb8ee'
                        : '#d4e3be',
                }"
                :href="props.row.acta_URL"
                target="_blank"
                :title="'Ver Acta de Escrutinio y Computo de Casilla'"
              />
            </template>
            <template v-else><q-chip>Sin Computar </q-chip></template>
          </q-td>
        </template>
      </q-table>
    </div>
  </template>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref, defineProps, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCandidatosStore } from 'src/stores/candidatos-store'
import { useConfiguracionStore } from 'src/stores/configuracion-store'
import loadingGif from '../assets/PEEPJ.gif'

//---------------------------------------------------------------------------------

const $q = useQuasar()
const candidatosStore = useCandidatosStore()
const configuracionStore = useConfiguracionStore()
const {
  informacion,
  informacion_JAO_MUN,
  junta,
  municipio,
  seccion,
  list_Candidatos_Judicial,
  list_Candidatos_Seccion,
  list_Tradicional,
  list_Acusatorio,
  list_Penal,
  list_Laboral,
} = storeToRefs(candidatosStore)

const miHeader = ref(null)
const propss = defineProps({
  eleccion_Id: { type: String, required: true },
  eleccion: { type: String, required: true },
})

const columnss = ref([])
//---------------------------------------------------------------------------------

onMounted(() => {
  cargarData()
  cargarColores(propss.eleccion_Id)
})

//---------------------------------------------------------------------------------

const columns = [
  {
    name: 'fotografia_URL',
    align: 'center',
    label: '',
    field: 'fotografia_URL',
    sortable: false,
    headerSlot: false,
  },
  {
    name: 'no_Formula',
    align: 'center',
    label: 'No. de lista en boleta color',
    field: 'no_Formula',
    sortable: false,
    headerSlot: false,
  },
  {
    name: 'nombre_Completo',
    align: 'center',
    label: 'Candidatura',
    field: 'nombre_Completo',
    sortable: false,
  },
  {
    name: 'poder_Postulante',
    align: 'center',
    label: 'Poder que postula',
    field: 'poder_Postulante',
    sortable: false,
  },
  {
    name: 'votos',
    align: 'center',
    label: 'Votos',
    field: 'votos',
    sortable: false,
  },
  {
    name: 'porcentaje',
    align: 'center',
    label: '% Votos',
    field: 'porcentaje',
    sortable: false,
  },
]

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
watch(list_Candidatos_Seccion, (val) => {
  if (val) {
    columnss.value = [
      {
        name: 'casilla',
        label: 'Casilla',
        align: 'left',
        field: 'casilla',
        sortable: false,
      },
      {
        name: 'acta_URL',
        label: 'AEC',
        align: 'center',
        field: 'acta_URL',
        sortable: false,
      },
      ...val[0].candidaturas.map((c) => ({
        name: `candidato_${c.id}`,
        label: `Fórmula ${c.no_Formula}`,
        align: 'center',
        field: (row) => {
          const candidato = row.candidaturas.find((can) => can.no_Formula === c.no_Formula)
          return candidato ? candidato.votos : 0
        },
        sortable: false,
        no_Formula: c.no_Formula,
        fotografia_URL: c.fotografia_URL,
        sexo: c.sexo,
        tipo_Eleccion_Id: c.tipo_Eleccion_Id,
      })),
      {
        name: 'votos_Candidaturas',
        label: 'Votos Candidaturas',
        align: 'center',
        field: 'votos_Candidaturas',
        sortable: false,
      },
      {
        name: 'votos_Nulos',
        label: 'Votos Nulos',
        align: 'center',
        field: 'votos_Nulos',
        sortable: false,
      },
      {
        name: 'total_Votos',
        label: 'Total Votos',
        align: 'center',
        field: 'total_Votos',
        sortable: false,
      },
    ]
  }
})

const cargarData = async () => {
  $q.loading.show({
    spinner: null,
    message: `<img src="${loadingGif}" style="width:333px; height:333px; opacity:.6;"><br>Espere un momento por favor...`,
    html: true,
    messageColor: 'black',
  })
  await candidatosStore.initInformacion()
  await candidatosStore.initInformacion_JAO_MUN()
  await configuracionStore.loadHoraCorte()
  await candidatosStore.loadInformacion(propss.eleccion_Id)
  await candidatosStore.loadCandidatosJudicialByEleccion(propss.eleccion_Id)

  if (propss.eleccion_Id == '3') {
    list_Tradicional.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 3)
    list_Acusatorio.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 4)
    list_Penal.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 5)
    list_Laboral.value = list_Candidatos_Judicial.value.filter((x) => x.tipo_Eleccion_Id == 6)
  }
  $q.loading.hide()
}

const cargarColores = async (id) => {
  let nuevoColor = ''
  let textoColor = ''
  if (id == '1') {
    nuevoColor = '#ff9bb8'
    textoColor = '#ffffff'
  } else if (id == '2') {
    nuevoColor = '#8bb8ee'
    textoColor = '#ffffff'
  } else if (id == '3') {
    nuevoColor = '#d4e3be'
    textoColor = '#000000'
  }
  if (miHeader.value) {
    miHeader.value.style.backgroundColor = nuevoColor
    miHeader.value.style.color = textoColor
  }
}

//---------------------------------------------------------------------------------
</script>

<style scoped>
.nombre-tarjeta {
  text-align: center;
  max-width: 250px; /* Tamaño máximo deseado para el nombre */
  white-space: pre-wrap; /* Permite saltos de línea */
  word-wrap: break-word;
}
.color-1 {
  background-color: #ff9bb8;
}

.color-2 {
  background-color: #8bb8ee;
}

.color-3 {
  background-color: #d4e3be;
}
.color-A1 {
  color: #ff9bb8 !important;
  background: #d1d1d1 !important;
  box-shadow: 1px 1px 1px #00000063;
}

.color-A2 {
  color: #8bb8ee !important;
  background: #d1d1d1 !important;
  box-shadow: 1px 1px 1px #00000063;
}

.color-A3 {
  color: #d4e3be !important;
  background: #d1d1d1 !important;
  box-shadow: 1px 1px 1px #00000063;
}
</style>
