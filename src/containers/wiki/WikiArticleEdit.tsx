import React, { Component } from 'react'
import Editor from 'for-editor'
import { RouteComponentProps } from 'react-router-dom'

import WikiArticleStore from '../../store/WikiArticleStore'
import { updateWikiArticle } from '../../lib/api/wikiApi'
import DynamoDbWikiArticle from '../../models/DynamoDbWikiArticle'
import WikiArticle from '../../models/WikiArticle'
import DeleteWikiArticleModal from './DeleteWikiArticleModal'

type MyState = { articleId: string; title: string; content: string }
interface WikiProps extends RouteComponentProps<any>, React.Props<any> {
  toggleEditButtonVisibility: Function
  toggleDeleteButtonVisibility: Function
}

export default class WikiArticleEdit extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      articleId: '',
      title: '',
      content: ''
    }

    this._handleContentChange = this._handleContentChange.bind(this)
    this._handleSaveChangeToArticle = this._handleSaveChangeToArticle.bind(this)
  }

  componentDidMount() {
    const article:
      | DynamoDbWikiArticle
      | undefined = WikiArticleStore.getWikiArticle(
      this.props.match.params.articleTitle
    )
    this.props.toggleEditButtonVisibility(false)
    this.props.toggleDeleteButtonVisibility(true)

    if (typeof article === 'undefined') {
      console.log(
        'Could not find article',
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
      <div className="article-content-container">
        <div className="title-container">
          <h1>{this.state.title}</h1>
        </div>
        <div className="editor-container">
          <Editor
            // placeholder={'Article content..'}
            value={this.state.content}
            onChange={e => this._handleContentChange(e)}
          />
          <button
            className="save-button"
            onClick={this._handleSaveChangeToArticle}
          >
            Save
          </button>
        </div>
      </div>
    )
  }

  _handleContentChange(content: string) {
    this.setState({
      content: content
    })
  }

  async _handleSaveChangeToArticle() {
    const updatedWikiArticle: WikiArticle = {
      articleId: this.state.articleId,
      title: this.state.title,
      content: this.state.content
    }
    await updateWikiArticle(updatedWikiArticle)

    console.log('start redirect...')
    WikiArticleStore.updateWikiArticle(updatedWikiArticle)

    this.props.history.push(`/wiki/${updatedWikiArticle.title}`)
  }
}
