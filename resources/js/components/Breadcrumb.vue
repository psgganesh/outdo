<template>
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
      {{ title }}
    </div>
    <div v-if="subtitle !== null" slot="subtitle">
      {{ subtitle }}
    </div>
    <div slot="actions">
      <va-input icon-style="solid" icon="search" placeholder="Filter" width="lg" />
    </div>
  </va-page-header>
</template>

<script>

export default {
  name: 'Breadcrumb',

  props: {
    title: { type: String, default: 'Unknown Page Title' },
    subtitle: { type: String, default: null }
  }

}
</script>
