import { domain, domainApi, urlTopicInfo, urlTopicMessages } from "src/api";
import { useTopicMessages } from "src/store/query-hooks";

type IProps = {
  topicId: number;
};

const TopicInfo: React.FC<IProps> = ({ topicId }) => {
  const { data: title } = useTopicMessages(
    { topicId },
    { select: (data) => data?.info.title }
  );

  let yandexUrl =
    "https://www.yandex.ru/search/?text=" + encodeURIComponent(title);

  return (
    <div className="topic-row">
      <div className="cell-userinfo">
        <div className="topic-tools">
          <a
            title="API.info"
            href={`${domainApi}/${urlTopicInfo}?id=${topicId}`}
            className="agh"
            style={{ display: "block", lineHeight: "1em" }}
          >
            i
          </a>
          <a
            title="API.messages"
            href={`${domainApi}/${urlTopicMessages}?id=${topicId}&from=0&to=20`}
            className="agh"
            style={{ display: "block", lineHeight: "1em" }}
          >
            m
          </a>
          {/*<a href="add_voting.php?topic_id=815217" title="Добавить голосование">vote</a> &nbsp;&nbsp;*/}
        </div>
      </div>
      <div className="cell-message">
        <div className="flex-row">
          <div style={{ flex: 1, textAlign: "center" }}>
            <a href={`${domain}/topic/${topicId}`}>
              <h1
                className="topic-title"
                dangerouslySetInnerHTML={{ __html: title }}
              ></h1>
            </a>
            <div className="moder-action"></div>
          </div>
          <div style={{ flex: "0 0 20px", position: "relative" }}>
            <div className="div-va-middle">
              <a
                rel="noopener noreferrer"
                href={yandexUrl}
                title="Искать в Яндексе"
                target="_blank"
                className="yandex"
              >
                Я
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicInfo;
