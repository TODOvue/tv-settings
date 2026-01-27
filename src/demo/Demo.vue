<script setup>
import { defineAsyncComponent } from 'vue'
import { demos } from './utils/mocks.js'
import { TvDemo } from '@todovue/tv-demo'

const TvSettings = defineAsyncComponent(/* webpackChunkName: "tvSettings" */() => import('../components/TvSettings.vue'))
</script>

<template>
  <TvDemo
    :component="TvSettings"
    :variants="demos"
    hide-background
    component-name="TvSettings"
    npm-install="@todovue/tv-settings"
    source-link="https://github.com/TODOvue/tv-settings"
    url-clone="https://github.com/TODOvue/tv-settings.git"
    version="1.0.3"
  />
</template>
