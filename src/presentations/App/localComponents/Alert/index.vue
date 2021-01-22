<template>
  <AlertPresentation
    v-if="props !== undefined"
    :props="props"
    :onClose="close"
  />
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
