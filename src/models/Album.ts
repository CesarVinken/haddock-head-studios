import Track from "./Track"

type Album = {
  albumId: string
  albumName: string
  albumCover?: string
  year: number
  description: string
  tracks: Track[]
}

export default Album
