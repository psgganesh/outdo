<template>
  <va-minibar
    :theme="minibarTheme"
    :top-items="minibarTopItems"
    :bottom-items="minibarBottomItems"
  />
</template>

<script>
export default {
  name: 'Minibar',

  data () {
    return {
      minibarTheme: 'dark',
      minibarTopItems: [
        {
          icon: 'check-circle',
          size: '2.0em',
          brand: true,
          method: this.navigateToWelcomePage
        },
        {
          icon: 'search',
          size: '1.25em',
          method: this.demoMethod
        }
      ],
      minibarBottomItems: [
        {
          icon: 'plus',
          size: '1.25em',
          method: this.demoMethod
        },
        {
          icon: 'user-circle',
          size: '1.5em',
          method: this.demoMethod
        }
      ]
    }
  },

  methods: {
    navigateToWelcomePage () {
      this.$router.push({ name: 'welcome' })
    },
    demoMethod () {
      this.VaModal.confirm({
        title: 'Hello!',
        message: `This modal exists to show how methods
        can be applied to Minibar items.`,
        type: 'info'
      })
    }
  }
}
</script>
