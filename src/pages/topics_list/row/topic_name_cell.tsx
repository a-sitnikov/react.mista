import { FC, ReactElement } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Pages from './pages';
import { useAppSelector } from 'src/store';

type IProps = {
  id: number,
  count: number,
  author: string,
  pinned: boolean,
  forum: string,
  sectionCode: string,
  section: string,
  text: string,
  isVoting: boolean
  closed: boolean,
  down: boolean,

}

const addPrefix = (text: string, forum: string, sectionCode: string): string => {
  
  if (forum === 'life' && !text.startsWith('OFF'))
    return 'OFF: ' + text;

  else if (sectionCode === 'job' && !text.startsWith('JOB'))
    return 'JOB: ' + text;

  else if (sectionCode === 'v7' && !text.startsWith('v7'))
    return  'v7: ' + text;

  return text;  
}

const TopicNameCell: FC<IProps> = (data): ReactElement => {

  const loggedUserName = useAppSelector(state => state.login.userName);

  let href = `/topic.php?id=${data.id}`;
  let classes = classNames('agb', 'mr5', {
    'bold': data.count >= 100,
    'mytopics': data.author === loggedUserName,
    'pinned': data.pinned
  });

  let sectionHref = `/index.php?section=${data.sectionCode}`;
  let section: ReactElement;
  if (data.section) {
    section = (
      <span className="topic-section">
        <span className="agh" style={{ margin: "0px 5px" }}>/</span>
        <Link key="1" rel="nofollow" className="agh" to={sectionHref} >{data.section}</Link>
      </span>
    )
  }

  let text = addPrefix(data.text, data.forum, data.sectionCode);

  return (
    <div className="cell-title">
      {data.pinned && <i className="fa fa-thumb-tack agh" aria-hidden="true" style={{marginRight: "5px"}}></i>}
      <Link to={href} className={classes} dangerouslySetInnerHTML={{ __html: text }} style={{ overflowWrap: "anywhere" }}></Link>
      {data.isVoting && <span className="agh separator">[±]</span>}
      <Pages count={data.count} topicId={data.id} />
      {data.closed && <span className="agh">Ø</span>}
      {data.down && <span className="agh">↓</span>}
      {section}
    </div>
  )

}

export default TopicNameCell;