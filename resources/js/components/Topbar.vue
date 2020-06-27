<template>
  <va-topbar theme="primary">
    <div slot="left">
      <va-icon type="bars" color="primary" />
      <span style="font-weight:700;margin:0 20px 0 10px;">
        Outdo
      </span>
    </div>
    <div v-if="!user" slot="right">
      <login-with-bitbucket />
    </div>
  </va-topbar>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginWithBitbucket from '~/components/LoginWithBitbucket'

export default {
  name: 'Topbar',

  components: {
    LoginWithBitbucket
  },

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
.profile-photo {
  width: 2rem;
  height: 2rem;
  margin: -.375rem 0;
}
</style>
