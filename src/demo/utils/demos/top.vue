<template>
  <TvSettings direction="top">
    <template #header>
      <h2>Top Panel</h2>
    </template>
    <template #default="{ direction, close }">
      <p>Active direction: {{ direction }}</p>
      <button @click="close">Close</button>
    </template>
  </TvSettings>
</template>

<script setup>
import { TvSettings } from '@todovue/tv-settings';
import '@todovue/tv-settings/style.css';
</script>
