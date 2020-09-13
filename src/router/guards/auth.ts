import { auth } from '@/firebase';
import { NavigationGuard } from 'vue-router';

const AuthGuard: NavigationGuard = (to, from, next) => {
  const { currentUser } = auth;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next({ name: 'login' });
  else if (!requiresAuth && currentUser) next({ name: 'events' });
  else next();
};

export default AuthGuard;
