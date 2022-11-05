export const parseLink = (link: string): string => {
  link = link.replace(/\/$/g, "");
  const regExpAllDigit = /^\d+$/;
  const regExpProfileName = /[^\/]+$/;
  const profileName = link.match(regExpProfileName) as RegExpMatchArray;
  const modifiedProfile = !regExpAllDigit.test(profileName[0])
    ? "id"
    : "profiles";

  return `https://converter.api.dedns.org/https://steamcommunity.com/${modifiedProfile}/${
    profileName[0]
  }/?api-key=${import.meta.env.VITE_TEMPORARY_REQUEST_API_KEY}`;
};
