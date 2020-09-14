<template>
  <div class="c-watchInstanceButton">
    <InstanceButton v-if="isWatching" @click="endWatch">
      <g-Icon :size="20" color="green">visibility</g-Icon>
    </InstanceButton>
    <InstanceButton v-else @click="showDialog">
      <g-Icon :size="20" color="front">visibility</g-Icon>
    </InstanceButton>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
