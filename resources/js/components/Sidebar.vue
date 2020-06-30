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
          name: 'Spaces',
          route: '/spaces',
          icon: 'pencil-ruler',
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
          name: 'Conversations',
          route: '/conversations',
          icon: 'comment-dots',
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
