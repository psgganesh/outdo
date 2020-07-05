<template>
  <va-row v-if="loading" :gutter="gutter" class="text-align-center full-height">
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
              <th>Name</th>
              <th>Size</th>
              <th>Last commit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, index) in files" :key="index" class="space">
              <td><va-icon :type="fileIcon(file.type)" padding="4px" />{{ file.path }}</td>
              <td>{{ (Object.is(file.size, null)) ? null : file.size }}</td>
              <td>{{ file.commit.hash }}</td>
            </tr>
          </tbody>
        </table>
      </va-table>
    </va-column>
  </va-row>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'Files',

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
    files () {
      return this.$store.state.bitbucket.files
    }
  },

  beforeMount () {
    this.$store.commit('bitbucket/RESET_REPOSITORY_LIST')
  },

  mounted () {
    const user = this.$store.state.auth.user
    this.START_AUI_LOADING()
    const request = {
      slug: this.$route.params.repository,
      workspace: `{${user.uuid}}`
    }
    this.$store.dispatch('bitbucket/files', request).then(() => {
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
    fileIcon (type) {
      return (type === 'commit_directory') ? 'folder' : 'file'
    }
  }
}
</script>
