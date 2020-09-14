<template>
  <div class="c-dropdownMenu" v-click-outside="hideMenu">
    <div class="activator" @click="showMenu"><slot /></div>
    <transition :name="transitionName">
      <div v-if="isVisibleMenu" class="menu" :style="menuStyle">
        <div class="items">
          <template v-for="(item, index) in items">
            <div
              class="item"
              :class="{ '-disabled': item.isDisabled }"
              :key="index"
              @click="onClickItem(index)"
            >
              {{ item.label }}
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
