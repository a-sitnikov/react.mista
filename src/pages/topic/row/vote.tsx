import { memo } from "react";

type IProps = {
  colors: string[];
  n: number;
  text: string;
};

const Vote: React.FC<IProps> = memo(({ colors, n, text }) => {
  return (
    <div style={{ marginTop: "5px" }}>
      <b>
        <span style={{ color: colors[n - 1] }}>{`${n}. ${text}`}</span>
      </b>
    </div>
  );
});

export default Vote;
