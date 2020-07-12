<template>
  <va-row v-if="loading" :gutter="gutter" class="text-align-center full-height">
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <div>
        <va-loading v-if="loading" size="lg" color="blue" />
      </div>
    </va-column>
  </va-row>
  <div v-else>
    <breadcrumb :title="this.$t('dashboard')" :subtitle="subtitle" />
    <va-row>
      <va-column :xs="12" :sm="12" :md="12" :lg="12">
        <va-table :hover="hover" :size="size">
          <table>
            <thead>
              <tr>
                <th colspan="2">
                  Workspace
                </th>
                <th>Slug</th>
                <th>Created on</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(workspace, index) in workspaces" :key="index" class="space" @click="openWorkspace(workspace)">
                <td><avatar :src="workspace.links.avatar.href" :size="28" /></td>
                <td>{{ workspace.name }}</td>
                <td>{{ workspace.slug }}</td>
                <td>{{ humanReadableDate(workspace.created_on) }}</td>
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
import { mapActions } from 'vuex'
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Dashboard',

  middleware: ['auth', 'bitbucket-client', 'twilio-client'],

  components: {
    Avatar,
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('dashboard') }
  },

  data: () => {
    return {
      gutter: 25,
      hover: true,
      size: 'lg',
      subtitle: 'Your dashboard'
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },
    workspaces () {
      return this.$store.state.bitbucket.workspaces
    }
  },

  async beforeCreate () {
    const oauthToken = this.$store.state.auth.oauthToken
    const params = { oauthToken: oauthToken }
    this.START_AUI_LOADING()
    await this.$store.dispatch('bitbucket/workspaces', params).then(() => {
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
    },
    openWorkspace (workspace) {
      this.$router.push({ name: 'workspaces',
        params: {
          workspace: workspace.slug
        }
      })
    }
  }
}
</script>
