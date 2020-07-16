<template>
  <div>
    <va-loading v-if="loading" size="lg" color="blue" center />
    <va-row :gutter="gutter">
      <va-column :xs="12" :sm="6" :md="3" :lg="3">
        <va-card :elevation="elevation" :padding="padding" class="card m-b-10">
          <h3>Create new project</h3>
        </va-card>
      </va-column>
      <va-column v-for="project in projects" :key="project.id" :xs="12" :sm="6" :md="3" :lg="3" />
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
    projects () {
      return this.$store.workflow.projects
    }
  },

  methods: {

  }
}
</script>
