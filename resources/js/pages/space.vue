<template>
  <div>
    <breadcrumb :title="title" />
    <va-tabs>
      <va-tab name="Issues">
        <issues />
      </va-tab>
      <va-tab name="Workflows">
        <workflow />
      </va-tab>
    </va-tabs>
  </div>
</template>

<script>
import Issues from '~/components/Issues'
import Workflow from '~/components/Workflow'
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Space',

  middleware: [
    'auth',
    'bitbucket-client',
    'twilio-client',
    'bitbucket-set-active-repositories',
    'outdo-get-workflows'
  ],

  components: {
    Issues,
    Workflow,
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('space') }
  },

  data: () => {
    return {
      title: null
    }
  },

  beforeMount () {
    this.title = `${this.$route.params.workspace}/${this.$route.params.repository}`
  }

}
</script>
