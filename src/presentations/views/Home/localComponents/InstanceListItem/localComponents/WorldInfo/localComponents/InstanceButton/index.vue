<template>
  <button
    class="c-instanceButton"
    :class="rootClass"
    :style="rootStyle"
    @click="$emit('click')"
  >
    <span class="text"><slot /></span>
  </button>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
