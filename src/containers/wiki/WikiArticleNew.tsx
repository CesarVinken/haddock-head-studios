import React, { Component } from 'react'
import Editor from 'for-editor'

import { addWikiArticle } from '../../lib/api/wikiApi'
import WikiArticle from '../../models/WikiArticle'
import { RouteComponentProps } from 'react-router'
import WikiArticleStore from '../../store/WikiArticleStore'
import DynamoDbWikiArticle from '../../models/DynamoDbWikiArticle'

type MyState = { title: string; content: string }

interface WikiProps extends RouteComponentProps<any>, React.Props<any> {
  toggleEdit: Function
  toggleDelete: Function
}

export default class WikiArticleNew extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      title: '',
      content: ''
    }

    this._handleTitleChange = this._handleTitleChange.bind(this)
    this._handleContentChange = this._handleContentChange.bind(this)
    this._handleSaveArticle = this._handleSaveArticle.bind(this)
  }

  componentDidMount() {
    WikiArticleStore.currentWikiArticle = {
      article_id: '',
      title: '',
      content: ''
    }
    this.props.toggleEdit(false)
    this.props.toggleDelete(false)
  }

  render() {
    return (
      <div className="article-content-container">
        <div className="title-container">
          <h1>New Article</h1>
        </div>
        <div className="edit-title-container">
          <input
            placeholder={'Title'}
            className="edit-title-input"
            value={this.state.title}
            onChange={value => {
              this._handleTitleChange(value)
            }}
          />
        </div>
        <div className="editor-container">
          <Editor
            placeholder={'Article content..'}
            value={this.state.content}
            onChange={e => {
              this._handleContentChange(e)
            }}
          />
          <button className="save-button" onClick={this._handleSaveArticle}>
            Save
          </button>
        </div>
      </div>
    )
  }

  _handleTitleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      title: event.currentTarget.value
    })
  }

  _handleContentChange(content: string) {
    this.setState({
      content: content
    })
  }

  async _handleSaveArticle() {
    if (this.state.title === '' || this.state.title === 'new') {
      console.log('Cannot add article. Article should have a title')
      return
    }

    const alreadyExistingArticle:
      | DynamoDbWikiArticle
      | undefined = WikiArticleStore.getWikiArticle(this.state.title)

    if (typeof alreadyExistingArticle !== 'undefined') {
      console.log(
        'Cannot add article. There already is an article with this title'
      )
      return
    }

    const newWikiArticle: WikiArticle = {
      articleId: '',
      title: this.state.title,
      content: this.state.content
    }
    await addWikiArticle(newWikiArticle)
    console.log('start redirect...')
    WikiArticleStore.addWikiArticle(newWikiArticle)
    this.props.history.push(`/wiki/${newWikiArticle.title}`)
  }
}
