<template>
  <va-row v-if="loading" :gutter="gutter" class="text-align-center">
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <div>
        <va-loading v-if="loading" size="lg" color="blue" />
      </div>
    </va-column>
  </va-row>
  <va-row v-else>
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <va-table :hover="hover" :size="size">
        <table>
          <thead>
            <tr>
              <th colspan="2">
                Repository
              </th>
              <th colspan="2">
                Author
              </th>
              <th>Default branch</th>
              <th>Last updated on</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(repository, index) in repositories" :key="index">
              <td><avatar :src="repository.links.avatar.href" :size="28" /></td>
              <td>{{ repository.full_name }}</td>
              <td><avatar :src="repository.owner.links.avatar.href" :size="28" /></td>
              <td>{{ repository.owner.display_name }}</td>
              <td><va-icon color="primary" padding="5px" type="code-branch" />{{ repository.mainbranch.name }}</td>
              <td>{{ humanReadableDate(repository.updated_on) }}</td>
            </tr>
          </tbody>
        </table>
      </va-table>
    </va-column>
  </va-row>
</template>

<script>
import moment from 'moment'
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
    ]),
    humanReadableDate (timestamp) {
      return (timestamp !== null) ? moment.utc(timestamp).fromNow() : ''
    }
  }
}
</script>

<style scoped>
.text-align-center {
  text-align: -webkit-center;
}
</style>
