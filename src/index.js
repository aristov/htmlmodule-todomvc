import { TodoApp } from './TodoApp'

const render = app => {
  app?.__destroy()
  return TodoApp.render({}, document.getElementById('app'))
}

let app = render()

module.hot?.accept(['./TodoApp'], () => app = render(app))
