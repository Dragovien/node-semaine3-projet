<template>
  <q-page class="flex flex-center">
    <p>Product</p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductPage',
  props: ['admin'],
  data() {
    return {
      
    }
  },
  mounted() {
    console.log(this.admin)
    console.log('test')
  }
})
</script>
