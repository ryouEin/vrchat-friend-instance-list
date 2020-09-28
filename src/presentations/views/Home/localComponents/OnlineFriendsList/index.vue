<template>
  <transition name="t-fade" appear>
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
      <div v-if="isInitialized" class="toTop">
        <g-ToTopButton :scrollerElement="scrollerElement" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
