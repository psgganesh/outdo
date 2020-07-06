<template>
  <va-sidebar :theme="sidebarTheme">
    <va-sidebar-group :items="coreItems" title="Outdo" :default-open-level="1" />
  </va-sidebar>
</template>

<script>
export default {
  name: 'Sidebar',

  data () {
    return {
      sidebarTheme: 'blue',
      coreItems: [
        {
          name: 'Workspaces',
          route: '/workspaces',
          icon: 'pencil-ruler',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Conversations',
          route: '/conversations',
          icon: 'comment-dots',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid',
          children: [
            { name: 'Installation', element: '#installation' },
            { name: 'Quickstart', element: '#quickstart' },
            { name: 'GitHub', external: 'https://github.com/nvms/vue-atlas' }
          ]
        }
      ]
    }
  },

  methods: {
    demoMethod () {
      this.VaModal.confirm({
        title: 'Hello!',
        message: `This modal exists to show how methods
        can be applied to Minibar items.`,
        type: 'info'
      })
    }
  }
}
</script>
