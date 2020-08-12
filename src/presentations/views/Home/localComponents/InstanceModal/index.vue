<template>
  <transition name="t-fade">
    <div v-if="isVisible" class="c-instanceModal">
      <div class="overlay" @click="hide" />
      <div class="instance" @click="hide">
        <InstanceListItem
          :instance="instance"
          :friends="friends"
          @click.native.stop
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
