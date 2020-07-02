<template>
  <div class="c-userList">
    <div class="item" v-for="user in users" :key="user.id">
      <UserListItem :user="user" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
