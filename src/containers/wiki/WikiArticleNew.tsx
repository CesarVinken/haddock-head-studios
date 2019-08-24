import React, { Component } from "react"
import Editor from "for-editor"

import { getAllWikiArticles, addWikiArticle } from "../../lib/api/wikiApi"
import WikiArticle from "../../models/WikiArticle"
import { RouteComponentProps } from "react-router"
import WikiArticleStore from "../../store/WikiArticleStore"
import DynamoDbWikiArticle from "../../models/DynamoDbWikiArticle"

type MyState = { title: string; content: string }

interface WikiProps extends RouteComponentProps<any>, React.Props<any> {}

export default class WikiArticleNew extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      title: "",
      content: ""
      // isLoading: true
    }

    this._handleTitleChange = this._handleTitleChange.bind(this)
    this._handleContentChange = this._handleContentChange.bind(this)
    this._handleSaveArticle = this._handleSaveArticle.bind(this)
  }

  render() {
    return (
      <div>
        New Article
        <input
          placeholder={"Title"}
          value={this.state.title}
          onChange={e => {
            this._handleTitleChange(e)
          }}
        />
        <Editor
          placeholder={"Article content.."}
          value={this.state.content}
          onChange={this._handleContentChange}
        />
        <button onClick={this._handleSaveArticle}>Save</button>
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
    console.log(this.state)
  }

  async _handleSaveArticle() {
    if (this.state.title === "" || this.state.title === "new") {
      console.log("Cannot add article. Article should have a title")
      return
    }

    const alreadyExistingArticle:
      | DynamoDbWikiArticle
      | undefined = WikiArticleStore.getWikiArticle(this.state.title)

    if (typeof alreadyExistingArticle !== "undefined") {
      console.log(
        "Cannot add article. There already is an article with this title"
      )
      return
    }

    const newWikiArticle: WikiArticle = {
      id: "",
      title: this.state.title,
      content: this.state.content
    }
    await addWikiArticle(newWikiArticle)
    //TODO probably need to take out spaces from title
    this.props.history.push(`/wiki/${newWikiArticle.title}`)
  }
}
