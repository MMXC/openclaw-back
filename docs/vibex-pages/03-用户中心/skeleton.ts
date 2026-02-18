import { Sidebar, ProjectCard, StatsCard } from './controls';

export const skeleton = {
  layout: 'stack',
  controls: [
    { id: 'sidebar', type: 'Sidebar', component: Sidebar, position: { order: 1 } },
    { id: 'stats', type: 'StatsCard', component: StatsCard, position: { order: 2 } },
    { id: 'projects', type: 'ProjectCard', component: ProjectCard, position: { order: 3 } },
  ],
};
export default skeleton;
