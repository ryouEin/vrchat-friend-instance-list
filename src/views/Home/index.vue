<template>
  <div class="c-home">
    <div class="side">
      <div class="header">Online Friends</div>
      <div class="content">
        <UserList :users="users" @focusUser="onFocusUser" />
      </div>
    </div>
    <div class="main">
      <InstanceList :users="users" />
      <FAB icon="refresh" @click="reload" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
