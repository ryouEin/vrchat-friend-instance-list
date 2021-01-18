<template>
  <div class="c-home">
    <div class="side" :class="{ '-visible': isVisibleOnlineFriends }">
      <div class="overlay" @click="hideOnlineFriends" />
      <div class="content">
        <OnlineFriendsList :friends="friends" />
      </div>
    </div>
    <div class="main">
      <InstanceList :friendLocations="friendLocations" />
      <div class="u-spOnly">
        <g-FAB position="left" @click="showOnlineFriends">
          <g-Icon :size="50" color="black">people</g-Icon>
        </g-FAB>
      </div>
      <g-FAB color="main" @click="reload">
        <g-Spinner v-if="showFABLoading" color="white" />
        <g-Icon v-else :size="50" color="white">refresh</g-Icon>
      </g-FAB>
    </div>
    <JoinDialog :location="joinDialogLocation" :hide="hideJoinDialog" />
    <WatchInstanceDialog
      v-if="watchInstanceDialogInstance !== null"
      :instance="watchInstanceDialogInstance"
      :hide="hideWatchDialog"
    />
    <FavoriteDialog
      v-if="favoriteDialogProps !== null"
      :props="favoriteDialogProps"
    />
    <UnfavoriteDialog
      v-if="unfavoriteDialogProps !== null"
      :props="unfavoriteDialogProps"
    />
    <!-- TODO SOON: Injectの都合上、Presentationコンポーネントの中にrouter-viewがあるのが気になる -->
    <transition appear name="t-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
