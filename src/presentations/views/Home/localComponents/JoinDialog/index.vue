<template>
  <g-Dialog v-if="isVisible" title="JOIN">
    <template v-slot:content>
      <div class="u-mb20">
        <g-Button size="large" full @click="join">JOIN</g-Button>
        <p class="note">VRChatを新しく再起動し、インスタンスにJOINする</p>
      </div>
      <div>
        <g-Button size="large" full @click="inviteMe">INVITE ME</g-Button>
        <p class="note">自分自身にインスタンスへのInviteを送信する</p>
      </div>
    </template>
    <template v-slot:buttonArea>
      <g-Button color="gray" @click="hideDialog">閉じる</g-Button>
    </template>
  </g-Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
