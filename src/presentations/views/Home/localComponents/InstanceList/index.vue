<template>
  <div class="c-instanceList">
    <DynamicScroller
      id="InstanceList"
      :items="items"
      :min-item-size="250"
      class="scroller"
      :buffer="1500"
      ref="scroller"
    >
      <template #before>
        <div class="filterArea">
          <div class="toggleButtonGroup">
            <div class="toggleButtonGroup_toggle">
              <g-Toggle v-model="showOnlyFavoriteFriends" />
            </div>
            <div class="toggleButtonGroup_label">
              Favoriteユーザのみ表示
            </div>
          </div>
        </div>
      </template>
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.friends.length]"
          :data-index="index"
        >
          <div class="item">
            <InstanceListItem
              :instance="item.instance"
              :friends="item.friends"
            />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
    <WatchInstanceDialog />
    <transition name="t-up">
      <div v-show="isVisibleToTop" class="toTop" @click="toTop">
        <g-Icon size="35">keyboard_arrow_up</g-Icon>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
