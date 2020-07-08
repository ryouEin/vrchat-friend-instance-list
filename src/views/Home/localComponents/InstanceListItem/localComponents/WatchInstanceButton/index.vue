<template>
  <div class="c-watchInstanceButton">
    <InstanceButton v-if="isWatching" @click="endWatch">
      <Icon :size="20" color="green">visibility</Icon>
    </InstanceButton>
    <InstanceButton v-else @click="showDialog">
      <Icon :size="20" color="black">visibility</Icon>
    </InstanceButton>

    <Dialog v-if="dialogIsVisible" title="インスタンス空き状況監視">
      <template v-slot:content>
        <div class="u-mb20">
          監視開始ボタンを押すことで、一定数以上の空きを確認次第通知します。<br />
          （1分毎に空き状況を自動で確認します。）
        </div>
        <div class="u-alignCenter">
          <!-- TODO: valueを文字列で渡さないといけない点どうにかしたい -->
          <Select
            class="u-mr5"
            :items="[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
            ]"
            :value="String(notifyUserNum)"
            @input="onChangeNotifyUserNum"
          />
          人以上の空きで通知
        </div>
      </template>
      <template v-slot:buttonArea>
        <Button class="u-mr20" @click="hideDialog">閉じる</Button>
        <Button primary @click="onClickWatchStart">監視開始</Button>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" src="./script.ts" />
<style lang="scss" src="./style.scss" scoped />
