<template>
  <transition name="t-up">
    <div v-show="isVisible" class="c-toTopButton" @click="toTop">
      <g-Icon size="35">keyboard_arrow_up</g-Icon>
    </div>
  </transition>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
