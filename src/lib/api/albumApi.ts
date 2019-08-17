import Axios from "axios"
import uuid from "uuid"

import config from "../../config"
import DynamoDbAlbum from "../../models/DynamoDbAlbum"

const addAlbum = async (albumData: any) => {
  console.log("Trying to post")
  const albumId: string = uuid.v1()

  try {
    await Axios({
      method: "post",
      url: `${
        config.proxy.PROXY_URL
      }https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/album`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: {
        albumId,
        albumName: ""
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const getAlbum = async (albumName: string) => {
  try {
    const sanatisedAlbumName = albumName.replace(/ /g, "%20")
    console.log(`Trying to get album "${sanatisedAlbumName}"`)
    const data = await Axios({
      method: "get",
      url: `${
        config.proxy.PROXY_URL
      }https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/album/${sanatisedAlbumName}`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })

    const albumData: DynamoDbAlbum = data.data[0]
    console.log("data", albumData)
    return albumData
  } catch (error) {
    console.log(error)
    return error
  }
}

const getAllAlbums = async () => {
  console.log("Trying to get all albums")
  try {
    const res = await Axios({
      method: "get",
      url: `${
        config.proxy.PROXY_URL
      }https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/album`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })

    const albums = res.data.Items
    console.log("retrieved albums", albums)
    return albums
  } catch (error) {
    console.log(error)
    return error
  }
}

export { addAlbum, getAlbum, getAllAlbums }
