import styles from './style.module.scss'
import MarkdownIt from 'markdown-it'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import { useMemo } from 'react'

const md = new MarkdownIt()
md.use(markdownItLinkAttributes, {
  attrs: {
    target: '_blank',
    rel: 'noopener',
  },
})

type Props = {
  markdownText: string
}
export const MarkdownTextComponent = (props: Props) => {
  const html = useMemo(() => {
    return {
      __html: md.render(props.markdownText),
    }
  }, [props])

  return <div className={styles.root} dangerouslySetInnerHTML={html} />
}
