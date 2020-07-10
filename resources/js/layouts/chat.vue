<template>
  <va-app
    :desktop-sidebar-width="desktopSidebarWidth"
    :desktop-minibar-width="desktopMinibarWidth"
    :desktop-topbar-height="desktopTopbarHeight"

    :mobile-sidebar-width="mobileSidebarWidth"
    :mobile-minibar-width="mobileMinibarWidth"
    :mobile-topbar-height="mobileTopbarHeight"

    :sidebar-priority="sidebarPriority"
    :minibar-priority="minibarPriority"
    :reverse="reverse"
    :split="split"
    :rtl="rtl"
  >
    <minibar />
    <sidebar />
    <va-page size="lg">
      <va-row v-if="loading" :gutter="gutter" class="text-align-center">
        <va-column :xs="12" :sm="12" :md="12" :lg="12">
          <div class="loader">
            <va-loading v-if="loading" size="lg" color="blue" />
          </div>
        </va-column>
      </va-row>
      <child v-else />
    </va-page>
  </va-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Minibar from '~/components/Minibar'
import Sidebar from '~/components/Sidebar'

export default {
  name: 'ChatLayout',

  components: {
    Minibar,
    Sidebar
  },

  data: () => {
    return {
      gutter: 15,
      desktopSidebarWidth: 240,
      desktopMinibarWidth: 64,
      desktopTopbarHeight: 0,

      mobileSidebarWidth: 0,
      mobileMinibarWidth: 0,
      mobileTopbarHeight: 0,

      sidebarPriority: false,
      minibarPriority: false,
      rtl: false,
      reverse: false,
      split: false
    }
  },

  computed: {
    ...mapState('auth', ['user']),
    loading () {
      return this.$store.state.loading
    }
  },

  beforeMount () {
    this.START_AUI_LOADING()
    this.$store.dispatch('twilio/setup', this.user).then(() => {
      if (this.$route.params.hasOwnProperty('channel')) {
        this.$store.dispatch('twilio/openChannel', this.$route.params.channel)
      }
      this.STOP_AUI_LOADING()
    })
  },

  methods: {
    ...mapActions([
      'START_AUI_LOADING',
      'STOP_AUI_LOADING'
    ])
  }
}
</script>
