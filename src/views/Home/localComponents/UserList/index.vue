<template>
  <div class="c-userList">
    <div class="item" v-for="user in sortedUsers" :key="user.id">
      <UserListItem :user="user" @click="onClick" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
