import { DialogComponent } from '../../../../../../../components/presentational/DialogComponent/DialogComponent'
import AuthorImage from '../../../../../../../assets/creditThumbnail.jpg'
import TwitterLogoImage from '../../../../../../../assets/twitterLogo.png'
import { ButtonComponent } from '../../../../../../../components/presentational/ButtonComponent/ButtonComponent'
import styles from './style.module.scss'

type Props = {
  isVisible: boolean
  hide: () => void
}
export const AuthorDialogComponent = (props: Props) => {
  return (
    <DialogComponent
      isVisible={props.isVisible}
      title="製作者"
      contentSlot={
        <>
          <div className={styles.author}>
            <div className={styles.authorImage}>
              <img src={AuthorImage} alt="" />
            </div>
            <div className={styles.authorName}>ryou</div>
            <div className={styles.authorRole}>Silent Club オーナー</div>
            <div className={styles.authorSns}>
              <a
                href="https://twitter.com/ryou_Ein"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={TwitterLogoImage} alt="Twitter" />
              </a>
            </div>
          </div>
        </>
      }
      buttons={[
        <ButtonComponent onClick={props.hide}>
          <span>閉じる</span>
        </ButtonComponent>,
      ]}
    />
  )
}
