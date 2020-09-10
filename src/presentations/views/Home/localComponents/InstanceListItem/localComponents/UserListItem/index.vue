<template>
  <div class="c-userListItem" :id="friend.id">
    <img
      class="userImage"
      :src="friend.currentAvatarThumbnailImageUrl"
      :key="friend.currentAvatarThumbnailImageUrl"
    />
    <div v-if="friend.isOwner" class="owner">Owner</div>
    <div v-if="isFavorited" class="favorite">
      <g-FavoriteMark />
    </div>
    <div class="tmpFavoriteArea">
      <template v-if="isFavorited">
        <g-Button @click="unfavorite">Unfav</g-Button>
      </template>
      <template v-else>
        <g-Select
          :items="[
            {
              label: '0',
              value: 'group_0',
            },
            {
              label: '1',
              value: 'group_1',
            },
            {
              label: '2',
              value: 'group_2',
            },
          ]"
          v-model="favoriteGroup"
        />
        <g-Button @click="favorite">Fav</g-Button>
      </template>
    </div>
    <div class="userDetail">
      <div class="displayName">{{ friend.displayName }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
