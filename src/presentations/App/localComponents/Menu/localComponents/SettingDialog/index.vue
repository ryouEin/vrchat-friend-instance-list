<template>
  <g-Dialog class="c-settingDialog" title="設定">
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
              <g-Toggle
                :value="setting.enableNotificationSound"
                @input="onChangeEnableNotificationSound"
              />
            </div>
          </div>
        </div>
        <div class="settingList_item">
          <div class="settingItem">
            <div class="settingItem_left">
              <div class="settingItem_title">ダークモード</div>
              <div class="settingItem_note"></div>
            </div>
            <div class="settingItem_input">
              <g-Toggle
                :value="setting.theme === 'dark'"
                @input="onChangeDarkMode"
              />
            </div>
          </div>
        </div>
        <div class="settingList_item">
          <div class="settingItem">
            <div class="settingItem_left">
              <div class="settingItem_title">メインカラー</div>
              <div class="settingItem_note"></div>
            </div>
            <div class="settingItem_input">
              <g-Select
                class="u-mr5"
                :items="[
                  {
                    label: 'グリーン',
                    value: 'green',
                  },
                  {
                    label: 'レッド',
                    value: 'red',
                  },
                  {
                    label: 'ブルー',
                    value: 'blue',
                  },
                  {
                    label: 'イエロー',
                    value: 'yellow',
                  },
                  {
                    label: 'オレンジ',
                    value: 'orange',
                  },
                ]"
                :value="setting.mainColor"
                @input="onChangeMainColor"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:buttonArea>
      <g-Button @click="hideSettingDialog">閉じる</g-Button>
    </template>
  </g-Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
