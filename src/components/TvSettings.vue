<script setup>
import { computed, ref } from 'vue';
import useSettings from '../composables/useSettings.js';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  direction: {
    type: String,
    default: 'right',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  closeOnOutside: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: 'Abrir ajustes',
  },
});

const emit = defineEmits(['update:modelValue', 'open', 'close']);

const rootRef = ref(null);

const {
  isOpen,
  directionClass,
  panelDirectionClass,
  normalizedDirection,
  open,
  close,
  toggle,
} = useSettings(props, emit, rootRef);

const slotBindings = computed(() => ({
  direction: normalizedDirection.value,
  close,
  open,
}));
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      'tv-setting',
      directionClass,
      { 'is-open': isOpen, 'is-disabled': disabled },
    ]"
  >
    <button
      class="tv-setting__gear"
      type="button"
      :disabled="disabled"
      :aria-pressed="isOpen"
      :aria-expanded="isOpen"
      :aria-label="label"
      @click="toggle"
    >
      <span class="tv-setting__gear-core" aria-hidden="true"></span>
    </button>

    <transition name="tv-setting-panel">
      <div
        v-if="isOpen"
        class="tv-setting__panel"
        :class="panelDirectionClass"
        role="dialog"
      >
        <slot name="header" />
        <slot v-bind="slotBindings" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
</style>
