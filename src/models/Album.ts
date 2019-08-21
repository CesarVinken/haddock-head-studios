import Track from "./Track"

type Album = {
  albumId: string
  albumName: string
  tileImage?: string
  year: number
  description: string
  tracks: Track[]
  genre?: string[]
}

export default Album
