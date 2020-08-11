<template>
  <g-Dialog v-if="visible" :title="title" @after-leave="$emit('afterLeave')">
    <template v-slot:content>
      <template v-if="isMarkdown">
        <g-MarkdownText :markdownText="content" />
      </template>
      <template v-else>{{ content }}</template>
    </template>
    <template v-slot:buttonArea>
      <g-Button @click="close">閉じる</g-Button>
    </template>
  </g-Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
