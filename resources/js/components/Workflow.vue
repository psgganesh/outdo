<template>
  <div id="workflows-list">
    <va-loading v-if="loading" size="lg" color="blue" center />
    <va-row :gutter="gutter">
      <va-column :xs="12" :sm="3" :md="2" :lg="2">
        <va-card id="create-new-workflow" :elevation="elevation" :padding="padding" class="card m-b-10" @click.stop="createWorkflow()">
          <h3><va-icon color="help" padding="5px" type="folder-plus" @click.stop="createWorkflow()" /> Create new workflow</h3>
          <div style="height:150px;" @click.stop="createWorkflow()">
            &nbsp;
          </div>
        </va-card>
      </va-column>
      <va-column v-for="workflow in workflows" :key="workflow.id" :xs="12" :sm="3" :md="2" :lg="2" style="padding-left:0px; padding-right:0px;">
        <va-card class="workflow card m-b-10" :elevation="elevation" :padding="padding" @click.stop="openWorkflow(workflow)">
          <div slot="topLeft" class="workflow-title">
            {{ workflow.name }}
          </div>
          <div slot="topRight">
            <va-lozenge uppercase type="warning">
              {{ `${workflow.screens_count} screens` }}
            </va-lozenge>
          </div>
          <div style="height:150px;" @click.stop="openWorkflow(workflow)">
            &nbsp;
          </div>
          <va-button icon-after="eye" block @click.stop="openWorkflow(workflow)">
            View Workflow
          </va-button>
        </va-card>
      </va-column>
    </va-row>
    <va-modal ref="createWorkflowModal" :width="modal.width" :backdrop-clickable="modal.backdropClickable">
      <div slot="header" style="padding: 10px 20px;">
        <h2>Create new workflow</h2>
      </div>
      <div slot="body" style="height:120px;text-align:center;">
        <va-form ref="form" :type="form.type">
          <va-form-item need>
            <va-input
              v-model="form.workflowName"
              name="workflowName"
              icon-style="solid"
              icon="folder-plus"
              autocomplete="off"
              placeholder="Name your new workflow"
              :rules="[{type:'required', tip:'Sorry, we need a valid name'}]"
            />
          </va-form-item>
        </va-form>
      </div>
      <div slot="footer" style="margin-top:40px;margin-right:10px;margin-bottom:20px;">
        <div style="margin-top: 10px; text-align: right;">
          <va-button :type="submitFormTypeState" :disabled="submitFormDisabledState" @click.stop="addWorkflow">
            Submit
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
export default {
  name: 'Workflow',

  data: () => {
    return {
      elevation: 1,
      padding: 5,
      gutter: 5,
      modal: {
        width: '500px',
        backdropClickable: true
      },
      form: {
        type: 'vertical',
        workflowName: null
      }
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },
    workflows () {
      return this.$store.state.outdo.workflows
    },
    submitFormDisabledState () {
      if (this.form.workflowName === '' || this.form.workflowName === null) {
        return true
      }
      return false
    },
    submitFormTypeState () {
      if (this.form.workflowName === '' || this.form.workflowName === null) {
        return 'default'
      }
      return 'success'
    }
  },

  methods: {
    createWorkflow () {
      this.$refs.createWorkflowModal.open()
    },
    async addWorkflow () {
      const workflowData = {
        name: this.form.workflowName,
        space: this.$route.params.workspace
      }
      this.$store.dispatch('outdo/createWorkflow', workflowData).then(() => {
        this.$refs.createWorkflowModal.close()
        this.openWorkflow(this.$store.state.outdo.active.workflow)
      })
    },
    openWorkflow (workflow) {
      this.$router.push({ name: 'workflow',
        params: {
          workspace: this.$route.params.workspace,
          repository: this.$route.params.repository,
          id: workflow.id
        }
      })
    }
  }
}
</script>

<style scoped>
.workflow-title {
  text-transform: capitalize;
}
#workflows-list {
  margin:10px 0px;
}
#create-new-workflow {
  cursor: pointer;
  text-align: center;
  background-color: #f0f3f9;
  border: 1px solid #d6dde4;
  height: 250px;
}
.workflow {
  cursor: pointer;
  height: 250px;
}
</style>
