<template>
  <transition name="t-fade">
    <div v-if="visible" class="c-fullLoader">
      <g-Spinner />
    </div>
  </transition>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
