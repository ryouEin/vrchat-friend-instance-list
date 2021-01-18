<template>
  <g-Dialog :title="`Unfavorite ${friend.displayName}`">
    <template v-slot:content>
      <div class="u-mb20">
        {{ friend.displayName }}のお気に入りを解除しますか？
      </div>
    </template>
    <template v-slot:buttonArea>
      <g-Button class="u-mr20" @click="hide">閉じる</g-Button>
      <g-Button class="u-mr20" color="primary" @click="unfavoriteButtonHandler"
        >Unfavorite</g-Button
      >
    </template>
  </g-Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
