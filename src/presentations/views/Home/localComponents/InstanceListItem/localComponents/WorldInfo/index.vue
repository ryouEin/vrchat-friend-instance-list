<template>
  <div class="c-worldInfo">
    <img
      class="worldImage"
      :src="world.thumbnailImageUrl"
      :key="world.thumbnailImageUrl"
    />
    <div class="tag">
      <Permission :permission="instancePermission" />
    </div>
    <div class="userNum" :class="userNumClass">
      <span class="current">{{ currentUserNumText }}/</span
      ><span class="capacity">{{ capacity }}</span>
    </div>
    <div class="worldName">{{ world.name }}</div>
    <div class="instanceButtonArea">
      <div class="instanceButtonGroup">
        <div class="instanceButtonGroup_item">
          <InstanceButton @click="onClickJoinButton">JOIN</InstanceButton>
        </div>
        <div class="instanceButtonGroup_item">
          <InstanceButton
            :fontSize="14"
            :disabled="fetchUserNumButtonDisabled"
            @click="updateUserNum"
          >
            <span v-if="!isFetchingUserNum" class="instanceButton_text"
              >ユーザー数<br />更新</span
            >
            <span v-else class="instanceButton_text"
              ><g-Spinner :size="24" color="front"
            /></span>
          </InstanceButton>
        </div>
        <div class="instanceButtonGroup_item -watch">
          <WatchInstanceButton :instance="instance" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
