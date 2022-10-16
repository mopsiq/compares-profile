interface SteamAchievementDTO {
  name: string;
  percent: number;
}

export interface SteamGlobalAchievementsDTO {
  achievementpercentages: SteamAchievementDTO[];
}
