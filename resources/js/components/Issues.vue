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
      <h3>{{ swimlanes.backlog }}</h3>
      <va-button icon-before="plus" type="default" class="m-b-10">
        Add a backlog
      </va-button>
      <draggable
        v-model="backlogIssues"
        v-bind="getOptions()"
        ghostClass="ghost"
        animation="150"
        easing="cubic-bezier(1, 0, 0, 1)"
        class="lane"
      >
        <template v-for="issue in backlogIssues">
          <va-card :key="`backlogIssues_${issue.id}`" :elevation="elevation" :padding="padding" class="card m-b-10">
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
      <h3>{{ swimlanes.open }}</h3>
      <va-button icon-before="plus" type="default" class="m-b-10">
        Add an open issue
      </va-button>
      <draggable
        v-model="openIssues"
        v-bind="getOptions()"
        ghostClass="ghost"
        animation="150"
        easing="cubic-bezier(1, 0, 0, 1)"
        class="lane"
      >
        <template v-for="issue in openIssues">
          <va-card :key="`openIssues_${issue.id}`" :elevation="elevation" :padding="padding" class="card m-b-10">
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
      <h3>{{ swimlanes.deferred }}</h3>
      <va-button icon-before="plus" type="default" class="m-b-10">
        Raise an invalid issue
      </va-button>
      <draggable
        v-model="deferredIssues"
        v-bind="getOptions()"
        ghostClass="ghost"
        animation="150"
        easing="cubic-bezier(1, 0, 0, 1)"
        class="lane"
      >
        <template v-for="issue in deferredIssues">
          <va-card :key="`deferredIssues_${issue.id}`" :elevation="elevation" :padding="padding" class="card m-b-10">
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
      <h3>{{ swimlanes.resolved }}</h3>
      <va-button icon-before="plus" type="default" class="m-b-10">
        Add a resolved issue
      </va-button>
      <draggable
        v-model="resolvedIssues"
        v-bind="getOptions()"
        ghostClass="ghost"
        animation="150"
        easing="cubic-bezier(1, 0, 0, 1)"
        class="lane"
      >
        <template v-for="issue in resolvedIssues">
          <va-card :key="`resolvedIssues_${issue.id}`" :elevation="elevation" :padding="padding" class="card m-b-10">
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

export default {
  name: 'Issues',

  components: {
    Draggable
  },

  data: () => {
    return {
      loading: true,
      swimlanes: {
        backlog: 'On hold',
        open: 'Open',
        deferred: 'Deferred',
        resolved: 'Resolved'
      },
      elevation: 1,
      padding: 5,
      gutter: 5
    }
  },

  computed: {
    backlogIssues: {
      get () {
        return this.$store.state.bitbucket.backlogIssues
      },
      set (value) {
        const issue = value
        const request = {
          type: 'on hold',
          to: 'backlogIssues',
          issue: issue
        }
        this.$store.dispatch('bitbucket/updateIssue', request)
      }
    },
    openIssues: {
      get () {
        return this.$store.state.bitbucket.openIssues
      },
      set (value) {
        const issue = value
        const request = {
          type: 'open',
          to: 'openIssues',
          issue: issue
        }
        this.$store.dispatch('bitbucket/updateIssue', request)
      }
    },
    resolvedIssues: {
      get () {
        return this.$store.state.bitbucket.resolvedIssues
      },
      set (value) {
        const issue = value
        const request = {
          type: 'resolved',
          to: 'resolvedIssues',
          issue: issue
        }
        this.$store.dispatch('bitbucket/updateIssue', request)
      }
    },
    deferredIssues: {
      get () {
        return this.$store.state.bitbucket.deferredIssues
      },
      set (value) {
        const issue = value
        const request = {
          type: 'invalid',
          to: 'deferredIssues',
          issue: issue
        }
        this.$store.dispatch('bitbucket/updateIssue', request)
      }
    }
  },

  async beforeCreate () {
    const slug = this.$route.params.repository
    const request = { slug: slug }
    await this.$store.dispatch('bitbucket/issues', request)
    this.loading = false
  },

  methods: {
    getOptions () {
      return { group: 'issues' }
    }
  }
}
</script>
