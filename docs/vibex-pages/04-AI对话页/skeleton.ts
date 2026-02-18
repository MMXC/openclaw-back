import { ChatPanel, ChatSidebar } from './controls';

export const skeleton = {
  layout: 'stack',
  controls: [
    { id: 'chat', type: 'ChatPanel', component: ChatPanel, position: { order: 1 } },
    { id: 'sidebar', type: 'ChatSidebar', component: ChatSidebar, position: { order: 2 } },
  ],
};
export default skeleton;
