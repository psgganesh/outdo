function page (path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', name: 'welcome', component: page('welcome.vue') },
  { path: '/dashboard', name: 'dashboard', component: page('dashboard.vue') },
  { path: '/meetings/:room', name: 'meetings', component: page('meetings.vue') },
  { path: '/workspaces/:workspace', name: 'workspaces', component: page('workspaces.vue') },
  { path: '/workspaces/:workspace/:repository', name: 'space', component: page('space.vue') },
  { path: '/conversations/:channel', name: 'conversations.channel', component: page('conversations.vue') },
  { path: '*', component: page('errors/404.vue') }
]
