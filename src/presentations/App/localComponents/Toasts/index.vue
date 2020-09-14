<template>
  <div class="c-toasts" :style="rootStyle">
    <div class="toasts">
      <transition-group name="toast">
        <template v-for="(toast, index) in toasts">
          <div
            v-if="toast.isVisible"
            class="toast"
            :style="toastStyle"
            :key="index"
          >
            <Toast
              :type="toast.type"
              :content="toast.content"
              @close="onClose(index)"
            />
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
