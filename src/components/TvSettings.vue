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
  title: {
    type: String,
    default: null,
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
    <slot
      name="trigger"
      :is-open="isOpen"
      :toggle="toggle"
      :open="open"
      :close="close"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="tv-setting__icon"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
    </slot>

    <transition name="tv-setting-panel">
      <div
        v-if="isOpen"
        class="tv-setting__panel"
        :class="panelDirectionClass"
        role="dialog"
      >
        <div v-if="title || $slots.header" class="tv-setting__header">
          <slot name="header">
            <h2 v-if="title" class="tv-setting__title">{{ title }}</h2>
          </slot>
        </div>
        <slot v-bind="slotBindings" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
</style>
