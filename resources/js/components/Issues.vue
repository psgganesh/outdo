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
          <va-card :key="`backlogIssues_${issue.id}`" :elevation="elevation" :padding="padding" class="card">
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
          <va-card :key="`openIssues_${issue.id}`" :elevation="elevation" :padding="padding" class="card">
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
          <va-card :key="`deferredIssues_${issue.id}`" :elevation="elevation" :padding="padding" class="card">
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
          <va-card :key="`resolvedIssues_${issue.id}`" :elevation="elevation" :padding="padding" class="card">
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
        if (value.length > 0) {
          const [ issue ] = value
          const request = {
            type: 'on hold',
            issue: issue
          }
          this.$store.dispatch('bitbucket/updateIssue', request)
        }
      }
    },
    openIssues: {
      get () {
        return this.$store.state.bitbucket.openIssues
      },
      set (value) {
        if (value.length > 0) {
          const [ issue ] = value
          const request = {
            type: 'open',
            issue: issue
          }
          this.$store.dispatch('bitbucket/updateIssue', request)
        }
      }
    },
    resolvedIssues: {
      get () {
        return this.$store.state.bitbucket.resolvedIssues
      },
      set (value) {
        if (value.length > 0) {
          const [ issue ] = value
          const request = {
            type: 'resolved',
            issue: issue
          }
          this.$store.dispatch('bitbucket/updateIssue', request)
        }
      }
    },
    deferredIssues: {
      get () {
        return this.$store.state.bitbucket.deferredIssues
      },
      set (value) {
        if (value.length > 0) {
          const [ issue ] = value
          const request = {
            type: 'invalid',
            issue: issue
          }
          console.log(request)
          this.$store.dispatch('bitbucket/updateIssue', request)
        }
      }
    }
  },

  async beforeCreate () {
    const slug = this.$route.params.repository
    const request = { slug: slug }
    await this.$store.dispatch('bitbucket/issues', request)
    this.loading = false
  }
}
</script>
