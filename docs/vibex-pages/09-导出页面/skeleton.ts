import { ExportHeader, FormatSelect, ExportOptions } from './controls';

export const skeleton = {
  layout: 'stack',
  controls: [
    { id: 'header', type: 'ExportHeader', component: ExportHeader, position: { order: 1 } },
    { id: 'formats', type: 'FormatSelect', component: FormatSelect, position: { order: 2 } },
    { id: 'options', type: 'ExportOptions', component: ExportOptions, position: { order: 3 } },
  ],
};
export default skeleton;
