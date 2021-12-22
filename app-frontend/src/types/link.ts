export interface Link {
  code: string,
  to: string,
  from: string,
  clicks: number,
  tags: {
    tagName: string,
  }[],
  description: string,
  _id: string,
  date: Date,
}

export interface LinkEdit {
  description?: string,
  tags?: {
    tagName: string,
  }[]
}

export interface LinkEditData {
  data: LinkEdit
}

export interface LinksData {
  data: Link[]
}

export interface LinkData {
  data: Link
}

export interface LinkIdAction {
  type: string,
  id: string
}

export interface SearchedLink {
  to: string,
  from: string,
  tags: {
    tagName: string
  }[],
  description: string,
}

export interface SearchedLinkData {
  data: SearchedLink
}

export interface SearchedLinksData {
  data: SearchedLink[]
}

export interface SearchedLinks {
  from: string,
  _id: string,
}

export interface AddLink {
  to: string,
  tags?: {
    tagName: string,
  }[],
  description?: string,
}

export interface AddLinkData {
  data: AddLink
}
