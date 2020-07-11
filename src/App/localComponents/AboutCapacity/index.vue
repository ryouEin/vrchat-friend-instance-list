<template>
  <div class="c-aboutCapacity">
    <button class="trigger" @click="showDialog">
      <Icon class="u-mr5" :size="20" color="white">help</Icon>
      <span>インスタンスの最大人数に関して</span>
    </button>
    <Dialog v-if="dialogIsVisible" title="インスタンスの最大人数に関して">
      <template v-slot:content>
        <MarkdownText
          :markdownText="
            `インスタンスの現在人数及び最大人数は、「現在人数 / 最大人数」という形でインスタンスのサムネイル右肩に表記しています。

インスタンスには、ワールドのcapacityの2倍の人数が実際には入れます。（例外として、capacityが1の場合は1人しか入れません）

表記している最大人数は、インスタンスに実際入れる人数を上の基準で計算の上表記しています。
`
          "
        />
      </template>
      <template v-slot:buttonArea>
        <Button @click="hideDialog">閉じる</Button>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
