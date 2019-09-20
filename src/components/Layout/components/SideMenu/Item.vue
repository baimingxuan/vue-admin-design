<script>
import SvgIcon from '../../../../components/SvgIcon'
export default {
  name: 'Item',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const { icon, title } = context.props
    const vnodes = []
    if (icon) {
      vnodes.push(<SvgIcon class="icon" icon-class={icon}></SvgIcon>)
    }
    if (title) {
      vnodes.push(<span slot="title">{title}</span>)
    }
    return vnodes
  }
}
</script>

<style lang="scss">
  .icon{
    width: 18px;
    height: 18px;
    font-size: 50px;
  }
</style>
