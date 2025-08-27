import { useEffect, useState } from "react";

import { PhotoProvider } from "react-photo-view";
import { fetchTopicInfo } from "src/api";
import { useAppSelector } from "src/store";
import { useTopicMessages } from "src/store/query-hooks";
import ProcessedText from "./processed_text";
import Vote from "./vote";
import VoteChart from "./vote_chart";

type IProps = {
  topicId: number;
  topicDate: number;
  n: number;
  html: string;
  vote: number;
  style?: {};
};

const MsgText: React.FC<IProps> = ({
  topicId,
  topicDate,
  n,
  html,
  vote,
  style,
}) => {
  const { data: info } = useTopicMessages(
    { topicId },
    { enabled: false, select: (data) => data?.info }
  );
  const voteColors = useAppSelector((state) => state.options.voteColors);

  let initialVoteText: string = null;
  if (vote && info.voting && topicId === info.id)
    initialVoteText = info.voting[vote - 1].text;

  const [voteText, setVoteText] = useState(initialVoteText);

  useEffect(() => {
    const getVoteText = async () => {
      try {
        const _info = await fetchTopicInfo(topicId);
        setVoteText(_info.voting[vote - 1].text);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (vote && !initialVoteText) {
      void getVoteText();
    }
  }, [vote, initialVoteText, topicId]);

  const showVoteChart = n === 0 && info?.isVoting && info?.voting;
  const showVoteText = vote !== 0 && voteText !== null;

  return (
    <div className="message" style={style}>
      {showVoteChart && (
        <VoteChart items={info.voting} topicId={topicId} colors={voteColors} />
      )}
      <div>
        <PhotoProvider>
          <ProcessedText
            html={html}
            topicId={topicId}
            topicDate={topicDate}
            messageNumber={n}
          />
        </PhotoProvider>
      </div>
      {showVoteText && <Vote text={voteText} n={vote} colors={voteColors} />}
    </div>
  );
};

export default MsgText;
