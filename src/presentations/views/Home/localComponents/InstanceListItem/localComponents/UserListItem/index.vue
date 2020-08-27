<template>
  <div class="c-userListItem" :id="friend.id">
    <img
      class="userImage"
      :src="friend.currentAvatarThumbnailImageUrl"
      :key="friend.currentAvatarThumbnailImageUrl"
    />
    <div v-if="friend.isOwner" class="owner">Owner</div>
    <div v-if="friend.isFavorited" class="favorite">
      <g-FavoriteMark />
    </div>
    <div class="userDetail">
      <div class="displayName">{{ friend.displayName }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
