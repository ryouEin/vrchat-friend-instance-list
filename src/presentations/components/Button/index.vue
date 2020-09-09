<template>
  <span class="c-button" :class="rootClass" :style="rootStyle" @click="onClick"
    ><slot></slot
  ></span>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
