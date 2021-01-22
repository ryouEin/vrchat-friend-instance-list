<template>
  <div class="c-instanceDetail">
    <div v-if="isPrivate" class="inner -private">
      <div class="textOnlyTitle">Private</div>
    </div>
    <div v-else class="inner">
      <CanJoinInstanceDetail :instance="instance" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
