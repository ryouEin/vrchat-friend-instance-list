<template>
  <div class="c-instanceList">
    <div class="item" v-for="instance in instances" :key="instance.location">
      <Instance :location="instance.location" :users="instance.users" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
