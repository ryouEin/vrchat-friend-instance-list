<template>
  <div class="c-settingButton">
    <button class="button" @click="showDialog">
      <g-Icon :size="24" color="white">settings</g-Icon>
      <span class="text">設定</span>
    </button>
    <g-Dialog v-if="dialogIsVisible" title="設定">
      <template v-slot:content>
        <div class="settingList">
          <div class="settingList_item">
            <div class="settingItem">
              <div class="settingItem_left">
                <div class="settingItem_title">通知音</div>
                <div class="settingItem_note">
                  OSの通知音と重複する場合はOFFにしてください
                </div>
              </div>
              <div class="settingItem_input">
                <g-Toggle v-model="setting.enableNotificationSound" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:buttonArea>
        <g-Button @click="hideDialog">閉じる</g-Button>
      </template>
    </g-Dialog>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
