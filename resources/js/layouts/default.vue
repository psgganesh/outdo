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
      <child v-if="loadingComplete" />
    </va-page>
  </va-app>
</template>

<script>
import Minibar from '~/components/Minibar'
import Sidebar from '~/components/Sidebar'

export default {
  name: 'MainLayout',

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
    loadingComplete () {
      return !this.$store.state.loading
    }
  },

  methods: {
    addNewMember () {
      alert('Test')
    }
  }

}
</script>
