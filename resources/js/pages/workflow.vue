<template>
  <div>
    <va-page-header>
      <div slot="breadcrumb">
        <va-breadcrumb separator="/">
          <va-breadcrumb-item to="/dashboard">
            {{ this.$t('home') }}
          </va-breadcrumb-item>
          <va-breadcrumb-item :to="this.$route.path">
            {{ this.$route.name }}
          </va-breadcrumb-item>
        </va-breadcrumb>
      </div>
      <div slot="title">
        {{ currentWorkflow.name }}
      </div>
      <div slot="subtitle">
        <span>{{ `${currentWorkflow.screens_count} screens` }}</span>
      </div>
      <div slot="actions">
        <va-button type="success" icon-before="eye" @click.stop="viewFlow">
          View flow
        </va-button>
      </div>
    </va-page-header>
    <va-tabs>
      <va-tab name="Story builder">
        <builder :workflow="currentWorkflow.id" />
      </va-tab>
      <!-- <va-tab name="Story simulator">
        <simulator />
      </va-tab> -->
    </va-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Builder from '~/components/Builder'
// import Simulator from '~/components/Simulator'

export default {
  name: 'Workflow',

  middleware: [
    'auth',
    'bitbucket-client',
    'twilio-client',
    'outdo-get-workflow-detail'
  ],

  components: {
    Builder
    // Simulator
  },

  metaInfo () {
    return { title: this.$t('workflow') }
  },

  data: () => {
    return {
      id: null,
      gutter: 25,
      size: 'lg'
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },
    currentWorkflow () {
      return Object.is(this.$store.state.outdo.active.workflow, null)
        ? ''
        : this.$store.state.outdo.active.workflow
    }
  },

  mounted () {
    this.id = this.$route.params.id
  },

  methods: {
    ...mapActions([
      'START_AUI_LOADING',
      'STOP_AUI_LOADING'
    ]),
    viewFlow () {
      this.$router.push({ name: 'flow',
        params: {
          id: this.$route.params.id,
          screen: this.$store.state.outdo.screens[0].id
        }
      })
    }
  }
}
</script>
