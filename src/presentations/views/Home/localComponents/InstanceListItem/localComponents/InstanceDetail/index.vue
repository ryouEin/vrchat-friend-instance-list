<template>
  <div class="c-instanceDetail">
    <div v-if="isPrivate" class="inner -private">
      <div class="textOnlyTitle">Private</div>
    </div>
    <div v-else-if="world !== null" class="inner">
      <WorldInfo :instance="instance" :world="world" />
    </div>
    <div v-else-if="isLoading" class="inner">
      <div class="loading">
        <g-Spinner color="white" />
      </div>
    </div>
    <div v-else class="inner -error">
      <div class="textOnlyTitle">Error</div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
