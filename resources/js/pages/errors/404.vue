<template>
  <va-row class="full-height">
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <va-alert :type="alert.type" :title="alert.title">
        <p>{{ alert.body }}</p>
      </va-alert>
    </va-column>
  </va-row>
</template>

<script>
export default {
  name: 'NotFound',

  middleware: [
    'auth',
    'bitbucket-client',
    'twilio-client'
  ],

  data: () => {
    return {
      alert: {
        type: 'warning',
        title: '404 Page not found!',
        body: 'Sorry, consider navigating back / navigating to home page.'
      }
    }
  }
}
</script>
