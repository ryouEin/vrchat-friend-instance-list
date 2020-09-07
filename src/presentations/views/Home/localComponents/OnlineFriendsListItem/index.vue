<template>
  <div v-if="isVisible" class="c-userListItem" @click="onClick">
    <div class="figure">
      <img
        class="userImage"
        :src="friend.currentAvatarThumbnailImageUrl"
        :key="friend.currentAvatarThumbnailImageUrl"
      />
      <div v-if="friend.isFavorited" class="favorite">
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
      <div class="status" :class="statusCssClass">{{ status }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
