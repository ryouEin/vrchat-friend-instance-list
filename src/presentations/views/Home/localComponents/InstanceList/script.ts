import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { Instance } from '@/types'
import WatchInstanceDialog from '@/presentations/views/Home/localComponents/InstanceList/localComponents/WatchInstanceDialog/index.vue'
import { friendsModule } from '@/store/ModuleFactory'
import { isPcDevice } from '@/shame/isPcDevice'

// TODO: インスタンスの高さ計算もうちょっとなんとかならんか
const imageSize = (() => {
  const windowWidth = window.innerWidth
  const outerPadding = 30
  const innerPadding = 5
  return (windowWidth - outerPadding * 2 - innerPadding * 2) / 3
})()
const calcSingleInstanceSizeInSpLayout = (friendsNum: number) => {
  const heightWithoutUserArea = 241
  const rowNumInUserArea = Math.ceil(friendsNum / 3)
  return heightWithoutUserArea + imageSize * rowNumInUserArea
}

@Component({
  components: {
    InstanceListItem,
    WatchInstanceDialog,
  },
})
export default class InstanceList extends Vue {
  @Prop()
  private instances!: Instance[]

  get isPC() {
    return isPcDevice
  }

  get instancesWithSize() {
    return this.instances.map(instance => {
      const friendsNum = friendsModule.friendsByLocation(instance.location)
        .length
      return {
        ...instance,
        size: calcSingleInstanceSizeInSpLayout(friendsNum),
      }
    })
  }
}
