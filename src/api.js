const DELAY = 0

export class AppInteface extends EventTarget
{
  constructor() {
    super()
    const json = localStorage.getItem('TodoApp.items')
    this._data = json ? JSON.parse(json) : []
  }

  async _save() {
    localStorage.setItem('TodoApp.items', JSON.stringify(this._data))
    await new Promise(resolve => {
      setTimeout(resolve, DELAY)
    })
    this.dispatchEvent(new CustomEvent('update', {
      detail : this._data.slice(),
    }))
  }

  async getItems() {
    return new Promise(resolve => {
      setTimeout(() => resolve(this._data.slice()), DELAY)
    })
  }

  async createItem(item) {
    item.id = Date.now()
    this._data.unshift(item)
    return this._save()
  }

  async updateItem(item) {
    const oldItem = this._data.find(({ id }) => id === item.id)
    Object.assign(oldItem, item)
    return this._save()
  }

  async updateItems(item) {
    this._data.forEach(oldItem => Object.assign(oldItem, item))
    return this._save()
  }

  async deleteItem(id) {
    this._data = this._data.filter(item => item.id !== id)
    return this._save()
  }

  async deleteItems(ids) {
    this._data = this._data.filter(item => !ids.includes(item.id))
    return this._save()
  }
}

const api = window.api = new AppInteface

export default api
