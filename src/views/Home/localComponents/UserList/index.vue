<template>
  <div class="c-userList">
    <RecycleScroller
      class="scroller"
      :items="sortedUsers"
      :item-size="itemHeight"
      key-field="id"
      v-slot="{ item }"
      :buffer="1500"
    >
      <div class="item">
        <UserListItem
          :user="item"
          @click="onClick"
          :style="{ height: `${itemHeight}px` }"
        />
      </div>
    </RecycleScroller>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
