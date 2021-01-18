<template>
  <div class="c-instanceModal">
    <div class="overlay" @click="hide" />
    <div class="scrollArea">
      <!--
      ・Firefoxはoverflow: autoとpaddingを同時に指定すると、下端のpaddingが無視される
      ・InstanceListItem内部のv-click-outsideを有効にするために、stopPropagationは利用できない
      という制約のために若干トリッキーなレイアウトの実装になっている
      -->
      <div class="verticalSpacer" @click="hide" />

      <div class="main">
        <div class="sideSpacer" @click="hide" />
        <div class="instance">
          <InstanceListItem :friendLocation="friendLocation" />
        </div>
        <div class="sideSpacer" @click="hide" />
      </div>

      <div class="verticalSpacer" @click="hide" />
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
