import { IJoinRepository } from '@/infras/Join/IJoinRepository'
import { INetwork } from '@/libs/Network/INetwork'
import { VrcApiUrl } from '@/config/url'
import { InstanceLocation } from '@/types'

export class NetworkJoinRepository implements IJoinRepository {
  constructor(private readonly _network: INetwork) {}

  async inviteMe(location: InstanceLocation): Promise<void> {
    await this._network.post(VrcApiUrl.getInviteMeUrl(location), {})
  }
}
