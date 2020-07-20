<template>
  <!-- <va-row class="full-height">
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
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
      </va-page-header>
      <div class="full-height" style="border-left:1px solid #CCC;border-right:1px solid #CCC;width:1300px;height:595px;">
        <div class="window_outline full-height">
          <div class="window_head">
            <div class="circle window_item" />
            <div class="circle window_item" />
            <div class="circle window_item" />
            <div class="address_bar window_item" />
          </div>
          <div class="browser_body">-->
  <div style="width:100%;text-align: -webkit-center;">
    <img
      :src="imageSrc"
      aspect-ratio="1"
      class="screen-thumbnail"
      usemap="#flowMap"
    >
    <map name="flowMap">
      <area
        v-for="(hotspot, index) in screen.hotspots"
        :key="index"
        shape="rect"
        coords="860,283,191,58"
        :alt="hotspot.destination.alt"
        :href="setDestination(hotspot.destination)"
      >
    </map>
  </div>
  <!--  </div>
        </div>
      </div>
    </va-column>
  </va-row> -->
</template>

<script>
const UPLOAD_URL = process.env.MIX_APP_URL

export default {
  name: 'Flow',

  layout: 'flow',

  middleware: [
    'auth',
    'outdo-get-workflow-detail'
  ],

  metaInfo () {
    return { title: this.$t('workflow') }
  },

  computed: {
    currentWorkflow () {
      return Object.is(this.$store.state.outdo.active.workflow, null)
        ? ''
        : this.$store.state.outdo.active.workflow
    },
    screen () {
      return this.$store.state.outdo.active.screen
    },
    imageSrc () {
      return `${UPLOAD_URL}/${this.$store.state.outdo.active.screen.path}`
    }
  },

  beforeMount () {
    this.$store.commit('outdo/SET_CURRENT_FLOW_VIEW', this.$route.params.screen)
  },

  methods: {
    calculateCoOrdinates (spot) {
      return '860,283,191,58'
      // return '578,188,137,51'
      // return `${spot.width},${spot.height},${spot.left},${spot.top}`
      // return `${spot.left},${spot.top},${spot.width},${spot.height}`
    },
    setDestination (destination) {
      // workspaces/:workspace/workflows/:id/view/:screen
      const destinationURL = [
        UPLOAD_URL,
        'workspaces',
        this.$route.params.workspace,
        'workflows',
        this.$route.params.id,
        'view',
        destination.id
      ]
      return destinationURL.join('/')
    }
  }
}
</script>

<style scoped>
/*window styles*/
.browser_body {
  min-height: 20em;
}

.window_outline {
  border-radius: 0px;
  background-color: white;
  color: #303442;
  width: 100%;
  border-bottom: 0px;
}
.window_head {
  background: rgba(200,200,200,1);
  width: 100%;
  height: 2.5em;
  border: 3px solid rgba(120,120,120,1);
  display: flex;
}

.window_item {
  align-self: center;
  background: #fff;
  width: 1em;
  height: 1em;
  border: 1px solid rgba(180,180,180,1);
}
.circle {
  border-radius: 50%;
  margin-right: 0.6em;
}
.circle:first-child {
  margin-left: 0.6em;
}

.address_bar {
  border-radius: 3px;
  flex: 1 1 10px;
  max-width: 50%;
  height: 1.3em
}
.screen {
  margin: 0px 0px 20px 0px;
}
</style>
