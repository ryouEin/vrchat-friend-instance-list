import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'
import { MenuComponent } from './components/MenuComponent/MenuComponent'
import React from 'react'
import { useVisibilityManager } from '../../../hooks/useVisibilityManager'
import { useSetting } from '../../hooks/useSetting'
import { settingRepository } from '../../../../factory/repository'
import { useNotification } from '../../hooks/useNotification'
import { notifier } from '../../../../factory/notifier'

export const HeaderContainerComponent = () => {
  const menu = useVisibilityManager(false)
  const setting = useSetting(settingRepository)
  const { notifications } = useNotification(notifier)

  return (
    <>
      <HeaderComponent notifications={notifications} onClickMenu={menu.show} />
      <MenuComponent
        isVisible={menu.isVisible}
        hide={menu.hide}
        setting={setting.value}
        onChangeSetting={setting.changeSetting}
      />
    </>
  )
}
