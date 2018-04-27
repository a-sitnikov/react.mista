//@flow
import React, { Component } from 'react'
import queryString from 'query-string'

import LinkToPost from './link_to_post'
import YoutubeLink from './youtube_link'

import type { DefaultProps } from 'src/components'

type CustomLinkProps = {
    href: string,
}

type Props = CustomLinkProps & DefaultProps;

class CustomLink extends Component<Props> {

    render() {

        const { href, children } = this.props;

        if (href.search(/forum\.mista.ru/) !== -1) {
            let arr = href.split('?');
            if (arr.length > 0) {
                let params = queryString.parse(arr[1]);
                return <LinkToPost topicId={params.id} number={params.hash || "0"}>{children}</LinkToPost>
            } else {
                return <a href={href}>{children}</a>
            }
        }    

        if (href.search(/youtube/) !== -1
            || href.search(/youtu\.be/) !== -1) {
            return <YoutubeLink href={href} />
        }

        return (
            <a href={href} {...this.props}>{children}</a>
        )
    }
}

export default CustomLink;