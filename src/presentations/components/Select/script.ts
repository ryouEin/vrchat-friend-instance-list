import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

type SelectValue = string | number | boolean
type SelectItem = {
  label: string
  value: SelectValue
}

@Component
export default class Select extends Vue {
  @Prop({ default: () => [] })
  readonly items!: SelectItem[]

  @Prop({ required: true })
  readonly value!: SelectValue

  get selectedIndex() {
    const index = this.items.findIndex(item => item.value === this.value)
    if (index < 0) {
      throw new Error(
        `cant find ${this.value} in ${JSON.stringify(this.items)}`
      )
    }

    return index
  }

  onChange(event: InputEvent) {
    const target = event.target as HTMLSelectElement
    const optionValue = Number(target.value)
    const value = this.items[optionValue].value

    this.$emit('input', value)
  }
}
