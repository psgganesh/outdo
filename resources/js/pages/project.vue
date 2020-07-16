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
      <va-tab name="Gallery">
        <gallery />
      </va-tab>
      <va-tab name="Flow builder">
        <builder />
      </va-tab>
    </va-tabs>
  </div>
</template>

<script>
import Gallery from '~/components/Gallery'
import Builder from '~/components/Builder'
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Project',

  middleware: ['auth', 'bitbucket-client', 'twilio-client', 'outdo-get-workflow-detail'],

  components: {
    Gallery,
    Builder,
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('project') }
  },

  data: () => {
    return {
      title: null,
      gutter: 25,
      size: 'lg'
    }
  },

  beforeMount () {
    this.title = `${this.$route.params.workspace}/${this.$route.params.repository}/${this.$route.params.project}`
  }

}
</script>
