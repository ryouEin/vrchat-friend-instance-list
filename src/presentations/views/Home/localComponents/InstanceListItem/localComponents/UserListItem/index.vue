<template>
  <div class="c-userListItem" :id="user.id">
    <img
      class="userImage"
      :src="user.currentAvatarThumbnailImageUrl"
      :key="user.currentAvatarThumbnailImageUrl"
    />
    <div v-if="user.isFavorited" class="favorite">
      <g-FavoriteMark />
    </div>
    <div class="userDetail">
      <div class="displayName">{{ user.displayName }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
