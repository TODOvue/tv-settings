<template>
  <TvSettings direction="right">
    <template #trigger="{ toggle }">
      <button class="custom-btn" @click="toggle">
        Configuración Personalizada
      </button>
    </template>
    <template #default="{ close }">
      <div class="p-4">
        <h3>Panel Personalizado</h3>
        <p>Este panel se abre con un botón personalizado.</p>
        <button @click="close">Cerrar</button>
      </div>
    </template>
  </TvSettings>
</template>

<style scoped>
.custom-btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.p-4 {
  padding: 1rem;
}
</style>
