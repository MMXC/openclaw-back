import { UserSettingsNav, AccountSettings } from './controls';

export const skeleton = {
  layout: 'stack',
  controls: [
    { id: 'nav', type: 'UserSettingsNav', component: UserSettingsNav, position: { order: 1 } },
    { id: 'content', type: 'AccountSettings', component: AccountSettings, position: { order: 2 } },
  ],
};
export default skeleton;
