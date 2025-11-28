<template>
  <TvSettings direction="left" :close-on-outside="false">
    <template #default="{ close }">
      <p>This panel does not close when clicking outside.</p>
      <button @click="close">Close</button>
    </template>
  </TvSettings>
</template>

<script setup>
import { TvSettings } from '@todovue/tv-settings';
import '@todovue/tv-settings/style.css';
</script>
