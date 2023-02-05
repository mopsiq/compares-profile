export const parseLink = (
  link: string,
): { url: string } | { steamid: string } => {
  link = link.replace(/\/$/g, "");
  const regExpAllDigit = /^\d+$/;
  const regExpProfileName = /[^\/]+$/;
  const profileName = link.match(regExpProfileName) as RegExpMatchArray;

  if (!regExpAllDigit.test(profileName[0])) {
    return {
      url: `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${
        import.meta.env.VITE_STEAM_API_KEY
      }&format=json&vanityurl=${profileName[0]}`,
    };
  } else {
    return {
      steamid: profileName[0],
    };
  }
};
