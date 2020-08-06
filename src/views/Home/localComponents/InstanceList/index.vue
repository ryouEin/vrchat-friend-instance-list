<template>
  <div class="c-instanceList">
    <DynamicScroller
      :items="instances"
      :min-item-size="250"
      class="scroller"
      :buffer="1500"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.users]"
          :data-index="index"
        >
          <div class="item">
            <Instance :location="item.location" :users="item.users" />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
