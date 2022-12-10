export interface SteamGames {
  appid: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
  rtime_last_played: number;
}

export interface SteamGameListDto {
  response: {
    game_count: number;
    games: SteamGames[];
  };
}
