import { Component } from "react"

export interface MediaTileProps {
  title: string
  image: string
  year: string
}

export interface MediaTileState {
  title: string
  image: string
  year: string
}

export abstract class MediaTile<
  P extends MediaTileProps,
  S extends MediaTileState
> extends Component<P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
      image: props.image,
      title: props.title,
      year: props.year
    } as Readonly<S>
  }
}
