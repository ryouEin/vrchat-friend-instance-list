<template>
  <Dialog v-if="visible" :title="title" @after-leave="$emit('afterLeave')">
    <template v-slot:content>{{ content }}</template>
    <template v-slot:buttonArea>
      <Button @click="close">Close</Button>
    </template>
  </Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
