<template>
  <div id="app" :class="{ 'is-pc': isPC }" :style="rootStyle">
    <template v-if="initialized">
      <div class="navBar">
        <div class="appTitle u-interactive" @click="scrollTopInstanceList">
          VRC Friend Instance List
        </div>
        <div class="spacer"></div>
        <NotificationButton class="u-mr5" />
        <div class="iconButton" @click="showMenu">
          <g-Icon :size="24" color="white">menu</g-Icon>
        </div>
        <Menu v-model="isVisibleMenu" />
      </div>
      <div class="main">
        <router-view />
      </div>
    </template>
    <Toasts />
    <FullLoader />
    <Alert />
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./base.scss" />
<style lang="scss" src="./style.scss" scoped />
