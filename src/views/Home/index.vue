<template>
  <div class="c-home">
    <div class="side">
      <div class="header">Online Friends</div>
      <div class="content">
        <div v-if="showUserListLoading" class="u-alignCenter u-pt20">
          <Spinner color="black" :size="24" />
        </div>
        <UserList v-else :users="users" @focusUser="onFocusUser" />
      </div>
    </div>
    <div class="main">
      <div v-if="showInstanceListLoading" class="u-alignCenter u-pt40">
        <Spinner color="black" />
      </div>
      <template v-else>
        <InstanceList :users="users" />
        <FAB @click="reload">
          <Spinner v-if="showFABLoading" color="white" />
          <Icon v-else :size="50">refresh</Icon>
        </FAB>
      </template>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
