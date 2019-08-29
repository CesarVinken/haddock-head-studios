import React, { Component } from "react"
import { RouteComponentProps, Link, Switch, Route } from "react-router-dom"

import { deleteWikiArticle } from "../lib/api/wikiApi"

import WikiArticleNew from "./wiki/WikiArticleNew"
import WikiArticleContent from "./wiki/WikiArticleContent"
import WikiArticleEdit from "./wiki/WikiArticleEdit"
import WikiArticleSideList from "./wiki/WikiArticleSideList"
import WikiArticleStore from "../store/WikiArticleStore"
import WikiArticle from "../models/WikiArticle"

type MyState = { showEdit: boolean; showDelete: boolean }

interface WikiProps extends RouteComponentProps<any>, React.Props<any> {}

export default class WikiContainer extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      showEdit: false,
      showDelete: false
    }

    this._toggleEdit = this._toggleEdit.bind(this)
    this._toggleDelete = this._toggleDelete.bind(this)

    this._deleteArticle = this._deleteArticle.bind(this)
  }

  render() {
    return (
      <div>
        <div className="nav-bar">
          <Link to="../" className="link-back">
            Back to main site
          </Link>
          <h1>BBB Wiki</h1>
          {window.location.href.split("/")[
            window.location.href.split("/").length - 1
          ] !== "new" && (
            <Link to="../wiki/new">
              <div>New article</div>
            </Link>
          )}
          {this.state.showEdit && (
            <Link
              to={`../wiki/${WikiArticleStore.currentWikiArticle.title}/edit`}
            >
              <div>Edit article</div>
            </Link>
          )}
          {this.state.showDelete && (
            <Link
              to={`../`}
              onClick={() => {
                this._deleteArticle()
              }}
            >
              <div>Delete article</div>
            </Link>
          )}
        </div>
        <div className="wiki-content-wrapper">
          <WikiArticleSideList></WikiArticleSideList>
          <Switch>
            <Route
              exact
              path="/wiki/new"
              render={props => (
                <WikiArticleNew
                  {...props}
                  toggleEdit={this._toggleEdit}
                  toggleDelete={this._toggleDelete}
                />
              )}
            />
            <Route
              exact
              path="/wiki/:articleTitle/"
              render={props => (
                <WikiArticleContent
                  {...props}
                  toggleEdit={this._toggleEdit}
                  toggleDelete={this._toggleDelete}
                />
              )}
            />
            <Route
              exact
              path="/wiki/:articleTitle/edit"
              render={props => {
                return (
                  <WikiArticleEdit
                    {...props}
                    toggleEdit={this._toggleEdit}
                    toggleDelete={this._toggleDelete}
                  />
                )
              }}
            />
            <Route
              exact
              path="/wiki/"
              render={() => {
                return <div>Welcome to the Bards Bees & Birds wiki</div>
              }}
            />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </div>
    )
  }

  _toggleEdit(value: boolean) {
    this.setState({ showEdit: value })
  }

  _toggleDelete(value: boolean) {
    this.setState({ showDelete: value })
  }

  _deleteArticle() {
    const article: WikiArticle = {
      articleId: WikiArticleStore.currentWikiArticle.article_id,
      title: WikiArticleStore.currentWikiArticle.title,
      content: WikiArticleStore.currentWikiArticle.content
    }

    deleteWikiArticle(article)
    WikiArticleStore.deleteWikiArticle(article)
  }
}
