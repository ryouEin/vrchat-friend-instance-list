<template>
  <div class="c-instanceListItem">
    <div v-if="world !== undefined" class="worldInfo">
      <img :src="world.thumbnailImageUrl" class="worldImage" loading="lazy" />
      <div class="tag">
        <Permission :permission="instancePermission" />
      </div>
      <div class="userNum">
        <span class="current">{{ currentUserNumText }}/</span
        ><span class="capacity">{{ this.world.capacity }}</span>
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
                ><Spinner :size="24" color="black"
              /></span>
            </InstanceButton>
          </div>
          <div class="instanceButtonGroup_item -watch">
            <WatchInstanceButton />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isPrivate" class="worldInfo">
      <div class="worldName">Private</div>
    </div>
    <div v-else class="worldInfo">
      <div class="loading">
        <Spinner color="white" />
      </div>
    </div>
    <div class="userInfo">
      <UserList :users="users" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
