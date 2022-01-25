export interface Link {
  code: string,
  to: string,
  from: string,
  clicks: number,
  tags: {
    tagName: string,
    _id: string,
  }[],
  description: string,
  _id: string,
  date: Date,
  message?: string,
}

export interface LinkEdit {
  description?: string,
  tags?: {
    tagName: string,
  }[],
  code: string,
  token?: string,
}

export interface LinkEditData {
  data: LinkEdit
}

export interface LinksData {
  data: Link[]
}

export interface LinkData {
  data?: Link
}

export interface LinkIdAction {
  type: string,
  id: string,
  token: string,
}

export interface LinkId {
  id?: string,
  token?: string,
}

export interface SearchedLink {
  to: string,
  from: string,
  tags: {
    tagName: string
  }[],
  description: string,
  _id: string,
}

export interface SearchedLinkData {
  data?: SearchedLink
}

export interface SearchedLinksData {
  data: SearchedLink[]
}

export interface SearchedLinks {
  from: string,
  _id: string,
}

export interface AddLink {
  from: string,
  tags?: {
    tagName: string,
  }[],
  description?: string,
  token?: string,
}

export interface AddLinkData {
  data: AddLink
}
