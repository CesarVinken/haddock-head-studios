import React, { Component } from 'react'
import { RouteComponentProps, Link, Switch, Route } from 'react-router-dom'

import WikiArticleNew from './wiki/WikiArticleNew'
import WikiArticleContent from './wiki/WikiArticleContent'
import WikiArticleEdit from './wiki/WikiArticleEdit'
import WikiArticleSideList from './wiki/WikiArticleSideList'
import WikiArticleStore from '../store/WikiArticleStore'
import DeleteWikiArticleModal from './wiki/DeleteWikiArticleModal'

type MyState = {
  showEditButton: boolean
  showDeleteButton: boolean
  deleteModalIsOpen: boolean
}

interface WikiProps extends RouteComponentProps<any>, React.Props<any> {}

export default class WikiContainer extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      showEditButton: false,
      showDeleteButton: false,
      deleteModalIsOpen: false
    }

    this._toggleEditButtonVisibility = this._toggleEditButtonVisibility.bind(
      this
    )
    this._toggleDeleteButtonVisibility = this._toggleDeleteButtonVisibility.bind(
      this
    )

    this._toggleDeleteModalVisibility = this._toggleDeleteModalVisibility.bind(
      this
    )
  }

  render() {
    return (
      <div>
        <div className="nav-bar">
          <Link to="../" className="nav-link">
            Back to main site
          </Link>
          <h1>BBB Wiki</h1>
          {window.location.href.split('/')[
            window.location.href.split('/').length - 1
          ] !== 'new' && (
            <Link to="../wiki/new">
              <div>New article</div>
            </Link>
          )}
          {this.state.showEditButton && (
            <Link
              to={`../wiki/${WikiArticleStore.currentWikiArticle.title}/edit`}
            >
              <div>Edit article</div>
            </Link>
          )}
          {this.state.showDeleteButton && (
            <button
              onClick={() => {
                this._toggleDeleteModalVisibility(true)
              }}
            >
              <div>Delete article</div>
            </button>
          )}
        </div>
        <div className="wiki-content-wrapper">
          <WikiArticleSideList></WikiArticleSideList>
          {this.state.deleteModalIsOpen && (
            <DeleteWikiArticleModal
              {...this.props}
              toggleDeleteModalVisibility={this._toggleDeleteModalVisibility}
            ></DeleteWikiArticleModal>
          )}
          <Switch>
            <Route
              exact
              path="/wiki/new"
              render={props => (
                <WikiArticleNew
                  {...props}
                  toggleEditButtonVisibility={this._toggleEditButtonVisibility}
                  toggleDeleteButtonVisibility={
                    this._toggleDeleteButtonVisibility
                  }
                />
              )}
            />
            <Route
              exact
              path="/wiki/:articleTitle/"
              render={props => (
                <WikiArticleContent
                  {...props}
                  toggleEditButtonVisibility={this._toggleEditButtonVisibility}
                  toggleDeleteButtonVisibility={
                    this._toggleDeleteButtonVisibility
                  }
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
                    toggleEditButtonVisibility={
                      this._toggleEditButtonVisibility
                    }
                    toggleDeleteButtonVisibility={
                      this._toggleDeleteButtonVisibility
                    }
                  />
                )
              }}
            />
            <Route
              exact
              path="/wiki/"
              render={() => {
                return (
                  <div className="article-content-container">
                    <div className="title-container">
                      <h1>Welcome to the Bardopedia!</h1>
                      <p>
                        This is a wiki about the game A Tale of Bards, Beards &
                        Birds, commonly referred to as Bards, Beards & Birds
                        (BBB). You can find information about the characters,
                        the story, locations, etc.
                      </p>
                      <h2>Main categories</h2>
                      <ol>
                        <li>The Story</li>
                        <li>Characters</li>
                        <li>The World</li>
                        <li>Items</li>
                        <li>Gameplay</li>
                        <li>GUI</li>
                        <li>Progress</li>
                      </ol>
                      <h2>What is Bards, Beards and Birds?</h2>
                      <p>
                        In Bards, Beards and Birds (BBB) the player becomes
                        Emmon, a young, miserably failed bard. During the game
                        Emmon will develop his magical musical skills in order
                        to undo an evil plot at the royal court. Emmon's path to
                        become the powerful Master of Sound takes place in an
                        engaging and living 3d fantasy world. In BBB the player
                        will face a combination of intriguing game mechanics as
                        the game will combine characteristics of the point and
                        click genre (such as interactive dialogues and
                        interactive scenery) and the rpg genre (exploration, a
                        hero levelling up in battles with monsters and the
                        collection of goods and money). All this will be
                        connected by a compelling story, ever present humour and
                        music.
                      </p>

                      <h3>Player experience</h3>
                      <p>
                        The game seeks to combine different genres, with a
                        general division between a peaceful, investigation part
                        in the inhabited world and more action based adventures
                        into the unknown. The alternation of spheres will give a
                        refreshing gaming experience, because the player can
                        always decide to go into the wilderness to level up in
                        fighting, or to go solve quests and spend time in the
                        towns. This touches upon an important part of the gaming
                        experience: the freedom for the player. He can follow
                        the main quest, but might want to, and sometimes has to,
                        engage in some of the many other activities in the
                        world. The non-linearity of the game will make sure the
                        player never has to get bored. Central in the world of
                        BBB is that the player can go far beyond the main story.
                        For instance, in his conversations with characters he
                        can talk about many silly topics that are irrelevent for
                        solving the main quest. In the field of action he can
                        pursue collecting and mastering many different
                        instruments to fight with, even if it would be possible
                        to stick to his standard bard's lute. All this will make
                        sure that if the player gets stuck somewhere, there is
                        always some other nice things to explore.
                      </p>
                      <p>
                        In the playful world of BBB, the player can wonder and
                        feel a sense of happiness, rather than feeling stuck in
                        a quest routine that has to be followed. Of course the
                        competitive element is there as well, as the player will
                        try to get stronger and advance in the story line. It is
                        for this reason that the player never has to feel lost.
                        When he chooses he can pick up and pursue the
                        competitive part of the game.
                      </p>
                    </div>
                  </div>
                )
              }}
            />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </div>
    )
  }

  _toggleEditButtonVisibility(value: boolean) {
    this.setState({ showEditButton: value })
  }

  _toggleDeleteButtonVisibility(value: boolean) {
    this.setState({ showDeleteButton: value })
  }

  _toggleDeleteModalVisibility(value: boolean) {
    console.log('toggle visibility to ', value)
    this.setState({ deleteModalIsOpen: value })
  }
}
