import { HtmlSection, HtmlInput, HtmlLabel } from 'htmlmodule'
import { TodoList } from './TodoList'
import api from './api'

export class TodoMain extends HtmlSection
{
  static className = 'main'

  render() {
    return [
      new HtmlInput({
        id : 'toggle-all',
        className : 'toggle-all',
        type : 'checkbox',
        checked : this.props.items.every(item => item.completed),
        onclick : e => {
          void api.updateItems({ completed : e.target.node.checked })
        },
      }),
      new HtmlLabel({
        htmlFor : 'toggle-all',
      }),
      new TodoList({
        items : this.props.items,
      }),
    ]
  }
}
