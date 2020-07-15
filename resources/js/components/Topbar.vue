<template>
  <va-topbar theme="primary">
    <div slot="center">
      <va-icon type="icon-spinner10" style="font-size: 2.7em;color: #0154d1;" />
      <h1 class="title">
        Outdo
      </h1>
    </div>
    <div slot="right" />
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
  font-size: -webkit-xxx-large;
  color: #0048b0;
}
</style>
