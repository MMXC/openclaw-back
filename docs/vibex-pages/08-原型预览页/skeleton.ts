import { PreviewHeader, DevicePreview, PreviewNav, FloatTools } from './controls';

export const skeleton = {
  layout: 'stack',
  controls: [
    { id: 'header', type: 'PreviewHeader', component: PreviewHeader, position: { order: 1 } },
    { id: 'preview', type: 'DevicePreview', component: DevicePreview, position: { order: 2 } },
    { id: 'nav', type: 'PreviewNav', component: PreviewNav, position: { order: 3 } },
    { id: 'tools', type: 'FloatTools', component: FloatTools, position: { order: 4 } },
  ],
};
export default skeleton;
