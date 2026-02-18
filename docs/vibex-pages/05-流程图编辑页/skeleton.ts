import { FlowToolbar, NodeLibrary, FlowCanvas, PropertiesPanel } from './controls';

export const skeleton = {
  layout: 'grid',
  controls: [
    { id: 'toolbar', type: 'FlowToolbar', component: FlowToolbar, position: { order: 1 } },
    { id: 'nodes', type: 'NodeLibrary', component: NodeLibrary, position: { order: 2 } },
    { id: 'canvas', type: 'FlowCanvas', component: FlowCanvas, position: { order: 3 } },
    { id: 'props', type: 'PropertiesPanel', component: PropertiesPanel, position: { order: 4 } },
  ],
};
export default skeleton;
