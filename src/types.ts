
export interface PageOffset {
  limit: number,
  offset: number
}

export interface PageSort {
  field: string 
  direction: "ASC" | "DESC"
}

export interface Cat {
  id: string
  name: string 
  breedGroup: string 
  weight: number 
}

export type GetCatByIdQueryParams = {
  id: string
}

export type ListCatQueryParams = {
  limit?: string
  offset?: string 
  direction?: string
  field?: string
}

export type SearchCatQueryParams = {
  name?: string
}

export type DeleteCatQueryParams = {
  id:  string
}
