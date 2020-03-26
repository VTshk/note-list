<template>
  <div>
    <div class="overlay" @click.self="close">
      <div class="modal">
        <div class="message">
          <span>Вы действительно хотите {{message}}?</span>
        </div>
        <hr />
        <div class="footer">
          <button @click="close">Отменить</button>
          <button @click="action()">Принять</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    message: {
      type: String,
    },
    action: {
      type: Function,
    },
  },
  methods: {
    close() {
      this.$emit('closeDialog', false);
    },
  },
};
</script>

<style lang="sass" scoped>
  .overlay
    background: rgba(102, 102, 102, 0.6)
    width: 100%
    height: 100%
    position: fixed
    top: 0
    z-index: 1
    left: 0
    cursor: default
    display: flex
    justify-content: center
    align-items: center
    .modal
      width: 200px
      padding: 12px
      border-radius: 2px
      text-align: center
      z-index: 8
      background: white
      border-radius: 5px
      .message
        padding: 6px 0
      .footer
        display: flex
        justify-content: space-between
</style>
