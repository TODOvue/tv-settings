<template>
  <TvSettings direction="right" title="Configuración del Sitio">
    <template #default="{ close }">
      <div class="p-4">
        <p>El título se pasa como prop, simplificando el uso.</p>
        <button @click="close">Cerrar</button>
      </div>
    </template>
  </TvSettings>
</template>

<style scoped>
.p-4 {
  padding: 1rem;
}
</style>
