<template>
  <va-topbar theme="primary">
    <div slot="center">
      <h1 class="title">
        <va-icon type="check-circle" /> Outdo
      </h1>
    </div>
    <div slot="right" />
  </va-topbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Topbar',

  components: {
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
