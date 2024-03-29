import { HtmlLi, HtmlInput, HtmlDiv, HtmlButton, HtmlLabel } from 'htmlmodule'
import api from './api'

export class TodoItem extends HtmlLi
{
  state = {
    busy : false,
    editing : false,
    text : '',
  }

  render() {
    const item = this.props.item
    this.classList = [
      item.completed && 'completed',
      this.state.editing && 'editing',
    ]
    return [
      new HtmlDiv({
        className : 'view',
        children : [
          this._checkbox = new HtmlInput({
            className : 'toggle',
            type : 'checkbox',
            checked : item.completed,
            disabled : this.state.busy,
            onchange : this.onCheck,
          }),
          new HtmlLabel({
            children : item.text,
            ondblclick : this.onEdit,
          }),
          new HtmlButton({
            className : 'destroy',
            disabled : this.state.busy,
            onclick : this.onDelete,
          }),
        ],
      }),
      this._input = new HtmlInput({
        className : 'edit',
        value : this.state.text || item.text,
        onkeydown : e => {
          e.code === 'Enter' && this.save()
          e.code === 'Escape' && this.setState({ editing : false })
        },
        onblur : () => this.save(),
      }),
    ]
  }

  save = async () => {
    const text = this._input.node.value.trim()
    this.setState({
      text,
      busy : true,
    })
    await api.updateItem({
      text,
      id : this.props.item.id,
    })
    this.setState({
      text : '',
      busy : false,
      editing : false,
    })
  }

  onCheck = async () => {
    const item = this.props.item
    this.setState({ busy : true })
    await api.updateItem({
      id : item.id,
      completed : !item.completed,
    })
    if(location.hash === '#/active' && item.completed) {
      return
    }
    if(location.hash === '#/completed' && !item.completed) {
      return
    }
    this.setState({ busy : false })
    this._checkbox.focus()
  }

  onEdit = () => {
    this.setState({ editing : true })
    this._input.focus()
  }

  onDelete = async () => {
    this.setState({ busy : true })
    await api.deleteItem(this.props.item.id)
  }
}
