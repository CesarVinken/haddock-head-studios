import Axios from 'axios'
import uuid from 'uuid'

import config from '../../config'
import WikiArticle from '../../models/WikiArticle'
import DynamoDbWikiArticle from '../../models/DynamoDbWikiArticle'

const addWikiArticle = async (wikiArticleData: WikiArticle) => {
  console.log('Trying to post')

  try {
    const wikiArticleId: string = uuid.v4()
    console.log('Wiki article:', wikiArticleData)
    await Axios({
      method: 'post',
      url: `${config.proxy.PROXY_URL}${config.apiGateway.URL}/wiki`,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      data: {
        articleId: wikiArticleId,
        title: wikiArticleData.title,
        content: wikiArticleData.content
      }
    })
    console.log('posted wiki article')
    return
  } catch (error) {
    console.log(error)
  }
}

const addWikiArticles = async (wikiArticles: WikiArticle[]) => {
  await wikiArticles.forEach(async wikiArticle => {
    await addWikiArticle(wikiArticle)
  })
  console.log('Added all wiki articles')
}

const updateWikiArticle = async (updatedWikiArticle: WikiArticle) => {
  console.log(`Trying to update article "${updatedWikiArticle.title}"`)
  const body: {} = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    articleId: updatedWikiArticle.articleId,
    title: updatedWikiArticle.title,
    content: updatedWikiArticle.content
  }
  await Axios.patch(
    `${config.proxy.PROXY_URL}${config.apiGateway.URL}/wiki`,
    body
  )
}

const deleteWikiArticle = async (wikiArticle: WikiArticle) => {
  console.log(`Trying to delete article "${wikiArticle.title}"`)
  console.log(wikiArticle)

  await Axios({
    method: 'post',
    url: `${config.proxy.PROXY_URL}${config.apiGateway.URL}/wiki`,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: {
      articleId: wikiArticle.articleId
    }
  })
}

const getWikiArticle = async (title: string) => {
  try {
    const sanatisedTitle = title.replace(/ /g, '%20')
    console.log(`Trying to get article "${sanatisedTitle}"`)
    const data = await Axios({
      method: 'get',
      url: `${config.proxy.PROXY_URL}${config.apiGateway.URL}/wiki/${sanatisedTitle}`,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    const wikiArticleData: DynamoDbWikiArticle = data.data[0]
    console.log('data', wikiArticleData)
    return wikiArticleData
  } catch (error) {
    console.log(error)
    return error
  }
}

const getAllWikiArticles = async () => {
  console.log('Trying to get all wiki articles')
  try {
    const res = await Axios({
      method: 'get',
      url: `${config.proxy.PROXY_URL}${config.apiGateway.URL}/wiki`,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    const wikiArticles = res.data.Items
    console.log('retrieved wiki articles', wikiArticles.length)
    return wikiArticles
  } catch (error) {
    console.log(error)
    return error
  }
}

export {
  addWikiArticle,
  addWikiArticles,
  getWikiArticle,
  getAllWikiArticles,
  updateWikiArticle,
  deleteWikiArticle
}
