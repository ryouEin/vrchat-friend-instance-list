<template>
  <div class="c-aboutCapacity">
    <button class="trigger" @click="showDialog">
      <Icon class="u-mr5" :size="20" color="white">help</Icon>
      <span>インスタンスの最大人数に関して</span>
    </button>
    <Dialog v-if="dialogIsVisible" title="インスタンスの最大人数に関して">
      <template v-slot:content>
        インスタンスの現在人数及び最大人数は、「現在人数 /
        最大人数」という形でワールドのサムネイル画像の右肩に表記しています。<br />
        <br />
        インスタンスには、ワールドのcapacityの2倍の人数が実際には入れます。（例外あり）<br />
        なので、最大人数は以下の基準で算出し表記しています。<br />
        <br />
        ・ワールドのcapacityの2倍<br />
        ・例外として、capacityが1の場合は2倍しない（1のまま）
      </template>
      <template v-slot:buttonArea>
        <Button @click="hideDialog">閉じる</Button>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
