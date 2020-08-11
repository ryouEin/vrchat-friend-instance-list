<template>
  <div id="app" :class="{ 'is-pc': isPC }">
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
    <g-Dialog v-if="showAuthErrorDialog" title="認証エラー">
      <template v-slot:content>
        VRChat公式サイトのセッションが切れました。<br />
        公式サイトでログインし直したあと、再読込して下さい。<br />
        <a href="https://www.vrchat.com/login" target="_blank"
          >公式サイトログインページ</a
        >
      </template>
      <template v-slot:buttonArea>
        <g-Button primary @click="reload">再読込</g-Button>
      </template>
    </g-Dialog>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./base.scss" />
<style lang="scss" src="./style.scss" scoped />
