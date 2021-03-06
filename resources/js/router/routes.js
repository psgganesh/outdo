function page (path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', name: 'welcome', component: page('welcome.vue') },
  { path: '/dashboard', name: 'dashboard', component: page('dashboard.vue') },
  { path: '/meetings/:room', name: 'meetings', component: page('meetings.vue') },
  { path: '/workspaces/:workspace/workflows/:id/view/:screen', name: 'flow', component: page('flow.vue') },
  { path: '/workspaces/:workspace/workflows/:repository/:id', name: 'workflow', component: page('workflow.vue') },
  { path: '/workspaces/:workspace/:repository', name: 'space', component: page('space.vue') },
  { path: '/workspaces/:workspace', name: 'workspaces', component: page('workspaces.vue') },
  { path: '/conversations/:channel', name: 'conversations.channel', component: page('conversations.vue') },
  { path: '*', component: page('errors/404.vue') }
]
