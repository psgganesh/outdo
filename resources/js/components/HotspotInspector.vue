<template>
  <va-table :hover="table.hover" :size="table.size">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Left</th>
          <th>Top</th>
          <th>Width</th>
          <th>Height</th>
          <th>Angle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(object, index) in hotspots" :key="index" class="space">
          <td>{{ index }}</td>
          <td>{{ object.left }}</td>
          <td>{{ object.top }}</td>
          <td>{{ object.width }}</td>
          <td>{{ object.height }}</td>
          <td>{{ object.angle }}</td>
        </tr>
      </tbody>
    </table>
  </va-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HotspotInspector',

  data () {
    return {
      table: {
        hover: true,
        size: 'lg'
      }
    }
  },

  computed: {
    ...mapGetters({
      hotspots: 'outdo/hotspots'
    })
  }

}
</script>
