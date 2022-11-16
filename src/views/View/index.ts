interface IView {
  render(item: any): any
  renderMany(items: any[]): any
}

export class View<Item> implements IView {
  public render(item: Item): any {
    return item
  }

  public renderMany(items: Item[]): any {
    return items.map(item => this.render(item))
  }
}