<template>
  <div class="c-instanceList">
    <DynamicScroller
      id="InstanceList"
      :items="instances"
      :min-item-size="250"
      class="scroller"
      key-field="location"
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
            <InstanceListItem :instance="item" />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
    <WatchInstanceDialog />
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
