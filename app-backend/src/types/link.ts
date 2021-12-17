export interface LinkInterface {
  code: string,
  to: string,
  from: string,
  tags?: {
    tagName: string,
  }[],
  description?: string,
  clicks?: number,
  owner: string,
}

export interface SearchedLinkInterface {
  to: string,
  from: string,
  tags?: {
    tagName: string,
  }[],
  description?: string,
}
