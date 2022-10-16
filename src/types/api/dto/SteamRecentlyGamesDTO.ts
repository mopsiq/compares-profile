interface GameInfo {
  appid: number;
  img_icon_url: string;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
}

export interface SteamRecentlyGamesDTO {
  response: {
    games: GameInfo[];
    total_count: number;
  };
}
