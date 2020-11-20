<template>
  <div class="index">
    <vheader/>
	<router-view/>
  </div>
</template>

<script>

import vheader from '@/components/vheader.vue'

export default {
  name: 'Home',
  components: {
    vheader
  }
}
</script>
<style lang="scss" scoped>
.index{min-width: 1255px;}
</style>