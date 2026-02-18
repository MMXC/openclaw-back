import { TemplateHeader, FilterBar, TemplateCard } from './controls';

export const skeleton = {
  layout: 'stack',
  controls: [
    { id: 'header', type: 'TemplateHeader', component: TemplateHeader, position: { order: 1 } },
    { id: 'filters', type: 'FilterBar', component: FilterBar, position: { order: 2 } },
    { id: 'grid', type: 'TemplateCard', component: TemplateCard, position: { order: 3 } },
  ],
};
export default skeleton;
