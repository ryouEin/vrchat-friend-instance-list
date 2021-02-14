import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'
import { MenuComponent } from './components/MenuComponent/MenuComponent'
import React from 'react'
import { useVisibilityManager } from '../../../hooks/useVisibilityManager'
import { useSetting } from '../../../store/Setting/useSetting'
import { settingRepository } from '../../../../factory/repository'
import { Notification } from '../../../types'

type Props = {
  notifications: Notification[]
}
export const HeaderContainerComponent = (props: Props) => {
  const menu = useVisibilityManager(false)
  const setting = useSetting(settingRepository)

  return (
    <>
      <HeaderComponent
        notifications={props.notifications}
        onClickMenu={menu.show}
      />
      <MenuComponent
        isVisible={menu.isVisible}
        hide={menu.hide}
        setting={setting.value}
        onChangeSetting={setting.changeSetting}
      />
    </>
  )
}
