<template>
  <div class="c-userListItem">
    <div class="figure">
      <img
        class="userImage"
        :src="friend.currentAvatarThumbnailImageUrl"
        :key="friend.currentAvatarThumbnailImageUrl"
      />
      <div v-if="isFavorited" class="favorite">
        <g-FavoriteMark />
      </div>
    </div>
    <div class="userInfo">
      <div class="nameRow">
        <div class="newCol">
          <div v-if="friend.isNew" class="new">NEW</div>
        </div>
        <div class="displayName">{{ friend.displayName }}</div>
      </div>
      <div class="status" :class="statusCssClass">{{ canJoinText }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
