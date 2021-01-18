<template>
  <div class="c-userListItem" :id="friend.id">
    <img
      class="userImage"
      :src="friend.currentAvatarThumbnailImageUrl"
      :key="friend.currentAvatarThumbnailImageUrl"
    />
    <div v-if="friend.isOwner" class="owner">Owner</div>

    <div v-if="isLoadingFavorite" class="favorite">
      <div class="favoriteLoadingSpinner">
        <g-Spinner :size="18" color="yellow" />
      </div>
    </div>
    <div
      v-else-if="isFavorited"
      class="favorite"
      @click="unfavoriteButtonHandler"
    >
      <g-FavoriteMark />
    </div>
    <div v-else class="favorite" @click="favoriteButtonHandler">
      <g-FavoriteMark :inactive="true" />
    </div>

    <div class="userDetail">
      <div class="displayName">{{ friend.displayName }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
