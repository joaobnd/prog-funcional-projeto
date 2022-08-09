export class Util {

  static orderBy(collection: any[], attr: string = 'type'): any[] {

    return collection.sort(
      (a, b) => a[attr].localeCompare(b[attr])
    )
  }

  static distinct(collection: any[], attr: string = 'type'): any[] {

    const uniqueAttrs: any[] = []
    const aux = collection

    const unique = aux.filter(element =>{
      const isDuplicate = uniqueAttrs.includes(element[attr])

      if (!isDuplicate) {
        uniqueAttrs.push(element[attr])

        return true
      }

      return false
    })

    return unique

  }

  static groupBy<T>(collection: T[], key: keyof T) {
    const groupedResult = collection.reduce((previous, current) => {
        if (!previous[current[key]]) {
            previous[current[key]] = [] as T[];
        }
        previous[current[key]].push(current);
        return previous;
    }, {} as any);
    return groupedResult;
  }

  static compose = function (f: any, g: any) {
    return function (x: any) {
        return f(g(x));
    }
  }

  static fold<T>(reducer: any, init: number, array: T[]) : number {
    return (array.length == 0 ? init : this.fold(reducer, reducer(init, array.shift()), array));
}


}

