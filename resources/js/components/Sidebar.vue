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
        <va-form ref="form" :type="type">
          <va-form-item need>
            <va-input
              v-model="addMember.name"
              name="username"
              icon-style="solid"
              icon="search"
              autocomplete="off"
              placeholder="Search by bitbucket username"
              :rules="[{type:'required', tip:'Sorry, I need to know your bitbucket username'}]"
              clearable
            />
          </va-form-item>
        </va-form>
      </div>
      <div slot="footer" style="border-top: 1px solid #E0E2E6;">
        <div style="margin-top: 10px; text-align: right;">
          <va-button type="primary" @click="$refs.customModal.close()">
            Add Member
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',

  data () {
    return {
      type: 'vertical',
      addMember: {
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
        name: 'Add new member',
        icon: 'plus',
        iconSize: '18px',
        iconColor: 'white',
        iconStyle: 'solid',
        method: this.addNewMember
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
    addNewMember () {
      this.$refs.customModal.open()
    }
  }
}
</script>
