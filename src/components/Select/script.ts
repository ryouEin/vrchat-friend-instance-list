import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Icon from '@/components/Icon/index.vue'

type SelectItem = {
  label: string
  value: string
}

@Component({
  components: {
    Icon,
  },
})
export default class Select extends Vue {
  @Prop({ default: () => [] })
  items!: SelectItem[]

  @Prop()
  value!: string
}
