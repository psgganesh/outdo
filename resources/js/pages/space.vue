<template>
  <div>
    <breadcrumb :title="title" />
    <va-tabs @changed="onTabChange">
      <va-tab name="Issues">
        <issues />
      </va-tab>
      <va-tab name="Workflows">
        <!-- <files /> -->
      </va-tab>
    </va-tabs>
  </div>
</template>

<script>
// import Files from '~/components/Files'
import Issues from '~/components/Issues'
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Space',

  middleware: ['auth', 'bitbucket-client', 'twilio-client', 'bitbucket-set-active-repositories'],

  components: {
    // Files,
    Issues,
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
  },

  methods: {
    onTabChange () {
      console.log('Tab changed')
    }
  }
}
</script>
