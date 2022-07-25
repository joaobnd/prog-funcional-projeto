export class Util {

  static orderBy(collection: any[], attr: string): any[] {

    return collection.sort(
      (a, b) => a[attr].localeCompare(b[attr])
    )
  }
}
