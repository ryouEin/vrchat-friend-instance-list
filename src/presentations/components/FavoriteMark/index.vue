<template>
  <div class="c-favoriteMark" :class="{ '-inactive': inactive }">
    <i class="material-icons">{{ inactive ? 'star_outline' : 'star' }}</i>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
