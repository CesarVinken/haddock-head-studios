import DynamoDbTrack from "./DynamoDbTrack"

type DynamoDbAlbum = {
  album_id: string
  album_name: string
  tile_image?: string
  year: number
  description: string
  tracks: DynamoDbTrack[]
  genre?: string[]
}

export default DynamoDbAlbum
