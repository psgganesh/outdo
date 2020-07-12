<template>
  <div>
    <va-sidebar :theme="sidebarTheme">
      <va-sidebar-group id="brand" :items="coreItems" title="Outdo" :default-open-level="1" />
      <va-sidebar-group id="conversations" :items="channelItems" title="Conversations" :default-open-level="1" />
    </va-sidebar>
    <va-modal ref="addChannelModal" :width="width" :backdrop-clickable="backdropClickable">
      <div slot="header" style="padding: 10px 20px;">
        <h2>Add new channel</h2>
      </div>
      <div slot="body" style="height:120px;text-align:center;">
        <va-form ref="form" :type="form.type">
          <va-form-item need>
            <va-input
              v-model="form.channelName"
              name="channelName"
              icon-style="solid"
              icon="comment"
              autocomplete="off"
              placeholder="Name your new private channel"
              :rules="[{type:'required', tip:'Sorry, we need a valid channel name'}]"
            />
          </va-form-item>
        </va-form>
        <va-alert :type="type" :title="title" style="text-align:left; margin:12px">
          <p>{{ body }}</p>
        </va-alert>
      </div>
      <div slot="footer" style="margin-top:40px;margin-right:10px;">
        <div style="margin-top: 10px; text-align: right;">
          <va-button type="primary" @click.stop="addChannel">
            Submit
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Sidebar',

  data () {
    return {
      loading: false,
      type: 'info',
      title: 'Information',
      body: 'You can invite bitbucket users after the private channel is created.' +
            'Once invited your private channel would be visible to users automatically.',
      form: {
        type: 'vertical',
        channelName: ''
      },
      width: '500px',
      backdropClickable: true,
      sidebarTheme: 'blue',
      coreItems: [
        {
          name: 'Workspaces',
          route: '/workspaces',
          icon: 'pencil-ruler',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        },
        {
          name: 'Team',
          class: 'cursor-pointer',
          route: '/team',
          icon: 'mug-hot',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      conversationItems: 'twilio/conversationItems'
    }),
    channelItems () {
      let channels = this.conversationItems
      channels.push({
        name: 'Add new channel',
        icon: 'plus',
        iconSize: '18px',
        iconColor: 'white',
        iconStyle: 'solid',
        method: this.openAddChannelForm
      })
      return channels
    }
  },

  methods: {
    demoMethod () {
      this.VaModal.confirm({
        title: 'Hello!',
        message: `This modal exists to show how methods
        can be applied to Minibar items.`,
        type: 'info'
      })
    },
    openAddChannelForm () {
      this.$refs.addChannelModal.open()
    },
    addChannel () {
      const channelName = this.form.channelName
      const channelData = { uniqueName: uuidv4(), friendlyName: `${channelName}` }
      this.$store.dispatch('twilio/createNewChannel', channelData).then(() => {
        this.$refs.addChannelModal.close()
        this.$router.push({ name: 'conversations',
          params: {
            channel: channelName
          }
        })
      })
    }
  }
}
</script>
