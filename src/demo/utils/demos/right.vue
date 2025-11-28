<template>
  <TvSettings direction="right">
    <template #header>
      <h2>Right Panel</h2>
    </template>
    <template #default="{ direction }">
      <p>Custom content {{ direction }}</p>
    </template>
  </TvSettings>
</template>

<script setup>
import { TvSettings } from '@todovue/tv-settings';
import '@todovue/tv-settings/style.css';
</script>
