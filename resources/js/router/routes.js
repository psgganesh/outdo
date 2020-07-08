function page (path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', name: 'welcome', component: page('welcome.vue') },
  { path: '/workspaces', name: 'workspaces', component: page('workspaces.vue') },
  { path: '/workspaces/:workspace/:repository', name: 'space', component: page('space.vue') },
  { path: '/conversations', name: 'conversations', redirect: { name: 'conversations.channel', params: { channel: 'outdobot'} } },
  { path: '/conversations/:channel', name: 'conversations.channel', component: page('conversations.vue') },
  { path: '/settings',
    component: page('settings/index.vue'),
    children: [
      { path: '', redirect: { name: 'settings.profile' } },
      { path: 'profile', name: 'settings.profile', component: page('settings/profile.vue') },
      { path: 'password', name: 'settings.password', component: page('settings/password.vue') }
    ] },

  { path: '*', component: page('errors/404.vue') }
]
