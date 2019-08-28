import { observable, action } from "mobx"
import DynamoDbWikiArticle from "../models/DynamoDbWikiArticle"
import WikiArticle from "../models/WikiArticle"

class WikiArticleStore {
  @observable
  wikiArticles: DynamoDbWikiArticle[] = []

  @observable
  currentWikiArticle: DynamoDbWikiArticle = {
    article_id: "",
    title: "",
    content: ""
  }

  @action
  setCurrentWikiArticle(title: string) {
    const currentArticle = this.getWikiArticle(title)

    if (typeof currentArticle === "undefined") {
      console.log("Could not find article with title ", title)
      return
    }

    this.currentWikiArticle = currentArticle
  }

  @action
  setWikiArticles(wikiArticles: DynamoDbWikiArticle[]) {
    this.wikiArticles = wikiArticles
  }

  @action
  getWikiArticle(title: string): DynamoDbWikiArticle | undefined {
    return this.wikiArticles.find(article => article.title === title)
  }

  @action
  getAllWikiArticleTitles() {
    return this.wikiArticles.map(article => article.title)
  }

  @action
  addWikiArticle(wikiArticle: WikiArticle) {
    const recastWikiArticle: DynamoDbWikiArticle = {
      article_id: wikiArticle.articleId,
      title: wikiArticle.title,
      content: wikiArticle.content
    }
    this.wikiArticles.push(recastWikiArticle)
  }

  @action
  updateWikiArticle(updatedWikiArticle: WikiArticle) {
    const index: number = this.wikiArticles.findIndex(
      (article: DynamoDbWikiArticle, i: number) => {
        if (article.article_id === updatedWikiArticle.articleId) {
          return i
        }
      }
    )
    this.wikiArticles[index] = {
      article_id: updatedWikiArticle.articleId,
      title: updatedWikiArticle.title,
      content: updatedWikiArticle.content
    }
  }

  @action
  deleteWikiArticle() {}
}

export default new WikiArticleStore()
