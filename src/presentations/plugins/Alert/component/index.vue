<template>
  <g-Dialog v-if="visible" :title="title" @after-leave="$emit('afterLeave')">
    <template v-slot:content>
      <template v-if="isMarkdown">
        <g-MarkdownText :markdownText="content" />
      </template>
      <template v-else>{{ content }}</template>
    </template>
    <template v-slot:buttonArea>
      <template v-for="customButtonOption in customButtonOptions">
        <!-- eslint-disable-next-line -->
        <g-Button class="u-ml20 u-mr20" :color="customButtonOption.color" @click="customButtonOption.onClick">{{ customButtonOption.text }}</g-Button>
      </template>
      <g-Button v-if="showCloseButton" class="u-ml20 u-mr20" @click="close"
        >閉じる</g-Button
      >
    </template>
  </g-Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
