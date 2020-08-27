<template>
  <g-Dialog v-if="isVisible" title="JOIN">
    <template v-slot:content>
      <g-Button @click="join">JOIN</g-Button>
      <g-Button @click="inviteMe">INVITE ME</g-Button>
    </template>
    <template v-slot:buttonArea>
      <g-Button @click="hideDialog">閉じる</g-Button>
    </template>
  </g-Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
