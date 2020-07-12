<template>
  <va-row v-if="loading" :gutter="gutter" class="text-align-center full-height">
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <div>
        <va-loading v-if="loading" size="lg" color="blue" />
      </div>
    </va-column>
  </va-row>
  <div v-else>
    <breadcrumb :title="workspaceTitle" :subtitle="subtitle" />
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
  </div>
</template>

<script>
import moment from 'moment'
import Avatar from 'vue-avatar'
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Workspaces',

  middleware: ['auth', 'bitbucket-client', 'twilio-client', 'bitbucket-set-repositories'],

  components: {
    Avatar,
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('workspace') }
  },

  data: () => {
    return {
      gutter: 25,
      hover: true,
      size: 'lg',
      subtitle: 'Repositories under the workspace'
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },
    repositories () {
      return this.$store.state.bitbucket.repositories
    },
    workspaceTitle () {
      return (this.$route.params.workspace !== this.$store.state.auth.user.username)
        ? this.$t('workspace')
        : this.$t('your_workspace')
    }
  },

  methods: {
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
