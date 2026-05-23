import { createRouter, createWebHistory } from 'vue-router';
import { watch } from 'vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/', 
    name: 'motion', 
    component: () => import('@/views/login/MotionView.vue') 
    },
    {
      path: '/start',
      name: 'start-view',
      component: () => import('@/views/login/StartView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
    },
    {
      path: '/login-create',
      name: 'login-create',
      component: () => import('@/views/login/LoginCreateView.vue'),
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: () => import('@/views/login/CreateUserView.vue'),
    },
    {
      path: '/customer',
      meta: { role: 'customer', layout: 'mobile' },
      children: [
        {
          path: '',
          name: 'customer-dashboard',
          meta: { title: 'Mit Hus' },
          component: () => import('@/views/customer/DashboardView.vue'),
        },
        {
          path: 'process',
          name: 'customer-process',
          meta: { title: 'Byggeforløb' },
          component: () => import('@/views/customer/ProcessView.vue'),
        },
        {
          path: 'process/:id',
          name: 'customer-process-details',
          meta: { title: 'VÆGGE', layout: 'detail' },
          component: () => import('@/views/customer/ProcessDetailsView.vue'),
        },
        {
          path: 'chat-options',
          name: 'customer-chat-options',
          meta: { title: 'Chat'},
          component: () => import('@/views/customer/ChatOptionsView.vue'),
        },
        {
          path: 'chat',
          name: 'customer-chat',
          meta: { title: 'Chat', layout: 'detail' },
          component: () => import('@/views/customer/ChatView.vue'),
        },
        {
          path: 'faq',
          name: 'customer-faq',
          meta: { title: 'FAQ', layout: 'detail' },
          component: () => import('@/views/customer/FAQView.vue'),
        },
        {
          path: 'documents',
          name: 'customer-documents',
          meta: { title: 'Dokumenter' },
          component: () => import('@/views/customer/DocumentsView.vue'),
        },
        {
          path: 'settings',
          name: 'customer-settings',
          meta: { title: 'Indstillinger', layout: 'detail' },
          component: () => import('@/views/customer/SettingsView.vue')
        },
      ]
    },
    {
      path: '/manager',
      meta: { role: 'manager', layout: 'mobile' },
      children: [
        {
          path: '',
          name: 'manager-dashboard',
          meta: { title: 'BYGGELEDER' },
          component: () => import('@/views/manager/ManagerDashboardView.vue')
        },
        {
          path: 'projects',
          name: 'manager-projects',
          meta: { title: 'Projekter' },
          component: () => import('@/views/manager/ProjectsView.vue')
        },
        {
          path: 'projects/:id',
          name: 'manager-project-details',
          meta: { title: 'Projekt Detaljer', layout: 'detail'},
          component: () => import('@/views/manager/ProjectDetailView.vue')
        },
        {
          path: 'projects/:projectId/phases',
          name: 'manager-process',
          meta: { title: 'Byggeforløb', layout: 'detail' },
          component: () => import('@/views/manager/ProcessView.vue')
        },
        {
          path: 'chat/:projectId',
          name: 'manager-chat',
          meta: { title: 'Chat', layout: 'detail' },
          component: () => import('@/views/manager/ChatView.vue')
        },
        {
          path: 'projects/:projectId/phases/:id',
          name: 'manager-process-details',
          meta: { title: 'Fase Detaljer', layout: 'detail' },
          component: () => import('@/views/manager/ProcessDetailsView.vue')
        },
        {
          path: 'chat-options',
          name: 'manager-chat-options',
          meta: { title: 'Chat' },
          component: () => import('@/views/manager/ChatOptionsView.vue')
        },
        {
          path: 'chat-list',
          name: 'manager-chat-list',
          meta: { title: 'Igangværende Chats', layout: 'detail' },
          component: () => import('@/views/manager/ChatListView.vue')
        },
        {
          path: 'create-project',
          name: 'manager-create-project',
          meta: { title: 'Opret Projekt', layout: 'detail' },
          component: () => import('@/views/manager/CreateProjectView.vue')
        },
        {
          path: 'projects/:projectId/documents',
          name: 'manager-documents',
          meta: { title: 'Dokumenter', layout: 'detail' },
          component: () => import('@/views/manager/DocumentsView.vue')
        },
        {
          path: 'settings',
          name: 'manager-settings',
          meta: { title: 'Indstillinger', layout: 'detail' },
          component: () => import('@/views/manager/SettingsView.vue')
        },
      ]
    },
  ],
});

// Navigation Guard
router.beforeEach(async (to) => {
  const auth = useAuthStore();
  const publicRoutes = ['motion', 'start-view', 'login', 'login-create', 'create-user'];

  // Vent på at auth-state er bekræftet, så reload ikke fejl redirecter
  if (!auth.ready) {
    await new Promise((resolve) => {
      const unwatch = watch(() => auth.ready, (val) => {
        if (val) {
          unwatch();
          resolve();
        }
      });
    });
  }

  // Public routes kræver ikke login
  if (publicRoutes.includes(to.name)) return true;

  // Ikke logget ind til login
  if (!auth.user) return { name: 'login' };

  // Logget ind, men forkert rolle til eget dashboard
  const requiredRole = to.matched.find((r) => r.meta.role)?.meta.role;
  if (requiredRole && auth.role !== requiredRole) {
    return { name: auth.isManager ? 'manager-dashboard' : 'customer-dashboard' };
  }
});

export default router;



