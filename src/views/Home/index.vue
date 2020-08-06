<template>
  <div class="c-home">
    <div class="side">
      <div class="header">
        Online Friends
      </div>
      <div class="content">
        <div v-if="showUserListLoading" class="u-alignCenter u-pt20">
          <g-Spinner color="black" :size="24" />
        </div>
        <UserList v-else :users="users" @focusUser="onFocusUser" />
      </div>
    </div>
    <div class="main">
      <div v-if="showInstanceListLoading" class="u-alignCenter u-pt40">
        <g-Spinner color="black" />
      </div>
      <template v-else>
        <InstanceList :users="users" />
        <g-FAB @click="reload">
          <g-Spinner v-if="showFABLoading" color="white" />
          <g-Icon v-else :size="50" color="white">refresh</g-Icon>
        </g-FAB>
        <div class="credit">
          <div class="creditTitle">
            <div class="en">Credit</div>
            <div class="jp">- アプリ製作者 -</div>
          </div>
          <div class="creditMain">
            <div class="creditCard">
              <div class="creditThumb">
                <img src="@/assets/creditThumbnail.jpg" alt="" />
              </div>
              <div class="creditText">
                <div class="name">ryou_Ein</div>
                <div class="role">
                  ボイスミュートワールド<br />Silent Club オーナー
                </div>
                <ul class="link">
                  <li>
                    <a
                      href="https://twitter.com/ryou_Ein"
                      target="_blank"
                      rel="noopener"
                      >Twitter</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://sc.doll-profile.com/"
                      target="_blank"
                      rel="noopener"
                      >Silent Club</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
