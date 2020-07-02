<template>
  <div class="c-instanceListItem">
    <div v-if="world !== undefined" class="worldInfo">
      <img :src="world.thumbnailImageUrl" class="worldImage" loading="lazy" />
      <div class="tag">
        <Permission :permission="instancePermission" />
      </div>
      <div class="worldName">{{ world.name }}</div>
      <a :href="joinUrl" class="joinButton">JOIN</a>
    </div>
    <div v-else-if="isPrivate" class="worldInfo">
      <div class="worldName">Private</div>
    </div>
    <div v-else class="worldInfo">
      <div class="loading">
        <Spinner color="white" />
      </div>
    </div>
    <div class="userInfo">
      <UserList :users="users" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
