import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const DIRECTIONS = ['top', 'right', 'bottom', 'left'];
const VIEWPORT_MARGIN = 16;

const isValidDirection = (dir) => DIRECTIONS.includes(dir);

const warnInvalidDirection = (dir) => {
  if (dir && !isValidDirection(dir)) {
    console.warn(
      `[TvSettings] Dirección "${dir}" no es válida. Usa una de: ${DIRECTIONS.join(', ')}.`
    );
  }
};

const checkOverflow = (buttonRect, panelRect, direction, margin) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  let panelBounds = { top: 0, right: 0, bottom: 0, left: 0 };
  
  switch (direction) {
    case 'top':
      panelBounds = {
        top: buttonRect.top - panelRect.height - margin,
        bottom: buttonRect.top - margin,
        left: buttonRect.left + (buttonRect.width / 2) - (panelRect.width / 2),
        right: buttonRect.left + (buttonRect.width / 2) + (panelRect.width / 2),
      };
      break;
    case 'bottom':
      panelBounds = {
        top: buttonRect.bottom + margin,
        bottom: buttonRect.bottom + panelRect.height + margin,
        left: buttonRect.left + (buttonRect.width / 2) - (panelRect.width / 2),
        right: buttonRect.left + (buttonRect.width / 2) + (panelRect.width / 2),
      };
      break;
    case 'left':
      panelBounds = {
        top: buttonRect.top + (buttonRect.height / 2) - (panelRect.height / 2),
        bottom: buttonRect.top + (buttonRect.height / 2) + (panelRect.height / 2),
        left: buttonRect.left - panelRect.width - margin,
        right: buttonRect.left - margin,
      };
      break;
    case 'right':
      panelBounds = {
        top: buttonRect.top + (buttonRect.height / 2) - (panelRect.height / 2),
        bottom: buttonRect.top + (buttonRect.height / 2) + (panelRect.height / 2),
        left: buttonRect.right + margin,
        right: buttonRect.right + panelRect.width + margin,
      };
      break;
  }
  
  return (
    panelBounds.top >= margin &&
    panelBounds.bottom <= viewportHeight - margin &&
    panelBounds.left >= margin &&
    panelBounds.right <= viewportWidth - margin
  );
};

const findBestDirection = (buttonRect, panelRect, preferredDirection, margin) => {
  if (checkOverflow(buttonRect, panelRect, preferredDirection, margin)) {
    return preferredDirection;
  }

  const directionPriority = {
    top: ['bottom', 'right', 'left'],
    bottom: ['top', 'right', 'left'],
    left: ['right', 'bottom', 'top'],
    right: ['left', 'bottom', 'top'],
  };
  
  const alternatives = directionPriority[preferredDirection] || ['right', 'bottom', 'top', 'left'];
  
  for (const dir of alternatives) {
    if (checkOverflow(buttonRect, panelRect, dir, margin)) {
      return dir;
    }
  }

  return preferredDirection;
};

export default function useSettings(props, emit, rootRef) {
  const internalOpen = ref(false);
  const adjustedDirection = ref(null);

  const isControlled = computed(() => typeof props.modelValue === 'boolean');

  const normalizedDirection = computed(() => {
    return isValidDirection(props.direction) ? props.direction : 'right';
  });

  const activeDirection = computed(() => {
    return adjustedDirection.value || normalizedDirection.value;
  });

  const directionClass = computed(() => `tv-setting--${normalizedDirection.value}`);
  const panelDirectionClass = computed(
    () => `tv-setting__panel--${activeDirection.value}`
  );

  const isOpen = computed(() => {
    return isControlled.value ? props.modelValue : internalOpen.value;
  });

  const adjustPanelPosition = async () => {
    if (!isOpen.value || !rootRef?.value) {
      return;
    }
    
    await nextTick();
    await nextTick();
    
    const panel = rootRef.value.querySelector('.tv-setting__panel');
    if (!panel) {
      return;
    }
    
    const buttonRect = rootRef.value.querySelector('.tv-setting__gear')?.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    
    if (!buttonRect) {
      return;
    }
    
    adjustedDirection.value = findBestDirection(
      buttonRect,
      panelRect,
      normalizedDirection.value,
      VIEWPORT_MARGIN
    );
  };

  const setOpen = (next) => {
    if (props.disabled || next === isOpen.value) {
      return;
    }

    if (!isControlled.value) {
      internalOpen.value = next;
    }

    emit('update:modelValue', next);
    emit(next ? 'open' : 'close');
    
    if (next) {
      adjustPanelPosition();
    } else {
      adjustedDirection.value = null;
    }
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

  const handleResize = () => {
    if (isOpen.value) {
      adjustPanelPosition();
    }
  };

  onMounted(() => {
    document.addEventListener('pointerdown', handleDocumentPointer);
    document.addEventListener('keydown', handleDocumentKeydown);
    window.addEventListener('resize', handleResize);
    warnInvalidDirection(props.direction);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', handleDocumentPointer);
    document.removeEventListener('keydown', handleDocumentKeydown);
    window.removeEventListener('resize', handleResize);
  });

  watch(
    () => props.direction,
    (dir) => {
      warnInvalidDirection(dir);
      adjustedDirection.value = null;
      if (isOpen.value) {
        adjustPanelPosition();
      }
    }
  );

  watch(isOpen, (newValue) => {
    if (newValue) {
      adjustPanelPosition();
    }
  });

  return {
    isOpen,
    directionClass,
    panelDirectionClass,
    normalizedDirection: activeDirection,
    open,
    close,
    toggle,
  };
}

export { DIRECTIONS };

