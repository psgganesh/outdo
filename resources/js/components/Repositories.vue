<template>
  <va-row v-if="loading" :gutter="gutter" class="text-align-center">
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <div>
        <va-loading v-if="loading" size="lg" color="blue" />
      </div>
    </va-column>
  </va-row>
  <va-row v-else>
    <va-column :xs="12" :sm="6" :md="5" :lg="5">
      <va-table :hover="hover" :size="size">
        <table>
          <thead>
            <tr>
              <th>Repository</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(repository, index) in repositories" :key="index">
              <td><avatar :src="repository.links.avatar.href" /> {{ repository.full_name }}</td>
              <td>{{ repository.owner.display_name }}</td>
            </tr>
          </tbody>
        </table>
      </va-table>
    </va-column>
    <va-column :xs="12" :sm="6" :md="7" :lg="7">
      <div>
        xs: 12, sm: 6, md: 8
      </div>
    </va-column>
  </va-row>
</template>

<script>
import Avatar from 'vue-avatar'
import { mapActions } from 'vuex'

export default {
  name: 'Repositories',

  components: {
    Avatar
  },

  data () {
    return {
      gutter: 25,
      hover: true,
      size: 'lg'
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },
    repositories () {
      return this.$store.state.bitbucket.repositories
    }
  },

  mounted () {
    const user = this.$store.state.auth.user
    this.START_AUI_LOADING()
    this.$store.dispatch('bitbucket/repositories', user).then(() => {
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

<style scoped>
.text-align-center {
  text-align: -webkit-center;
}
</style>
