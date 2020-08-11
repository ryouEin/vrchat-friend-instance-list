import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItLinkAttributes from 'markdown-it-link-attributes'

const md = new MarkdownIt()
md.use(markdownItLinkAttributes, {
  attrs: {
    target: '_blank',
    rel: 'noopener',
  },
})

@Component
export default class MarkdownText extends Vue {
  @Prop({ required: true })
  readonly markdownText!: string

  get html() {
    return md.render(this.markdownText)
  }
}
