<template>
  <div class="c-notificationButton">
    <div class="button" @click="showMenu">
      <g-Icon :size="24" color="white">notifications</g-Icon>
      <span class="text u-pcOnly">通知一覧</span>
      <div v-if="hasUnreadNotification" class="badge"></div>
    </div>
    <div v-if="menuIsVisible" class="menu" v-click-outside="hideMenu">
      <div class="items">
        <template v-if="notifications.length > 0">
          <!-- eslint-disable-next-line -->
          <div v-for="notification in notifications" class="item">
            <NotificationItem
              :text="notification.text"
              :date="notification.date"
              :onClick="notification.onClick"
            />
          </div>
        </template>
        <div v-else class="item u-alignCenter u-pt15 u-pb15">
          通知はありません
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
