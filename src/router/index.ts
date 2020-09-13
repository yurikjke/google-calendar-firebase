import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import AuthGuard from './guards/auth';

Vue.use(VueRouter);

const LoginPage = () => import('@/pages/login/LoginPage.vue');
const EventPage = () => import('@/pages/event/EventPage.vue');
const EventListPage = () => import('@/pages/event/EventListPage.vue');

const routes: RouteConfig[] = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/events',
    name: 'events',
    component: EventListPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/events/:id',
    name: 'event',
    component: EventPage,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(AuthGuard);

export default router;
