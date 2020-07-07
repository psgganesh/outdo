<template>
  <va-row v-if="loading" :gutter="gutter" class="text-align-center full-height">
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <div>
        <va-loading v-if="loading" size="lg" color="blue" />
      </div>
    </va-column>
  </va-row>
  <va-row v-else :gutter="gutter">
    <va-column class="swimlane" :xs="12" :sm="6" :md="3" :lg="3">
      <h4>{{ swimlanes.backlog }}</h4>
      <draggable
        v-model="backlogIssues"
        v-bind="{ group: 'issues' }"
        ghostClass="ghost"
        animation="150"
        easing="cubic-bezier(1, 0, 0, 1)"
        class="lane"
      >
        <template v-for="issue in backlogIssues">
          <va-card :key="issue.id" :elevation="elevation" :padding="padding" class="card">
            <div slot="topLeft">
              <va-badge type="default">
                {{ `Issue #${issue.id}` }}
              </va-badge>
            </div>
            <div slot="topRight">
              <va-lozenge uppercase type="primary">
                {{ issue.state }}
              </va-lozenge>
            </div>
            <h3>
              {{ issue.title }}
            </h3>
          </va-card>
        </template>
      </draggable>
    </va-column>

    <va-column class="swimlane" :xs="12" :sm="6" :md="3" :lg="3">
      <h4>{{ swimlanes.open }}</h4>
      <draggable
        v-model="openIssues"
        v-bind="{ group: 'issues' }"
        ghostClass="ghost"
        animation="150"
        easing="cubic-bezier(1, 0, 0, 1)"
        class="lane"
      >
        <template v-for="issue in openIssues">
          <va-card :key="issue.id" :elevation="elevation" :padding="padding" class="card">
            <div slot="topLeft">
              <va-badge type="default">
                {{ `Issue #${issue.id}` }}
              </va-badge>
            </div>
            <div slot="topRight">
              <va-lozenge uppercase type="primary">
                {{ issue.state }}
              </va-lozenge>
            </div>
            <h3>
              {{ issue.title }}
            </h3>
          </va-card>
        </template>
      </draggable>
    </va-column>

    <va-column class="swimlane" :xs="12" :sm="6" :md="3" :lg="3">
      <h4>{{ swimlanes.resolved }}</h4>
      <draggable
        v-model="resolvedIssues"
        v-bind="{ group: 'issues' }"
        ghostClass="ghost"
        animation="150"
        easing="cubic-bezier(1, 0, 0, 1)"
        class="lane"
      >
        <template v-for="issue in resolvedIssues">
          <va-card :key="issue.id" :elevation="elevation" :padding="padding" class="card">
            <div slot="topLeft">
              <va-badge type="default">
                {{ `Issue #${issue.id}` }}
              </va-badge>
            </div>
            <div slot="topRight">
              <va-lozenge uppercase type="primary">
                {{ issue.state }}
              </va-lozenge>
            </div>
            <h3>
              {{ issue.title }}
            </h3>
          </va-card>
        </template>
      </draggable>
    </va-column>

    <va-column class="swimlane" :xs="12" :sm="6" :md="3" :lg="3">
      <h4>{{ swimlanes.deferred }}</h4>
      <draggable
        v-model="deferredIssues"
        v-bind="{ group: 'issues' }"
        ghostClass="ghost"
        animation="150"
        easing="cubic-bezier(1, 0, 0, 1)"
        class="lane"
      >
        <template v-for="issue in deferredIssues">
          <va-card :key="issue.id" :elevation="elevation" :padding="padding" class="card">
            <div slot="topLeft">
              <va-badge type="default">
                {{ `Issue #${issue.id}` }}
              </va-badge>
            </div>
            <div slot="topRight">
              <va-lozenge uppercase type="primary">
                {{ issue.state }}
              </va-lozenge>
            </div>
            <h3>
              {{ issue.title }}
            </h3>
          </va-card>
        </template>
      </draggable>
    </va-column>
  </va-row>
</template>

<script>
import Draggable from 'vuedraggable'
import { mapActions } from 'vuex'

export default {
  name: 'Issues',

  components: {
    Draggable
  },

  data: () => {
    return {
      swimlanes: {
        backlog: 'Backlog',
        open: 'Open',
        resolved: 'Resolved',
        deferred: 'Deferred'
      },
      elevation: 1,
      padding: 5,
      gutter: 5
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },
    backlogIssues: {
      get () {
        return this.$store.state.bitbucket.backlogIssues
      },
      set (value) {
        const data = { type: 'backlogIssues', issue: value }
        this.$store.dispatch('bitbucket/updateIssue', data)
      }
    },
    openIssues: {
      get () {
        return this.$store.state.bitbucket.openIssues
      },
      set (value) {
        const data = { type: 'openIssues', issue: value }
        this.$store.dispatch('bitbucket/updateIssue', data)
      }
    },
    resolvedIssues: {
      get () {
        return this.$store.state.bitbucket.resolvedIssues
      },
      set (value) {
        const data = { type: 'resolvedIssues', issue: value }
        this.$store.dispatch('bitbucket/updateIssue', data)
      }
    },
    deferredIssues: {
      get () {
        return this.$store.state.bitbucket.deferredIssues
      },
      set (value) {
        const data = { type: 'deferredIssues', issue: value }
        this.$store.dispatch('bitbucket/updateIssue', data)
      }
    }
  },

  beforeMount () {
    this.$store.commit('bitbucket/RESET_ISSUES_LIST')
  },

  mounted () {
    const user = this.$store.state.auth.user
    this.START_AUI_LOADING()
    const request = {
      slug: this.$route.params.repository,
      workspace: `{${user.uuid}}`
    }
    this.$store.dispatch('bitbucket/issues', request).then(() => {
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
