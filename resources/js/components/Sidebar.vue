<template>
  <div>
    <va-sidebar :theme="sidebarTheme">
      <va-sidebar-group id="brand" :items="coreItems" title="Outdo" :default-open-level="1" />
      <va-sidebar-group id="conversations" :items="channelItems" title="Conversations" :default-open-level="1" />
    </va-sidebar>
  </div>
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
          name: 'Dashboard',
          route: '/dashboard',
          icon: 'home',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Your workspace',
          route: `/workspaces/${this.$store.state.auth.user.username}`,
          icon: 'pencil-ruler',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Meetings',
          class: 'meetings',
          route: '/meetings',
          icon: 'chalkboard',
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
    }),
    channelItems () {
      let channels = this.conversationItems
      return channels
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
