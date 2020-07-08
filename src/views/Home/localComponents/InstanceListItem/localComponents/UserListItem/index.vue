<template>
  <div
    class="c-userListItem"
    :id="user.id"
    :class="{ '-active': user.isFocused }"
  >
    <img
      class="userImage"
      :src="user.currentAvatarThumbnailImageUrl"
      loading="lazy"
    />
    <div v-if="user.isFavorited" class="favorite">
      <FavoriteMark />
    </div>
    <div class="userDetail">
      <div class="displayName">{{ user.displayName }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
