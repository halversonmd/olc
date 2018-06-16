<template>
  <b-tabs>
      <b-tab title="Overview" active>
        <br>
        <olcOverview/>
      </b-tab>
      <b-tab title="Convert" >
        <br>
        <plotPoi/>
      </b-tab>
      <b-tab title="Draw">
        <br>
        <draw/>
      </b-tab>
    </b-tabs>
</template>

<script>

import olcOverview from '@/components/olc_overview'
import plotPoi from '@/components/plot_poi'
import draw from '@/components/draw'

export default {
  name: 'olcHome',
  components: {draw, olcOverview, plotPoi}
}
</script>
