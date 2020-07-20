<template>
  <div>
    <va-row :gutter="gutter" class="padding-top-one-fourth">
      <va-column :xs="12" :sm="12" :md="12" :lg="12" class="text-align-center">
        <h1 class="body-title">
          Simple solutions for complex connections
        </h1>
        <h1>One bitbucket account is all you need</h1>
      </va-column>
    </va-row>
    <va-row>
      <va-column :xs="4" :sm="4" :md="4" :lg="4" />
      <va-column :xs="4" :sm="4" :md="4" :lg="4" class="text-align-center">
        <p>
          Outdo is one of a kind platform which consolidates all the requisites of a developer.
          From creating a prototype which acts closest to reality, to tracking issues real-time,
          Outdo has every feature under one window. So say goodbye to switching tabs and hello to Outdo.
        </p>
      </va-column>
    </va-row>
    <va-row :gutter="gutter" style="margin-top:40px;">
      <va-column :xs="3" :sm="3" :md="3" :lg="3" class="text-align-center">
        <h2><va-icon type="pencil-ruler" padding="15px" />App Prototyping</h2>
        <ul style="text-align:left;list-style:none;">
          <li>Create private workflows</li>
          <li>Upload web wireframes / app images</li>
          <li>Add hotspots for each image into a functional prototype</li>
        </ul>
      </va-column>
      <va-column :xs="3" :sm="3" :md="3" :lg="3" class="text-align-center">
        <h2><va-icon type="bug" padding="15px" />Issue Tracker</h2>
        <ul style="text-align:left;list-style:none;">
          <li>Need timely reports on your team’s performance?</li>
          <li>This issue tracker will exactly give you the progress of each task assigned</li>
          <li>Issue tracking in Jira / Trello style</li>
        </ul>
      </va-column>
      <va-column :xs="3" :sm="3" :md="3" :lg="3" class="text-align-center">
        <h2><va-icon type="comments" padding="15px" />Team Scrum</h2>
        <ul style="text-align:left;list-style:none;">
          <li>An easier option than toggling between a million chat options</li>
        </ul>
      </va-column>
      <va-column :xs="3" :sm="3" :md="3" :lg="3" class="text-align-center">
        <h2><va-icon type="video" padding="15px" />Video Conferencing</h2>
        <ul style="text-align:left;list-style:none;">
          <li>Simple and hassel free one-one video calls</li>
        </ul>
      </va-column>
    </va-row>
    <va-row style="margin-top:20px;">
      <va-column :xs="12" :sm="12" :md="12" :lg="12" class="text-align-center">
        <login-with-bitbucket />
      </va-column>
    </va-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginWithBitbucket from '~/components/LoginWithBitbucket'

export default {
  layout: 'basic',

  metaInfo () {
    return { title: this.$t('home') }
  },

  components: {
    LoginWithBitbucket
  },

  data: () => ({
    title: window.config.appName,
    elevation: 0,
    padding: 20,
    gutter: 0
  }),

  computed: mapGetters({
    user: 'auth/user',
    authenticated: 'auth/check'
  }),

  mounted () {
    if (this.authenticated) {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style scoped>
.body-title {
  font-size: 32px;
}
.title {
  font-size: 2.5em;
  height: 40px;
  text-transform: none;
}
.padding-5 {
  padding: 5px;
}
.text-align-center {
  text-align: center;
}
.padding-top-one-fourth {
  padding-top: 5%;
}
.full-height {
  height: 98vh;
}
</style>
