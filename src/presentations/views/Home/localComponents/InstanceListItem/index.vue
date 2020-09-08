<template>
  <div class="c-instanceListItem" :id="location">
    <div v-if="world !== undefined" class="instanceInfo">
      <WorldInfo :instance="instance" :world="world" />
    </div>
    <div v-else-if="isPrivate" class="instanceInfo">
      <div class="textOnlyTitle">Private</div>
    </div>
    <div v-else-if="isLoading" class="instanceInfo">
      <div class="loading">
        <g-Spinner color="white" />
      </div>
    </div>
    <div v-else class="instanceInfo">
      <div class="textOnlyTitle">Error</div>
    </div>

    <div class="userInfo">
      <UserList :friends="userListItemPropFriends" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
