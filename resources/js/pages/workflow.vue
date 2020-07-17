<template>
  <va-row v-if="loading" :gutter="gutter" class="text-align-center full-height">
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <div>
        <va-loading v-if="loading" size="lg" color="blue" />
      </div>
    </va-column>
  </va-row>
  <div v-else>
    <breadcrumb :title="title" />
    <va-tabs>
      <va-tab name="Story builder">
        <builder />
      </va-tab>
      <va-tab name="Story simulator">
        <simulator />
      </va-tab>
    </va-tabs>
  </div>
</template>

<script>
import Simulator from '~/components/Simulator'
import Builder from '~/components/Builder'
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Workflow',

  middleware: [
    'auth',
    'bitbucket-client',
    'twilio-client',
    'outdo-get-workflow-detail'
  ],

  components: {
    Simulator,
    Builder,
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('workflow') }
  },

  data: () => {
    return {
      gutter: 25,
      size: 'lg'
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },
    title () {
      return Object.is(this.$store.state.outdo.active.workflow, null)
        ? ''
        : this.$store.state.outdo.active.workflow.name
    }
  }

}
</script>
