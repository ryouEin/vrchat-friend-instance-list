<template>
  <transition
    name="t-fade"
    @before-enter="$emit('beforeEnter')"
    @enter="$emit('enter')"
    @after-enter="$emit('afterEnter')"
    @enter-cancelled="$emit('enterCancelled')"
    @before-leave="$emit('beforeLeave')"
    @leave="$emit('leave')"
    @after-leave="$emit('afterLeave')"
    @leave-cancelled="$emit('leaveCancelled')"
  >
    <div class="c-dialog">
      <div class="overlay"></div>
      <div class="body">
        <div v-if="title.length > 0" class="header">{{ title }}</div>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <div class="buttonArea">
          <slot name="buttonArea"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
