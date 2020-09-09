<template>
  <div class="c-home" v-hammer:swipe.right="showInstanceList">
    <div
      class="side"
      :class="{ '-visible': isVisibleSideMenu }"
      v-hammer:swipe.left="hideInstanceList"
    >
      <div class="overlay" @click="hideInstanceList" />
      <div class="content">
        <div v-if="showOnlineFriendsListLoading" class="u-alignCenter u-pt20">
          <g-Spinner color="front" :size="24" />
        </div>
        <OnlineFriendsList v-else :friends="friends" />
      </div>
    </div>
    <div class="main">
      <div v-if="showInstanceListLoading" class="u-alignCenter u-pt40">
        <g-Spinner color="front" />
      </div>
      <template v-else>
        <InstanceList :instances="instances" />
        <div class="u-spOnly">
          <g-FAB position="left" @click="showInstanceList">
            <g-Icon :size="50" color="black">people</g-Icon>
          </g-FAB>
        </div>
        <g-FAB color="main" @click="reload">
          <g-Spinner v-if="showFABLoading" color="white" />
          <g-Icon v-else :size="50" color="white">refresh</g-Icon>
        </g-FAB>
      </template>
    </div>
    <InstanceModal />
    <JoinDialog />
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
