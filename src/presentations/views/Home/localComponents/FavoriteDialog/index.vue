<template>
  <g-Dialog :title="`Favorite ${friend.displayName}`">
    <template v-slot:content>
      <div class="u-mb20">
        グループを選択して「Favorite」ボタンを押してください。
      </div>
      <div class="content">
        <g-Spinner v-if="isLoadingLimits" color="gray" :size="30" />
        <g-Select
          v-else
          class="u-mr5"
          :items="selectItems"
          :value="selectedTag"
          @input="onChangeSelect"
        />
      </div>
    </template>
    <template v-slot:buttonArea>
      <g-Button class="u-mr20" @click="hide">閉じる</g-Button>
      <g-Button
        :disabled="favoriteButtonIsDisabled"
        class="u-mr20"
        color="primary"
        @click="favoriteButtonHandler"
        >Favorite</g-Button
      >
    </template>
  </g-Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
