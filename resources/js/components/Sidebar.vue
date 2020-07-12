<template>
  <div>
    <va-sidebar :theme="sidebarTheme">
      <va-sidebar-group id="brand" :items="coreItems" title="Outdo" :default-open-level="1" />
      <va-sidebar-group id="conversations" :items="channelItems" title="Conversations" :default-open-level="1" />
    </va-sidebar>
    <va-modal ref="customModal" :width="width" :backdrop-clickable="backdropClickable">
      <div slot="header" style="padding: 10px 20px;">
        <h2>Add new channel</h2>
      </div>
      <div slot="body" style="height:120px;text-align:center;">
        <va-form ref="form" :type="addMemberForm.type">
          <va-form-item need>
            <va-input
              v-model="addMemberForm.username"
              name="username"
              icon-style="solid"
              icon="at"
              autocomplete="off"
              placeholder="Add a member by username"
              :rules="[{type:'required', tip:'Sorry, we need a valid bitbucket username'}]"
            />
          </va-form-item>
        </va-form>
        <va-alert :type="type" :title="title" style="text-align:left; margin:12px">
          <p>{{ body }}</p>
        </va-alert>
      </div>
      <div slot="footer" style="margin-top:40px;margin-right:10px;">
        <div style="margin-top: 10px; text-align: right;">
          <va-button type="primary" @click="addMember">
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
      body: 'Once the invitation is sent, a channel under your name would be visible to your team mate automatically.',
      addMemberForm: {
        type: 'vertical',
        username: ''
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
      this.$refs.customModal.open()
    },
    addMember () {
      this.$refs.customModal.close()
      const member = this.addMemberForm.username
      const channelData = { uniqueName: uuidv4(), friendlyName: `${member}` }
      this.$store.dispatch('twilio/createNewChannel', channelData)
    }
  }
}
</script>
