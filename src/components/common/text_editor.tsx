import { FC, ReactElement, useRef, RefObject, useCallback } from "react";
import { FormControl, Button, ButtonGroup, Form } from "react-bootstrap";

import "./text_editor.css";

type IProps = {
  placeholder: string;
  showVoting?: boolean;
  isVoting?: boolean;
  text: string;
  isFetching: boolean;
  formRef?: RefObject<HTMLFormElement>;
  onChange?: (text: string) => void;
  onShowVotingChange?: (show: boolean) => void;
};

const TextEditor: FC<IProps> = ({
  placeholder,
  showVoting,
  isVoting,
  isFetching,
  text,
  formRef,
  onChange,
  onShowVotingChange,
}): ReactElement => {
  const textAreaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const onButtonCode1c = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const openTag = "[1C]\n";
    const closeTag = "\n[/1C]";

    const textAreaNode = textAreaRef.current;

    const start = textAreaNode.selectionStart;
    const end = textAreaNode.selectionEnd;

    const oldText = textAreaNode.value;
    const len = oldText.length;
    const selectedText = oldText.substring(start, end);
    const replacement = openTag + selectedText + closeTag;
    let newText =
      oldText.substring(0, start) + replacement + oldText.substring(end, len);

    if (onChange) onChange(newText);
  };

  const handleShowVotingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onShowVotingChange) onShowVotingChange(e.currentTarget.checked);
    },
    [onShowVotingChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) onChange(e.currentTarget.value);
    },
    [onChange]
  );

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!formRef) return;
    if (!formRef.current) return;

    if (e.key === "Enter" && e.ctrlKey) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <div>
      <FormControl
        as="textarea"
        aria-label="Сообщение"
        placeholder={placeholder}
        cols={70}
        rows={3}
        value={text}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        ref={textAreaRef}
        className="text-editor input"
        data-lpignore={true}
      />
      <div className="flex-row">
        <ButtonGroup>
          <Button
            size="sm"
            variant="light"
            onClick={onButtonCode1c}
            style={{ marginRight: "5px" }}
            className="button"
          >
            Код 1С
          </Button>
          <Button
            size="sm"
            variant="light"
            disabled={isFetching}
            type="submit"
            className="button"
          >
            {isFetching ? "Отправляется" : "Отправить"}
          </Button>
        </ButtonGroup>
        {showVoting && (
          <Form.Check
            id="show_voting"
            type="checkbox"
            checked={isVoting}
            onChange={handleShowVotingChange}
            label="Голосование"
            style={{ margin: "auto 0px auto auto" }}
          />
        )}
      </div>
    </div>
  );
};

export default TextEditor;
