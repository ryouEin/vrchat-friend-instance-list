<template>
  <div class="c-menu" :class="{ '-active': value }">
    <div class="overlay" @click="hideMenu" />
    <div class="list">
      <div class="item" @click="showSettingDialog">
        <g-Icon :size="24">settings</g-Icon>
        <div class="text">設定</div>
      </div>
      <div class="item" @click="showAboutCapacityDialog">
        <g-Icon :size="24">help</g-Icon>
        <div class="text">インスタンスの最大人数に関して</div>
      </div>
      <div class="item" @click="showAuthorDialog">
        <g-Icon :size="24">account_circle</g-Icon>
        <div class="text">製作者</div>
      </div>
    </div>
    <div class="dialogs">
      <!-- TODO: 各ダイアログのコンポーネント化 -->
      <g-Dialog v-if="isVisibleSettingDialog" title="設定">
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
                    :value="setting.isEnabledNotificationSound"
                    @input="onChangeEnableNotificationSound"
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

      <g-Dialog
        v-if="isVisibleAboutCapacityDialog"
        title="インスタンスの最大人数に関して"
      >
        <template v-slot:content>
          <g-MarkdownText
            :markdownText="
              `インスタンスの現在人数及び最大人数は、「現在人数 / 最大人数」という形でインスタンスのサムネイル右肩に表記しています。

インスタンスには、ワールドのcapacityの2倍の人数が実際には入れます。（例外として、capacityが1の場合は1人しか入れません）

表記している最大人数は、インスタンスに実際入れる人数を上の基準で計算の上表記しています。
`
            "
          />
        </template>
        <template v-slot:buttonArea>
          <g-Button @click="hideAboutCapacityDialog">閉じる</g-Button>
        </template>
      </g-Dialog>

      <g-Dialog v-if="isVisibleAuthorDialog" title="製作者">
        <template v-slot:content>
          <div class="author">
            <div class="author_image">
              <img src="@/presentations/assets/creditThumbnail.jpg" alt="" />
            </div>
            <div class="author_name">ryou</div>
            <div class="author_role">Silent Club オーナー</div>
            <div class="author_sns">
              <a
                href="https://twitter.com/ryou_Ein"
                target="_blank"
                rel="noopener"
                ><img src="@/presentations/assets/twitterLogo.png" alt="Twitter"
              /></a>
            </div>
          </div>
        </template>
        <template v-slot:buttonArea>
          <g-Button @click="hideAuthorDialog">閉じる</g-Button>
        </template>
      </g-Dialog>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
