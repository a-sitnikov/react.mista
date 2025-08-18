export enum QueryKeys {
  Sections = "sections",
  TopicsList = "topics-list",
  TopicMessages = "topic-messages",
  TopicMessageData = "topic-message-data",
  UpdateTopicMessages = "update-topic-messages",
}

export interface TOptions {
  enabled?: boolean;
  refetchInterval?: number;
}
