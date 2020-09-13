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
    <div v-else-if="isFavorited" class="favorite">
      <g-FavoriteMark />
    </div>

    <div class="userDetail">
      <div class="displayName">{{ friend.displayName }}</div>
      <div class="menuButton" ref="menuButton">
        <g-DropdownMenu
          :items="dropdownMenuItems"
          :positionVertical="menuPosition.vertical"
          :positionHorizontal="menuPosition.horizontal"
        >
          <g-Icon :size="20" color="white">more_vert</g-Icon>
        </g-DropdownMenu>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
