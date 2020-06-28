<template>
  <h1>test</h1>
</template>

<script>

export default {
  name: 'Repositories',

  mounted () {
    this.$store.dispatch('bitbucket/repositories')
  }
}
</script>
