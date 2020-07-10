<template>
  <va-row>
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
            <tr v-for="(repository, index) in repositories" :key="index" class="space" @click="openSpace(repository)">
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

  methods: {
    ...mapActions([
      'START_AUI_LOADING',
      'STOP_AUI_LOADING'
    ]),
    humanReadableDate (timestamp) {
      return (timestamp !== null) ? moment.utc(timestamp).fromNow() : ''
    },
    openSpace (repository) {
      this.$router.push({ name: 'space',
        params: {
          workspace: repository.workspace.slug,
          repository: repository.slug
        }
      })
    }
  }
}
</script>

<style scoped>
.text-align-center {
  text-align: -webkit-center;
}
.full-height {
  height: 100vh;
}
</style>
