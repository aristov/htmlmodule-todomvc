import { HtmlSection } from 'htmlmodule'
import { TodoMain } from './TodoMain'
import { TodoFooter } from './TodoFooter'
import { TodoHeader } from './TodoHeader'
import api from './api'

export class TodoApp extends HtmlSection
{
  static className = 'todoapp'

  state = {
    items : [],
  }

  render() {
    const items = this.state.items
    return [
      new TodoHeader,
      !!items.length && [
        new TodoMain({ items }),
        new TodoFooter({ items }),
      ],
    ]
  }

  async init() {
    window.onhashchange = () => this.setState()
    api.addEventListener('update', this.onUpdate)
    this.setState({
      items : await api.getItems(),
    })
  }

  destroy() {
    window.onhashchange = null
    api.removeEventListener('update', this.onUpdate)
  }

  onUpdate = e => {
    this.setState({
      items : e.detail,
    })
  }
}
