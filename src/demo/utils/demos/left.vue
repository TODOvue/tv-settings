<template>
  <TvSettings direction="left">
    <template #default="{ close }">
      <p>This panel is closed manually from the content.</p>
      <button @click="close">Close</button>
    </template>
  </TvSettings>
</template>

<script setup>
import { TvSettings } from '@todovue/tv-settings';
import '@todovue/tv-settings/style.css';
</script>
