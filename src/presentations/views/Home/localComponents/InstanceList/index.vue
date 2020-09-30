<template>
  <transition name="t-fade" appear>
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
            <div class="sortGroup">
              <div class="sortGroup_title">ソート</div>
              <div class="sortGroup_select">
                <g-Select :items="orderSelectItems" v-model="order" />
              </div>
            </div>
          </div>
        </template>
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :size-dependencies="[item]"
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
      <div v-if="isInitialized" class="toTop">
        <g-ToTopButton :scrollerElement="scrollerElement" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
