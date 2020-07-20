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
    <div class="container full-height white-section">
      <va-page size="lg">
        <child />
      </va-page>
    </div>
  </va-app>
</template>

<script>
export default {
  name: 'FlowLayout',

  data: () => {
    return {
      desktopSidebarWidth: 0,
      desktopMinibarWidth: 0,
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
  }
}
</script>

<style scoped>
.full-height {
  height: 98vh;
}
.white-section {
  background: #FFF;
}
</style>
