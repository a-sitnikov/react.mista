//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import URL from 'url-parse'

import LinkToPost from './link_to_post'
import LinkToUser from './link_to_user'
import YoutubeLink from './youtube_link'

import type { DefaultProps } from 'src/components'

import { childrenToText } from 'src/utils'

type CustomLinkProps = {
  href: string,
  parentText: string,
  target: string,
  class: string,
  rel: string,
  showTooltipOnPostLink: string,
  showYoutubeVideoTitle: string,
  replaceCatalogMista: string,
  fixBrokenLinks: string,
}

type Props = CustomLinkProps & DefaultProps;

class CustomLink extends Component<Props> {

  fixBrokenLink(href: string, parentText: string): string {
    let escapedHref = href
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\./g, '\\.')
      .replace(/\./g, '.')
      .replace(/\*/g, '\\*')
      .replace(/\+/g, '\\+')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/\?/g, '\\?')
      .replace(/\//g, '\\/');

    try {
      let regExp = new RegExp(escapedHref + '<\\/a>(\\)|[а-яёА-ЯЁ0-9#\\-\\+\\_\\%\\?=]*)');
      let arr = parentText.match(regExp);
      if (arr && arr.length > 1) {
        if (arr[1] === ')' && href.search('\\(') === -1) {
          return href;
        }
        href = href + arr[1];
        return href;
      }
    } catch (e) {
      console.error(e);
    }
    return href;
  }

  render() {

    const { href, children, parentText,
      showTooltipOnPostLink, showYoutubeVideoTitle, replaceCatalogMista, fixBrokenLinks } = this.props;

    try {
      var url = new URL(href, true);
    } catch (error) {
      console.error(error.message, href);
      return <a href={href}>{href}</a>;
    }


    let newHref = href;
    if (newHref.startsWith('/')) {
      url.set('protocol', 'https')
      url.set('hostname', 'forum.mista.ru')
      newHref = url.href;
    }

    if (showTooltipOnPostLink === 'true') {
      if (url.hostname.search(/forum\.mista.ru/) !== -1) {

        if (url.pathname === '/topic.php') {
          return (
            <LinkToPost topicId={url.query.id} number={url.hash.replace('#', '') || "0"}>
              {childrenToText(children)}
            </LinkToPost>
          )
        } else if (url.pathname === '/users.php') {
          return (
            <LinkToUser href={url.href} >
              {children}
            </LinkToUser>
          )
        }
      }

      if (url.hostname === 'a-sitnikov.github.io' &&
        url.pathname === '/react.mista/') {

        if (Object.keys(url.query).length === 0) {

          url = new URL(href.replace(/#\//, ''), true);
          if (url.pathname === '/react.mista/topic.php')
            return (
              <LinkToPost topicId={url.query.id} number={url.hash.replace('#', '') || "0"}>
                {childrenToText(children)}
              </LinkToPost>
            )
        }
      }
    }

    if (showYoutubeVideoTitle === 'true')
      if (url.hostname.search(/youtube/) !== -1
        || url.hostname.search(/youtu\.be/) !== -1) {
        return <YoutubeLink href={href} />
      }

    if (replaceCatalogMista === 'true')
      if (url.hostname.search(/catalog\.mista/) !== -1) {
        url.set('hostname', 'infostart.ru')

        return (
          <a target={this.props.target}
            className={this.props.class}
            rel={this.props.rel}
            href={url.href} >{url.href} </a>
        )
      }

    if (fixBrokenLinks === 'true' && parentText) {
      newHref = this.fixBrokenLink(newHref, parentText);
    }

    return (
      <a target={this.props.target}
        className={this.props.class}
        rel={this.props.rel}
        href={newHref} >{children}</a>
    )
  }
}

const mapStateToProps = (state) => {

  const {
    showTooltipOnPostLink,
    showYoutubeVideoTitle,
    replaceCatalogMista,
    fixBrokenLinks
  } = state.options.items;

  return {
    showTooltipOnPostLink,
    showYoutubeVideoTitle,
    replaceCatalogMista,
    fixBrokenLinks
  }
}

export default (connect(mapStateToProps)(CustomLink): any );