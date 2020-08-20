<template>
  <div class="c-userList">
    <div class="item" v-for="friend in friends" :key="friend.id">
      <UserListItem :friend="friend" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
