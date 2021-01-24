<template>
  <div class="c-instanceListItem">
    <div class="instanceInfo">
      <InstanceDetail :instance="instance" />
    </div>

    <div class="userInfo">
      <UserList :friends="friends" :ownerId="ownerId" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
