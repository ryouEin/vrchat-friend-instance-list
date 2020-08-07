<template>
  <div class="c-home">
    <div class="side">
      <div class="header">
        Online Friends
      </div>
      <div class="content">
        <div v-if="showOnlineFriendsListLoading" class="u-alignCenter u-pt20">
          <g-Spinner color="black" :size="24" />
        </div>
        <OnlineFriendsList v-else :friends="friends" />
      </div>
    </div>
    <div class="main">
      <div v-if="showInstanceListLoading" class="u-alignCenter u-pt40">
        <g-Spinner color="black" />
      </div>
      <template v-else>
        <InstanceList :instances="instances" />
        <g-FAB @click="reload">
          <g-Spinner v-if="showFABLoading" color="white" />
          <g-Icon v-else :size="50" color="white">refresh</g-Icon>
        </g-FAB>
      </template>
    </div>
    <!-- TODO SOON: ローカルコンポーネント化 -->
    <div v-if="isVisibleInstanceModal" class="instanceModal">
      <div class="overlay" @click="onClickInstanceModalOverlay" />
      <div class="instance">
        <InstanceListItem :instance="instanceModalInstance" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
