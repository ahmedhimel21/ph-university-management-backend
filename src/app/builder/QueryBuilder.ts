import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }
  //method search
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      } as FilterQuery<T>)
    }
    return this
  }
  //method filter
  filter() {
    const queryObj = { ...this.query }
    const excludesField = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludesField.forEach(ele => delete queryObj[ele])
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
    return this
  }
  //method sorting
  sort() {
    const sort = this?.query?.sort || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)
    return this
  }
  //method paginate
  paginate() {
    const limit = Number(this?.query?.limit) || 10
    const page = Number(this?.query?.page) || 1
    const skip = (page - 1) * limit
    this.modelQuery = this.modelQuery.skip(skip).limit(limit)
    return this
  }
  //   method field limiting
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'
    this.modelQuery = this.modelQuery.select(fields)
    return this
  }
}

export default QueryBuilder
