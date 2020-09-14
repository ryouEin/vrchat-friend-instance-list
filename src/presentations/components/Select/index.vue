<template>
  <div class="c-select">
    <select class="select" @change="$emit('input', $event.target.value)">
      <!-- eslint-disable-next-line -->
      <option v-for="item in items" :value="item.value" :selected="item.value === value">{{ item.label }}</option>
    </select>
    <div class="arrow">
      <g-Icon color="front" :size="24">arrow_drop_down</g-Icon>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
