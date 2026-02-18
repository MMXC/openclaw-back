import { EditorToolbar, ComponentPanel, EditorCanvas, EditorProps, DeviceSwitcher } from './controls';

export const skeleton = {
  layout: 'grid',
  controls: [
    { id: 'toolbar', type: 'EditorToolbar', component: EditorToolbar, position: { order: 1 } },
    { id: 'components', type: 'ComponentPanel', component: ComponentPanel, position: { order: 2 } },
    { id: 'canvas', type: 'EditorCanvas', component: EditorCanvas, position: { order: 3 } },
    { id: 'props', type: 'EditorProps', component: EditorProps, position: { order: 4 } },
    { id: 'device', type: 'DeviceSwitcher', component: DeviceSwitcher, position: { order: 5 } },
  ],
};
export default skeleton;
