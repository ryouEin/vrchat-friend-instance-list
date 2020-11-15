<template>
  <transition name="t-fadeDown">
    <div v-show="isVisible" class="c-toTopButton" @click="toTop">
      <g-Icon size="14">arrow_upward</g-Icon>
      一番上へ戻る
    </div>
  </transition>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
