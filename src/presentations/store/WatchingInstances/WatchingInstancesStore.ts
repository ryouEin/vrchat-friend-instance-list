import { computed, reactive } from '@vue/composition-api'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type WatchingInstance = {
  instanceId: string
  notifyFreeSpaceNum: number
}

type State = {
  watchingInstances: WatchingInstance[]
}
@MakeReferenceToWindowObjectInDevelopment('watchingInstancesStore')
export class WatchingInstancesStore {
  private readonly _state = reactive<State>({
    watchingInstances: [],
  })

  readonly watchingInstances = computed<WatchingInstance[]>(() => {
    return this._state.watchingInstances
  })

  @LogBeforeAfter('_state')
  private addWatchingInstanceMutation(watchingInstance: WatchingInstance) {
    this._state.watchingInstances = this._state.watchingInstances.concat([
      watchingInstance,
    ])
  }

  @LogBeforeAfter('_state')
  private deleteWatchingInstanceMutation(instanceId: string) {
    this._state.watchingInstances = this._state.watchingInstances.filter(
      watchingInstance => watchingInstance.instanceId !== instanceId
    )
  }

  async addAction(watchingInstance: WatchingInstance) {
    this.addWatchingInstanceMutation(watchingInstance)
  }

  async deleteAction(instanceId: string) {
    this.deleteWatchingInstanceMutation(instanceId)
  }
}
