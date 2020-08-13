<template>
  <label class="c-toggle">
    <input
      type="checkbox"
      class="input"
      @change="$emit('input', $event.target.checked)"
      :checked="value"
    />
    <span class="body" />
  </label>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
