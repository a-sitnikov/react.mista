import { FC, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import URL from 'url-parse'

import LinkToPost from './link_to_post'
import LinkToUser from './link_to_user'
import YoutubeLink from './youtube_link'

import { childrenToText } from 'src/utils'
import { RootState } from 'src/data/store'

type IProps = {
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

const fixBrokenLink = (href: string, parentText: string): string => {
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

const isYoutube = (hostname: string): boolean => {
  if (hostname.search(/youtube/) !== -1
    || hostname.search(/youtu\.be/) !== -1)
    return true;
  else
    return false
}

const isMistaCatalog = (hostname: string): boolean => {
  if (hostname.search(/catalog\.mista/) !== -1)
    return true;
  else
    return false
}

const mapState = (state: RootState) => {

  const {
    showYoutubeVideoTitle,
    replaceCatalogMista,
    fixBrokenLinks
  } = state.options.items;

  return {
    showYoutubeVideoTitle,
    replaceCatalogMista,
    fixBrokenLinks
  }
}

const connector = connect(mapState);
const CustomLink: FC<ConnectedProps<typeof connector> & IProps> = (props): ReactElement => {

  const { href, children, parentText,
    showYoutubeVideoTitle, replaceCatalogMista, fixBrokenLinks } = props;

  try {
    var url = new URL(href, true);
  } catch (e) {
    console.error((e as Error).message, href);
    return <a href={href}>{href}</a>;
  }

  let newHref = href;
  if (newHref.startsWith('/')) {
    url.set('protocol', 'https')
    url.set('hostname', 'forum.mista.ru')
    newHref = url.href;
  }

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
    if (isYoutube(url.hostname)) 
      return <YoutubeLink href={href} />

  if (replaceCatalogMista === 'true')
    if (isMistaCatalog(url.hostname)) {
      url.set('hostname', 'infostart.ru')

      return (
        <a target={props.target}
          className={props.class}
          rel={props.rel}
          href={url.href} >{url.href} </a>
      )
    }

  if (fixBrokenLinks === 'true' && parentText) {
    newHref = fixBrokenLink(newHref, parentText);
  }

  return (
    <a target={props.target}
      className={props.class}
      rel={props.rel}
      href={newHref} >{children}</a>
  )
}

export default connector(CustomLink);