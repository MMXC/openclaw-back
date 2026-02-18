/**
 * 页面骨架配置
 */

import { AuthCard } from './controls/AuthCard';
import { SocialLogin } from './controls/SocialLogin';

export interface PageSkeleton {
  layout: 'stack' | 'grid' | 'absolute';
  controls: Array<{
    id: string;
    type: string;
    component: React.FC<any>;
    position: { order: number };
    size: { width: number | string; height?: number | string };
    props?: Record<string, any>;
  }>;
}

export const authSkeleton: PageSkeleton = {
  layout: 'stack',
  controls: [
    {
      id: 'authCard',
      type: 'AuthCard',
      component: AuthCard,
      position: { order: 1 },
      size: { width: 400, height: 'auto' },
      props: { mode: 'login' },
    },
    {
      id: 'socialLogin',
      type: 'SocialLogin',
      component: SocialLogin,
      position: { order: 0 },
      size: { width: '100%' },
      props: { platforms: ['wechat', 'dingtalk'] },
    },
  ],
};

export default authSkeleton;
