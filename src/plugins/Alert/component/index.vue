<template>
  <Dialog v-if="visible" :title="title" @after-leave="$emit('afterLeave')">
    <template v-slot:content>
      <!-- eslint-disable-next-line -->
      <div v-for="line in contents">{{ line }}</div>
    </template>
    <template v-slot:buttonArea>
      <Button @click="close">Close</Button>
    </template>
  </Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
