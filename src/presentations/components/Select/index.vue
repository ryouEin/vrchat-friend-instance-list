<template>
  <div class="c-select">
    <select class="select" @change="onChange">
      <!-- eslint-disable-next-line -->
      <option v-for="(item, index) in items" :value="String(index)" :selected="index === selectedIndex">{{ item.label }}</option>
    </select>
    <div class="arrow">
      <g-Icon color="front" :size="24">arrow_drop_down</g-Icon>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
