<template>
  <div id="projects-list">
    <va-loading v-if="loading" size="lg" color="blue" center />
    <va-row :gutter="gutter">
      <va-column :xs="12" :sm="3" :md="2" :lg="2">
        <va-card id="create-new-project" :elevation="elevation" :padding="padding" class="card m-b-10">
          <h3><va-icon color="help" padding="5px" type="folder-plus" /> Create new project</h3>
        </va-card>
      </va-column>
      <va-column v-for="project in projects" :key="project.id" :xs="12" :sm="3" :md="2" :lg="2">
        <va-card class="project card m-b-10" :elevation="elevation" :padding="padding">
          <h3 @click.stop="openProject(project)">
            {{ project.name }}
          </h3>
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
    projects () {
      return this.$store.state.outdo.projects
    }
  },

  methods: {
    openProject (project) {
      console.log('clicked openProject')
      const params = {
        workspace: this.$route.params.workspace,
        repository: this.$route.params.repository,
        id: project.id
      }
      this.$router.push({ name: 'project', params: { params } })
    }
  }
}
</script>

<style scoped>
#projects-list {
  margin:10px 0px;
}
#create-new-project {
  cursor: pointer;
  text-align: center;
  background-color: #f0f3f9;
  border: 1px solid #d6dde4;
  height: 250px;
}
.project {
  cursor: pointer;
  text-align: center;
  height: 250px;
}
</style>
