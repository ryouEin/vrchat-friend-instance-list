<template>
  <g-Dialog title="インスタンス空き状況監視">
    <template v-slot:content>
      <div class="u-mb20">
        監視開始ボタンを押すことで、一定数以上の空きを確認次第通知します。<br />
        （1分毎に空き状況を自動で確認します。）
      </div>
      <div class="u-alignCenter">
        <g-Select class="u-mr5" :items="selectItems" v-model="notifyUserNum" />
        人以上の空きで通知
      </div>
    </template>
    <template v-slot:buttonArea>
      <g-Button class="u-mr20" @click="hide">閉じる</g-Button>
      <g-Button class="u-mr20" color="primary" @click="startWatch"
        >監視開始</g-Button
      >
    </template>
  </g-Dialog>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
