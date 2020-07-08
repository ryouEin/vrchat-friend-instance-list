<template>
  <div class="c-notificationItem" :class="rootClass" @click="triggerOnClick">
    <div class="content">{{ text }}</div>
    <div class="time">{{ date }}</div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
