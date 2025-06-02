<template>
  <q-page class="row flex flex-center">
    <div
      v-if="!$q.screen.xs"
      class="text-center col-lg-6 col-md-6 col-sm-12 col-xs-12"
      style="text-align: left; padding: 44px"
    >
      <div
        class="text-h2 text-bold text-blue-pj"
        id="speak"
        style="letter-spacing: 1px; margin-bottom: 22px"
      >
        Elecciones Estatales del Poder Judicial Nayarit 2025
      </div>
      <div class="text-subtitle1 q-pa-md" id="speak" style="color: #464646c7; font-weight: 900">
        A partir del domingo 1 de junio de 2025 a las 18:00 horas, el Instituto Estatal Electoral de
        Nayarit (IEEN) iniciará los Cómputos Parciales del Proceso Electoral Extraordinario, a cargo
        de las Juntas Auxiliares Operativas (JAO).
        <br />
        <br />Posteriormente el Consejo Local Electoral realizará el Cómputo Estatal, integrando los
        resultados obtenidos en cada JAO. <br />
        <br />Las elecciones consideradas son: <br />-Magistraturas del Tribunal Superior de
        Justicia <br />-Magistraturas del Tribunal de Disciplina Judicial <br />-Juezas y Jueces del
        Poder Judicial del Estado
      </div>
    </div>
    <div
      v-if="!$q.screen.xs"
      class="imgHome col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xl text-center"
    >
      <img
        alt="PREP logo"
        src="../assets/Computos-Inicio.png"
        :style="$q.screen.xs ? 'width: 400px; height: 350px' : 'width: auto; height: 550px'"
      />
    </div>

    <div
      v-else
      class="text-center col-lg-6 col-md-6 col-sm-12 col-xs-12"
      style="text-align: left; padding: 44px"
    >
      <div style="margin-bottom: 22px; text-align: center; font-size: 27px; line-height: 3rem">
        <img
          alt="PREP logo"
          src="../assets/Computos-Inicio.png"
          style="width: 303px; height: 202px"
        />
      </div>
      <div
        class="text-h2 text-bold text-blue-pj"
        id="speak"
        style="margin-bottom: 22px; text-align: center; font-size: 26px; line-height: 3rem"
      >
        Elecciones Estatales del Poder Judicial Nayarit 2025
      </div>
      <div
        class="text-subtitle1 q-pa-md"
        id="speak"
        style="
          color: rgba(70, 70, 70, 0.78);
          font-weight: 600;
          text-align: justify;
          font-size: 14px;
        "
      >
        A partir del domingo 1 de junio de 2025 a las 18:00 horas, el Instituto Estatal Electoral de
        Nayarit (IEEN) iniciará los Cómputos Parciales del Proceso Electoral Extraordinario, a cargo
        de las Juntas Auxiliares Operativas (JAO).
        <br />
        <br />Posteriormente el Consejo Local Electoral realizará el Cómputo Estatal, integrando los
        resultados obtenidos en cada JAO. <br />
        <br />Las elecciones consideradas son: <br />-Magistraturas del Tribunal Superior de
        Justicia <br />-Magistraturas del Tribunal de Disciplina Judicial <br />-Juezas y Jueces del
        Poder Judicial del Estado
      </div>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
@media screen and (max-width: 780px) {
  .imgHome {
    height: 300px;
    min-width: 310px;
    max-width: 800px;
  }
}
</style>
