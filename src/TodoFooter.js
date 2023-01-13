import { HtmlFooter, HtmlSpan, HtmlStrong, HtmlUl, HtmlLi, HtmlA, HtmlButton } from 'htmlmodule'
import api from './api'

export class TodoFooter extends HtmlFooter
{
  static className = 'footer'

  render() {
    const items = this.props.items
    const itemsLeft = items.filter(item => !item.completed)
    return [
      new HtmlSpan({
        className : 'todo-count',
        children : [
          new HtmlStrong(itemsLeft.length),
          itemsLeft.length === 1 ? ' item left' : ' items left',
        ],
      }),
      new HtmlUl({
        className : 'filters',
        children : [
          new HtmlLi(new HtmlA({
            href : '#/',
            classList : !['#/active', '#/completed'].includes(location.hash) && 'selected',
            children : 'All',
          })),
          new HtmlLi(new HtmlA({
            href : '#/active',
            classList : location.hash === '#/active' && 'selected',
            children : 'Active',
          })),
          new HtmlLi(new HtmlA({
            href : '#/completed',
            classList : location.hash === '#/completed' && 'selected',
            children : 'Completed',
          })),
        ],
      }),
      !!(items.length - itemsLeft.length) && new HtmlButton({
        className : 'clear-completed',
        children : 'Clear completed',
        onclick : () => api.deleteItems(
          items.filter(item => item.completed).map(item => item.id),
        ),
      }),
    ]
  }
}
