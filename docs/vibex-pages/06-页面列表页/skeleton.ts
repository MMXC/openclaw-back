import { PageListHeader, PageCard, AddCard } from './controls';

export const skeleton = {
  layout: 'stack',
  controls: [
    { id: 'header', type: 'PageListHeader', component: PageListHeader, position: { order: 1 } },
    { id: 'grid', type: 'PageCard', component: PageCard, position: { order: 2 } },
    { id: 'add', type: 'AddCard', component: AddCard, position: { order: 3 } },
  ],
};
export default skeleton;
