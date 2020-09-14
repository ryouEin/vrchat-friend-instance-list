<template>
  <div class="c-userList">
    <RecycleScroller
      class="scroller"
      :items="sortedFriends"
      :item-size="itemHeight"
      key-field="id"
      :buffer="1500"
      ref="scroller"
    >
      <template v-slot="{ item }">
        <div class="item">
          <OnlineFriendsListItem
            :friend="item"
            :style="{ height: `${itemHeight}px` }"
          />
        </div>
      </template>
      <template #after>
        <div class="lastSpacer" />
      </template>
    </RecycleScroller>
    <transition name="t-up">
      <div v-if="isVisibleToTop" class="toTop" @click="toTop">
        <g-Icon size="35" color="back">keyboard_arrow_up</g-Icon>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
