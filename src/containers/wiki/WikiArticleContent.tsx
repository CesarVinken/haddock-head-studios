import React, { Component } from "react"

import WikiArticleStore from "../../store/WikiArticleStore"
import WikiArticle from "../../models/WikiArticle"
import DynamoDbWikiArticle from "../../models/DynamoDbWikiArticle"
import { RouteComponentProps } from "react-router"

type MyState = { title: string; content: string }
interface WikiProps extends RouteComponentProps<any>, React.Props<any> {}

export default class WikiArticleContent extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      title: "",
      content: ""
      // isLoading: true
    }
  }

  async componentDidMount() {
    console.log(this.props)
    if (WikiArticleStore.wikiArticles.length === 0) {
      console.log("we did not yet put wiki articles in the store. Wait.")
      await new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
      })
    }
    const article:
      | DynamoDbWikiArticle
      | undefined = WikiArticleStore.wikiArticles.find(
      a => a.title === this.props.match.params.articleTitle
    )

    if (typeof article === "undefined") {
      return
    }
    this.setState({ title: article.title, content: article.content })
    // if (WikiArticleStore.wikiArticles.length === 0) {
    //   const articles: DynamoDbWikiArticle[] = await getAllWikiArticles()
    //   WikiArticleStore.setWikiArticles(articles)
    // }
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div>{this.state.content}</div>
      </div>
    )
  }
}
