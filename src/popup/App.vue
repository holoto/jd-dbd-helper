<template>
  <div id="popuphtml" class="popuphtml">
    <h1>{{message}}</h1>
            <b-input v-model="message"></b-input>
        </b-field>
  </div>
</template>

<script>
  export default {
        data() {
            return {
                message: "1"
            }
        }
    }
</script>

<style lang="stylus">

</style>
