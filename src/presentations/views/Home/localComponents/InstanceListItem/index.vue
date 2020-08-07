<template>
  <div class="c-instanceListItem" :id="location">
    <div v-if="world !== undefined" class="worldInfo">
      <img :src="world.thumbnailImageUrl" class="worldImage" />
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
            <InstanceButton @click="join">JOIN</InstanceButton>
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
                ><g-Spinner :size="24" color="black"
              /></span>
            </InstanceButton>
          </div>
          <div class="instanceButtonGroup_item -watch">
            <WatchInstanceButton :instance="instance" />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isPrivate" class="worldInfo">
      <div class="worldName">Private</div>
    </div>
    <div v-else class="worldInfo">
      <div class="loading">
        <g-Spinner color="white" />
      </div>
    </div>
    <div class="userInfo">
      <UserList :users="friends" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
