<template>
  <div id="app">
    <template v-if="initialized">
      <div class="navBar">
        <div class="appTitle">VRChat Friend Instance List</div>
        <div class="spacer"></div>
        <AboutCapacity class="u-mr25" />
        <NotificationButton class="u-mr25" />
        <SettingButton />
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
