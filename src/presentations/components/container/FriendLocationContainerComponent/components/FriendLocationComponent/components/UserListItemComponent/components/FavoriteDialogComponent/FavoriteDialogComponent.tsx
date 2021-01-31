import { FavoriteLimit, Friend } from '../../../../../../../../../types'
import styles from './style.module.scss'
import { DialogComponent } from '../../../../../../../../presentational/DialogComponent/DialogComponent'
import { useEffect, useMemo, useState } from 'react'
import { FavoriteTag, FavoriteTags } from '../../../../../../../../../../types'
import { SpinnerComponent } from '../../../../../../../../presentational/SpinnerComponent/SpinnerComponent'
import { SelectComponent } from '../../../../../../../../presentational/SelectComponent/SelectComponent'
import { ButtonComponent } from '../../../../../../../../presentational/ButtonComponent/ButtonComponent'

type Props = {
  isVisible: boolean
  friend: Friend
  fetchFavoriteLimits: () => Promise<FavoriteLimit[]>
  onClickFavorite: (tag: FavoriteTag) => void
  hide: () => void
}
export const FavoriteDialogComponent = (props: Props) => {
  const [isLoadingLimits, setIsLoadingLimits] = useState(true)
  const [limits, setLimits] = useState<FavoriteLimit[] | null>(null)

  const [selectTag, setSelectTag] = useState<FavoriteTag>(FavoriteTags.Group0)
  const onChangeSelect = (tag: FavoriteTag) => {
    setSelectTag(tag)
  }

  const selectItems = useMemo(() => {
    if (limits === null) return []

    return [
      ...limits.map((limit) => {
        return {
          label: `${limit.name}(${limit.used}/${limit.capacity})`,
          value: limit.name,
        }
      }),
    ]
  }, [limits])

  const favoriteButtonIsDisabled = useMemo(() => {
    if (limits === null) return true
    const limit = limits.find((limit) => limit.name === selectTag)
    if (limit === undefined) return true

    if (limit.used >= limit.capacity) return true

    return false
  }, [limits, selectTag])

  const onClickFavorite = () => {
    props.onClickFavorite(selectTag)
  }

  const { isVisible, fetchFavoriteLimits } = props
  useEffect(() => {
    if (isVisible) {
      ;(async () => {
        const limits = await fetchFavoriteLimits()
        setLimits(limits)
        setIsLoadingLimits(false)
      })()
    }
  }, [isVisible, fetchFavoriteLimits, setLimits, setIsLoadingLimits])

  return (
    <DialogComponent
      isVisible={props.isVisible}
      title={`Favorite ${props.friend.displayName}`}
      contentSlot={
        <>
          <div className="u-mb20">
            グループを選択して「Favorite」ボタンを押してください。
          </div>
          <div className={styles.content}>
            {isLoadingLimits ? (
              <SpinnerComponent color="gray" size={30} />
            ) : (
              <SelectComponent
                items={selectItems}
                value={selectTag}
                onChange={onChangeSelect}
              />
            )}
          </div>
        </>
      }
      buttons={[
        <ButtonComponent onClick={props.hide}>
          <span>閉じる</span>
        </ButtonComponent>,
        <ButtonComponent
          color="primary"
          onClick={onClickFavorite}
          isDisabled={favoriteButtonIsDisabled}
        >
          <span>Favorite</span>
        </ButtonComponent>,
      ]}
    />
  )
}
