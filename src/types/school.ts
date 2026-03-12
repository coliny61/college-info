/** Lightweight school interfaces for passing between server/client components */

export interface SchoolSummary {
  id: string
  slug: string
  name: string
  shortName: string
  mascot: string
  conference: string
  city: string
  state: string
  colorPrimary: string
  colorSecondary: string
}

export interface SchoolWithColors extends SchoolSummary {
  colorAccent: string
}
