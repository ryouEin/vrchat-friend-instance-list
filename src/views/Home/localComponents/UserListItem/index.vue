<template>
  <div
    class="c-userListItem"
    :class="{ '-active': user.isFocused }"
    @click="onClick"
  >
    <div class="figure">
      <img class="userImage" :src="user.currentAvatarThumbnailImageUrl" />
      <div v-if="user.isFavorited" class="favorite">
        <g-FavoriteMark />
      </div>
    </div>
    <div class="userInfo">
      <div class="nameRow">
        <div class="newCol">
          <div v-if="user.isNew" class="new">NEW</div>
        </div>
        <div class="displayName">{{ user.displayName }}</div>
      </div>
      <!-- TODO: ステータスを動的に表示させる -->
      <div class="status" :class="statusCssClass">{{ status }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
