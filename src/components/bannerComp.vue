<template>
  <q-banner inline-actions class="text-justify bg-grey-2" style="border-radius: 20px">
    <template v-slot:avatar>
      <slot name="icono"></slot>
    </template>
    <slot name="contenido"></slot>
  </q-banner>
</template>

<script setup></script>

<style></style>
