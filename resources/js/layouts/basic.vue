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
    <topbar />
    <div class="container-fluid full-height grey-section">
      <child />
      <div class="footer">
        <va-card elevation="0" style="background: transparent;">
          Most compatible with
          <br><br>
          <img src="/images/icons8-brave-web-browser-100.png" width="50px" height="50px">
          <img src="/images/icons8-chrome-100.png" width="50px" height="50px">
          <img src="/images/icons8-chromium-100.png" width="50px" height="50px">
          <img src="/images/icons8-opera-100.png" width="50px" height="50px">
          <h4>If you have issues while logging with Bitbucket for the first time, please consider restarting your browser.</h4>
        </va-card>
        <h6>
          <a target="_blank" href="https://icons8.com/icons/set/opera--v1">Opera</a>,
          <a target="_blank" href="https://icons8.com/icons/set/chromium">Chromium</a>
          and other icons by <a target="_blank" href="https://icons8.com">Icons8</a>
        </h6>
      </div>
    </div>
  </va-app>
</template>

<script>
import Topbar from '~/components/Topbar'

export default {
  name: 'BasicLayout',

  components: {
    Topbar
  },

  data: () => {
    return {
      desktopSidebarWidth: 0,
      desktopMinibarWidth: 0,
      desktopTopbarHeight: 60,

      mobileSidebarWidth: 0,
      mobileMinibarWidth: 0,
      mobileTopbarHeight: 60,

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
.grey-section {
  background: #f4f5f7;
}
.footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 300px;
  text-align: -webkit-center;
  background-color: transparent;
  background-image: url(https://wac-cdn.atlassian.com/dam/jcr:6db86e6a-a05c-414c-a3e9-58db75bce1bb/left_bottom_hero.png?cdnVersion=1109) , url(https://wac-cdn.atlassian.com/dam/jcr:42a7d2a5-669b-44c9-8980-9f83600ab4d9/right_bottom_hero.png?cdnVersion=1109);
  background-position: bottom left , bottom right;
  background-repeat: no-repeat , no-repeat;
  background-size: 600px 300px , 600px 300px;
}
</style>
