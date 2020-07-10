<template>
  <div>
    <breadcrumb :title="title" />
    <va-tabs :cache-lifetime="cacheLifetime" @changed="onTabChange">
      <va-tab name="Issues">
        <issues />
      </va-tab>
      <va-tab name="Files">
        <files />
      </va-tab>
    </va-tabs>
  </div>
</template>

<script>
import Files from '~/components/Files'
import Issues from '~/components/Issues'
import Breadcrumb from '~/components/Breadcrumb'

export default {
  name: 'Space',

  middleware: ['auth', 'bitbucket-client'],

  components: {
    Files,
    Issues,
    Breadcrumb
  },

  metaInfo () {
    return { title: this.$t('space') }
  },

  data: () => {
    return {
      title: null,
      cacheLifetime: 5
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
