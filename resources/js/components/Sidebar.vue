<template>
  <va-sidebar :theme="sidebarTheme">
    <va-sidebar-group id="brand" :items="coreItems" title="Outdo" :default-open-level="1" />
    <va-sidebar-group id="conversations" :items="conversationItems" title="Conversations" :default-open-level="1" />
  </va-sidebar>
</template>

<script>
import { mapGetters } from 'vuex'

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
          name: 'Team',
          route: '/team',
          icon: 'mug-hot',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      conversationItems: 'twilio/conversationItems'
    })
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
