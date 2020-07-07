<template>
  <div class="c-notificationButton">
    <div class="button" @click="showMenu">
      <Icon :size="24" color="white">notifications</Icon>
      <span class="text">通知一覧</span>
      <div class="badge"></div>
    </div>
    <div v-if="menuIsVisible" class="menu" v-click-outside="hideMenu">
      <div class="items">
        <div class="item">
          <div class="content">
            「ワールド名」に空きができました。<br />
            （クリックでインスタンスを表示）
          </div>
          <div class="time">2020/7/20 18:20</div>
        </div>
        <div class="item">
          <div class="content">
            「ワールド名」に空きができました。<br />
            （クリックでインスタンスを表示）
          </div>
          <div class="time">2020/7/20 18:20</div>
        </div>
        <div class="item">
          <div class="content">
            「ワールド名」に空きができました。<br />
            （クリックでインスタンスを表示）
          </div>
          <div class="time">2020/7/20 18:20</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
