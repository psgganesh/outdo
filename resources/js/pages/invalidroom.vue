<template>
  <div>
    <va-alert :type="type" :title="title" style="text-align:left; margin:12px">
      <p>{{ body }}</p>
    </va-alert>
  </div>
</template>

<script>

export default {
  name: 'Invalidroom',

  middleware: ['auth', 'bitbucket-client', 'twilio-client'],

  metaInfo () {
    return { title: this.$t('room_not_found') }
  },

  data: () => {
    return {
      type: 'warning',
      title: 'Meeting room not found',
      body: 'A meeting room with URL provided does not exist. Please get in touch with your meeting host.'
    }
  }
}
</script>
