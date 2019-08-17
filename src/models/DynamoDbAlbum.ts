import DynamoDbTrack from "./DynamoDbTrack"

type DynamoDbAlbum = {
  album_id: string
  album_name: string
  year: number
  description: string
  tracks: DynamoDbTrack[]
}

export default DynamoDbAlbum
