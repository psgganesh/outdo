<template>
  <div id="workflows-list">
    <va-loading v-if="loading" size="lg" color="blue" center />
    <va-row :gutter="gutter">
      <va-column :xs="12" :sm="3" :md="2" :lg="2">
        <va-card id="create-new-workflow" :elevation="elevation" :padding="padding" class="card m-b-10">
          <h3><va-icon color="help" padding="5px" type="folder-plus" /> Create new workflow</h3>
        </va-card>
      </va-column>
      <va-column v-for="workflow in workflows" :key="workflow.id" :xs="12" :sm="3" :md="2" :lg="2">
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
  </div>
</template>

<script>
export default {
  name: 'Workflow',

  data: () => {
    return {
      elevation: 1,
      padding: 5,
      gutter: 5
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },
    workflows () {
      return this.$store.state.outdo.workflows
    }
  },

  methods: {
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
