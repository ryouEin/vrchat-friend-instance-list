<template>
  <g-Dialog :title="props.title" @after-leave="$emit('afterLeave')">
    <template v-slot:content>
      <template v-if="props.isMarkdown">
        <g-MarkdownText :markdownText="props.content" />
      </template>
      <template v-else>{{ props.content }}</template>
    </template>
    <template v-slot:buttonArea>
      <template v-if="props.customButtonOptions !== undefined">
        <template v-for="customButtonOption in props.customButtonOptions">
          <!-- eslint-disable-next-line -->
          <g-Button class="u-ml20 u-mr20" :color="customButtonOption.color" @click="customButtonOption.onClick">{{ customButtonOption.text }}</g-Button>
        </template>
      </template>
      <g-Button v-if="showCloseButton" class="u-ml20 u-mr20" @click="close"
        >閉じる</g-Button
      >
    </template>
  </g-Dialog>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { AlertProps } from './script'

@Component
export default class AlertPresentation extends Vue {
  @Prop({ required: true })
  readonly props!: AlertProps

  @Prop()
  readonly onClose?: () => void

  get showCloseButton() {
    return this.props?.showCloseButton ?? true
  }

  get isVisible() {
    return this.props !== undefined
  }

  async close() {
    if (this.props.onClose !== undefined) {
      this.props.onClose()
    }

    if (this.onClose !== undefined) {
      this.onClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.c-alert {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}

.body {
  position: relative;
  padding: 20px;
  background-color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
