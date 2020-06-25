<template>
  <va-sidebar :theme="sidebarTheme">
    <va-sidebar-group :items="coreItems" title="Outdo" :default-open-level="0" />
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
          name: 'Home',
          route: '/home',
          icon: 'home',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Projects',
          route: '/projects',
          icon: 'folder',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Team',
          route: '/team',
          icon: 'mug-hot',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Tasks',
          route: '/tasks',
          icon: 'tasks',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Meetings',
          route: '/board',
          icon: 'chalkboard',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
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
