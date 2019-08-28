import React, { Component } from "react"
import Editor from "for-editor"
import { RouteComponentProps } from "react-router-dom"
import WikiArticleStore from "../../store/WikiArticleStore"
import DynamoDbWikiArticle from "../../models/DynamoDbWikiArticle"
import { updateWikiArticle } from "../../lib/api/wikiApi"
import WikiArticle from "../../models/WikiArticle"
type MyState = { articleId: string; title: string; content: string }
interface WikiProps extends RouteComponentProps<any>, React.Props<any> {
  toggleEdit: Function
}

export default class WikiArticleEdit extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      articleId: "",
      title: "",
      content: ""
    }

    this._handleTitleChange = this._handleTitleChange.bind(this)
    this._handleContentChange = this._handleContentChange.bind(this)
    this._handleSaveChangeToArticle = this._handleSaveChangeToArticle.bind(this)
  }

  componentDidMount() {
    WikiArticleStore.currentWikiArticle = {
      article_id: "",
      title: "",
      content: ""
    }

    const article:
      | DynamoDbWikiArticle
      | undefined = WikiArticleStore.getWikiArticle(
      this.props.match.params.articleTitle
    )

    if (typeof article === "undefined") {
      console.log(
        "Could not find article",
        this.props.match.params.articleTitle
      )
      return
    }

    this.setState({
      articleId: article.article_id,
      title: article.title,
      content: article.content
    })
  }

  render() {
    return (
      <div>
        New Article
        <div>{this.state.title}</div>
        <Editor
          placeholder={"Article content.."}
          value={this.state.content}
          onChange={this._handleContentChange}
        />
        <button onClick={this._handleSaveChangeToArticle}>Save</button>
      </div>
    )
  }

  _handleTitleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      title: event.currentTarget.value
    })
  }

  _handleContentChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      content: event.toString()
    })
  }

  async _handleSaveChangeToArticle() {
    const updatedWikiArticle: WikiArticle = {
      articleId: this.state.articleId,
      title: this.state.title,
      content: this.state.content
    }
    await updateWikiArticle(updatedWikiArticle)

    console.log("start redirect...")
    WikiArticleStore.updateWikiArticle(updatedWikiArticle)

    this.props.history.push(`/wiki/${updatedWikiArticle.title}`)
  }
}
