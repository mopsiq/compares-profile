export const getQuestStatus = (quests, status: "c" | "u") =>
  quests.filter((q) => (status === "c" ? q.completed : !q.completed));
