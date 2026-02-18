import { SettingsNav, ProjectSettings } from './controls';

export const skeleton = {
  layout: 'stack',
  controls: [
    { id: 'nav', type: 'SettingsNav', component: SettingsNav, position: { order: 1 } },
    { id: 'content', type: 'ProjectSettings', component: ProjectSettings, position: { order: 2 } },
  ],
};
export default skeleton;
