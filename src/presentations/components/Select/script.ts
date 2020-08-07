import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

type SelectItem = {
  label: string
  value: string
}

@Component({
  components: {},
})
export default class Select extends Vue {
  @Prop({ default: () => [] })
  items!: SelectItem[]

  @Prop()
  value!: string
}
