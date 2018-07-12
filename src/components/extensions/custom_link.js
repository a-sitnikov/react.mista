//@flow
import React, { Component } from 'react'
import URL from 'url-parse'

import LinkToPost from './link_to_post'
import YoutubeLink from './youtube_link'

import type { DefaultProps } from 'src/components'

import { childrenToText } from 'src/utils'

type CustomLinkProps = {
    href: string,
    parentText: string
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
                    if (arr[1] === ')' &&  href.search('\\(') === -1) {
                        return href;
                    }
                    href = href + arr[1];
                    return href;
                }
            } catch(e) {
                console.error(e);
            }
        return href;    
    }

    render() {

        const { href, children, parentText } = this.props;

        const url = new URL(href, true);
        if (url.hostname.search(/forum\.mista.ru/) !== -1 && 
            url.pathname === '/topic.php') {

            return (                
                <LinkToPost topicId={url.query.id} number={url.hash || "0"}>
                    {childrenToText(children)}
                </LinkToPost>           
            )
        }    

        if (url.hostname.search(/youtube/) !== -1
            || url.hostname.search(/youtu\.be/) !== -1) {
            return <YoutubeLink href={href} />
        }

        let newProps = Object.assign({}, this.props);
        delete newProps.parentText;
        let newHref = this.fixBrokenLink(href, parentText);
        
        return (
            <a {...newProps} href={newHref} >{children}</a>
        )
    }
}

export default CustomLink;