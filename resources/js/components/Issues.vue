<template>
  <div>
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
        <va-button icon-before="plus" type="default" class="m-b-10" @click.stop="openIssueModalForm('on hold')">
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
        <va-button icon-before="plus" type="default" class="m-b-10" @click.stop="openIssueModalForm('open')">
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
        <va-button icon-before="plus" type="default" class="m-b-10" @click.stop="openIssueModalForm('invalid')">
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
        <va-button icon-before="plus" type="default" class="m-b-10" @click.stop="openIssueModalForm('resolved')">
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

    <va-modal ref="openIssueModal" :width="modal.width" :backdrop-clickable="modal.backdropClickable">
      <div slot="header" style="padding: 10px 20px;">
        <h2>Add new member</h2>
      </div>
      <div slot="body" style="height:120px;text-align:center;">
        <va-form ref="form" :type="form.orientation">
          <va-form-item need>
            <va-input
              v-model="form.memberName"
              name="memberName"
              icon-style="solid"
              icon="at"
              autocomplete="off"
              placeholder="Add a member by bitbucket username"
              :rules="[{type:'required', tip:'Sorry, we need a valid bitbucket username'}]"
            />
          </va-form-item>
        </va-form>
      </div>
      <div slot="footer" style="margin-top:40px;margin-right:10px;">
        <div style="margin-top: 10px; text-align: right;">
          <va-button type="primary" @click.stop="addIssue">
            Submit
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
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
      swimlanes: {
        backlog: 'On hold',
        open: 'Open',
        deferred: 'Deferred',
        resolved: 'Resolved'
      },
      elevation: 1,
      padding: 5,
      gutter: 5,
      form: {
        orientation: 'vertical',
        title: null,
        state: null
      },
      modal: {
        width: '500px',
        backdropClickable: true
      }
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

  methods: {
    getOptions () {
      return { group: 'issues' }
    },
    openIssueModalForm (type) {
      this.form.state = type
      this.$refs.openIssueModal.open()
    },
    addMember () {
      const newIssueFormData = this.form
      this.$store.dispatch('bitbucket/createIssue', newIssueFormData).then(() => {
        this.$refs.openIssueModal.close()
      })
    }
  }
}
</script>
