<template>
  <div class="c-toast" :style="rootStyle">
    <div class="icon">
      <g-Icon v-if="type === 'info'" color="white" :size="20"
        >check_circle</g-Icon
      >
      <g-Icon v-if="type === 'warn'" color="white" :size="20">warning</g-Icon>
      <g-Icon v-if="type === 'error'" color="white" :size="20">error</g-Icon>
    </div>
    <div class="content">{{ content }}</div>
    <div class="closeButton" @click="onClose">
      <g-Icon color="white" :size="20">close</g-Icon>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
