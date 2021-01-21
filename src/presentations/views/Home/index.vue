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
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
