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
    <va-topbar theme="blue">
      <div slot="left">
        <va-dropdown>
          <div slot="trigger">
            <va-button type="primary-dark" round>
              <va-icon type="bars" color="white" />
            </va-button>
          </div>
          <li>
            <router-link :to="'/'">
              Home
            </router-link>
          </li>
          <li>
            <router-link :to="'/documentation'">
              Documentation
            </router-link>
          </li>
        </va-dropdown>

        <span style="font-weight:700;margin:0 20px 0 10px;">
          Documentation
        </span>

        <va-dropdown style="margin-right: 10px;">
          <div slot="trigger">
            <va-button type="primary-dark">
              Templates
              <va-icon type="angle-down" margin="0 2px 0 10px" />
            </va-button>
          </div>
          <li>
            <router-link to="/templates/signin">
              Sign-in
            </router-link>
          </li>
        </va-dropdown>
      </div>
      <div slot="right">
        <va-input icon="search" style="margin-right:7px;" />
        <va-button type="primary-dark" round>
          <va-icon type="cog" size="1.25em" />
        </va-button>
      </div>
    </va-topbar>
    <va-page>
      <child />
    </va-page>
  </va-app>
</template>

<script>
export default {
  name: 'BasicLayout',
  data: () => {
    return {
      desktopSidebarWidth: 240,
      desktopMinibarWidth: 64,
      desktopTopbarHeight: 42,

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
