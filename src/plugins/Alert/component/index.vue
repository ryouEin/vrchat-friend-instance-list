<template>
  <Dialog v-if="visible" :title="title" @after-leave="$emit('afterLeave')">
    <template v-slot:content>
      <template v-if="isMarkdown">
        <MarkdownText :markdownText="content" />
      </template>
      <template v-else>{{ content }}</template>
    </template>
    <template v-slot:buttonArea>
      <Button @click="close">Close</Button>
    </template>
  </Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
