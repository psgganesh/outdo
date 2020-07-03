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
    <!-- <topbar /> -->
    <div class="container-fluid padded-white-section">
      <child />
      <div class="container-fluid footer" />
    </div>
  </va-app>
</template>

<script>
// import Topbar from '~/components/Topbar'

export default {
  name: 'BasicLayout',

  components: {
    // Topbar
  },

  data: () => {
    return {
      desktopSidebarWidth: 0,
      desktopMinibarWidth: 0,
      desktopTopbarHeight: 50,

      mobileSidebarWidth: 0,
      mobileMinibarWidth: 0,
      mobileTopbarHeight: 50,

      sidebarPriority: false,
      minibarPriority: false,
      rtl: false,
      reverse: false,
      split: false
    }
  }
}
</script>

<style scoped>
.padded-white-section {
  padding-top: 50px;
  background: #FFF;
}
.footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 300px;
  background-color: #FFF;
  background-image: url(https://wac-cdn.atlassian.com/dam/jcr:6db86e6a-a05c-414c-a3e9-58db75bce1bb/left_bottom_hero.png?cdnVersion=1109) , url(https://wac-cdn.atlassian.com/dam/jcr:42a7d2a5-669b-44c9-8980-9f83600ab4d9/right_bottom_hero.png?cdnVersion=1109);
  background-position: bottom left , bottom right;
  background-repeat: no-repeat , no-repeat;
  background-size: 600px 300px , 600px 300px;
}
</style>
