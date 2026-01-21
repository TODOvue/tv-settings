import Top from './demos/top.vue?raw';
import Right from './demos/right.vue?raw';
import Bottom from './demos/bottom.vue?raw';
import Left from './demos/left.vue?raw';
import NoCloseOutside from './demos/noCloseOutside.vue?raw';
import CustomTrigger from './demos/customTrigger.vue?raw';
import TitleProp from './demos/titleProp.vue?raw';

export const demos = [
  {
    id: 1,
    title: 'Top Panel',
    description: 'Panel sliding down from the top with header and close button.',
    propsData: {
      direction: 'top',
    },
    html: Top,
  },
  {
    id: 2,
    title: 'Right Panel',
    description: 'Right side panel with custom content.',
    propsData: {
      direction: 'right',
    },
    html: Right,
  },
  {
    id: 3,
    title: 'Bottom Panel',
    description: 'Bottom panel using the default content.',
    propsData: {
      direction: 'bottom',
    },
    html: Bottom,
  },
  {
    id: 4,
    title: 'Left Panel',
    description: 'Left side panel with a manual close slot.',
    propsData: {
      direction: 'left',
    },
    html: Left,
  },
  {
    id: 5,
    title: 'Left Panel (No close on outside)',
    description: 'Left panel that remains open when clicking outside.',
    propsData: {
      direction: 'left',
      closeOnOutside: false,
    },
    html: NoCloseOutside,
  },
  {
    id: 6,
    title: 'Custom Trigger',
    description: 'Uses the trigger slot to replace the default button.',
    propsData: {
      direction: 'right',
    },
    html: CustomTrigger,
  },
  {
    id: 7,
    title: 'Title Prop',
    description: 'Uses the title prop to show a simplified header.',
    propsData: {
      title: 'Configuración del Sitio',
    },
    html: TitleProp,
  },
];
