import { ISettingRepository } from '../../../repositories/Setting/ISettingRepository'
import { selectSetting, setSetting } from '../../store/Setting/SettingStore'
import { useDispatch, useSelector } from 'react-redux'
import { Setting } from '../../types'

export const useSetting = (settingRepository: ISettingRepository) => {
  const dispatch = useDispatch()
  const setting = useSelector(selectSetting)

  return {
    value: setting,
    init: async () => {
      const setting = await settingRepository.getSetting()
      if (setting !== undefined) {
        dispatch(setSetting(setting))
      }
    },
    changeSetting: async (setting: Setting) => {
      dispatch(setSetting(setting))
      await settingRepository.updateSetting(setting)
    },
  }
}
