import { computed, reactive } from '@vue/composition-api'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type InstanceUserNum = {
  instanceId: string
  userNum: number
}

type State = {
  instanceUserNums: InstanceUserNum[]
}
@MakeReferenceToWindowObjectInDevelopment('instanceUserNumsStore')
export class InstanceUserNumsStore {
  private readonly _state = reactive<State>({
    instanceUserNums: [],
  })

  readonly instanceUserNums = computed<InstanceUserNum[]>(() => {
    return this._state.instanceUserNums
  })

  @LogBeforeAfter('_state')
  private addInstanceUserNumMutation(instanceUserNum: InstanceUserNum) {
    const existsInState = this.instanceUserNums.value.find(
      stateInstanceUserNum =>
        stateInstanceUserNum.instanceId === instanceUserNum.instanceId
    )
    if (existsInState !== undefined) {
      this.deleteInstanceUserNumMutation(instanceUserNum.instanceId)
    }

    this._state.instanceUserNums = this._state.instanceUserNums.concat([
      instanceUserNum,
    ])
  }

  @LogBeforeAfter('_state')
  private deleteInstanceUserNumMutation(instanceId: string) {
    this._state.instanceUserNums = this._state.instanceUserNums.filter(
      instanceUserNum => instanceUserNum.instanceId !== instanceId
    )
  }

  async addAction(instanceUserNum: InstanceUserNum) {
    this.addInstanceUserNumMutation(instanceUserNum)
  }
}
