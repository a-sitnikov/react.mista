//@flow
import React, { Component } from 'react'
import queryString from 'query-string'

import LinkToPost from './link_to_post'
import YoutubeLink from './youtube_link'

import type { DefaultProps } from 'src/components'

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
            .replace(/\./g, '\.')
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

        if (href.search(/forum\.mista.ru/) !== -1 && 
            href.search(/users\.php/) === -1) {
            
            let arr = href.split('?');
            if (arr.length > 1) {
                
                let arr2 = arr[1].split('#');
                let hash;
                if (arr2.length > 1) 
                    hash = arr2[1];

                let params = queryString.parse(arr2[0]);
                return <LinkToPost topicId={params.id} number={hash || "0"}>{children}</LinkToPost>
            } else {
                return <a href={href}>{children}</a>
            }
        }    

        if (href.search(/youtube/) !== -1
            || href.search(/youtu\.be/) !== -1) {
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