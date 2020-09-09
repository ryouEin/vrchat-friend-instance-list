<template>
  <div class="c-fab" :class="rootClass" :style="rootStyle" @click="onClick">
    <slot />
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
