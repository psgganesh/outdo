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
      minibarTheme: 'blue',
      minibarTopItems: [
        {
          icon: 'check-circle',
          size: '2.0em',
          brand: true
        },
        {
          icon: 'search',
          size: '1.25em',
          method: this.demoMethod
        },
        {
          icon: 'bars',
          size: '1.25em',
          method: this.demoMethod
        }
      ],
      minibarBottomItems: [
        {
          icon: 'cog',
          size: '1.5em',
          method: this.demoMethod
        }
      ]
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
    }
  }
}
</script>
