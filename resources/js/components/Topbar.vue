<template>
  <va-topbar theme="primary">
    <div slot="left">
      <a href="https://atlassian.net/" target="_blank">
        <va-icon icon-style="brands" padding="15px" size="1.5em" type="atlassian" /> Powered by Atlassian
      </a>
    </div>
    <div slot="center">
      <va-icon type="icon-spinner10" style="font-size: 2.7em;color: #0154d1;" />
      <h1 class="title">
        Outdo
      </h1>
    </div>
    <div slot="right">
      <a href="https://twitter.com/Outdoofficial" target="_blank">
        <va-icon icon-style="brands" padding="15px" size="1.5em" type="twitter" />
      </a>
      <a href="https://www.facebook.com/outdoofficial" target="_blank">
        <va-icon icon-style="brands" padding="15px" size="1.5em" type="facebook" />
      </a>
      <a href="https://www.youtube.com/channel/UCFp0PYa9-KcWTsH0RCfs_Wg" target="_blank">
        <va-icon icon-style="brands" padding="15px" size="1.5em" type="youtube" />
      </a>
    </div>
  </va-topbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Topbar',

  data: () => ({
    appName: window.config.appName
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  methods: {
    async logout () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.title {
  margin: 0px 10px;
  letter-spacing: 0.1em;
  font-size: 2.7em;
  color: #0048b0;
}
</style>
