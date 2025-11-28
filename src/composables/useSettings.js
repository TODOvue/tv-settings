import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const DIRECTIONS = ['top', 'right', 'bottom', 'left'];

const isValidDirection = (dir) => DIRECTIONS.includes(dir);

const warnInvalidDirection = (dir) => {
  if (dir && !isValidDirection(dir)) {
    console.warn(
      `[TvSettings] Dirección "${dir}" no es válida. Usa una de: ${DIRECTIONS.join(', ')}.`
    );
  }
};

export default function useSettings(props, emit, rootRef) {
  const internalOpen = ref(false);

  const isControlled = computed(() => typeof props.modelValue === 'boolean');

  const normalizedDirection = computed(() => {
    return isValidDirection(props.direction) ? props.direction : 'right';
  });

  const directionClass = computed(() => `tv-setting--${normalizedDirection.value}`);
  const panelDirectionClass = computed(
    () => `tv-setting__panel--${normalizedDirection.value}`
  );

  const isOpen = computed(() => {
    return isControlled.value ? props.modelValue : internalOpen.value;
  });

  const setOpen = (next) => {
    if (props.disabled || next === isOpen.value) {
      return;
    }

    if (!isControlled.value) {
      internalOpen.value = next;
    }

    emit('update:modelValue', next);
    emit(next ? 'open' : 'close');
  };

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen(!isOpen.value);

  const handleDocumentPointer = (event) => {
    if (!props.closeOnOutside || !isOpen.value || !rootRef?.value) {
      return;
    }

    if (!rootRef.value.contains(event.target)) {
      close();
    }
  };

  const handleDocumentKeydown = (event) => {
    if (event.key === 'Escape' && isOpen.value) {
      close();
    }
  };

  onMounted(() => {
    document.addEventListener('pointerdown', handleDocumentPointer);
    document.addEventListener('keydown', handleDocumentKeydown);
    warnInvalidDirection(props.direction);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', handleDocumentPointer);
    document.removeEventListener('keydown', handleDocumentKeydown);
  });

  watch(
    () => props.direction,
    (dir) => {
      warnInvalidDirection(dir);
    }
  );

  return {
    isOpen,
    directionClass,
    panelDirectionClass,
    normalizedDirection,
    open,
    close,
    toggle,
  };
}

export { DIRECTIONS };

