<template>
  <router-view />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload'

if (isReload && route.path !== '/inicio') {
  router.replace('/inicio')
}
</script>
