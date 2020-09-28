<template>
  <transition name="t-fade">
    <div v-if="isVisible" class="c-fullLoader">
      <g-Spinner color="white" />
    </div>
  </transition>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
