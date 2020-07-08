<template>
  <div class="c-notificationButton">
    <div class="button" @click="showMenu">
      <Icon :size="24" color="white">notifications</Icon>
      <span class="text">通知一覧</span>
      <div class="badge"></div>
    </div>
    <div v-if="menuIsVisible" class="menu" v-click-outside="hideMenu">
      <div class="items">
        <!-- eslint-disable-next-line -->
        <div v-for="notification in notifications" class="item">
          <NotificationItem
            :text="notification.text"
            :date="notification.date"
            :onClick="notification.onClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
