export const parseLink = (link: string) => {
  link = link.replace(/\/$/g, "");
  const regExpAllDigit = /^\d+$/;
  const regExpProfileName = /[^\/]+$/;
  const isModifiedProfile = !regExpAllDigit.test(link);
  const modifiedProfile = isModifiedProfile ? "id" : "profiles";
  const profileName = link.match(regExpProfileName) as RegExpMatchArray;

  return `https://converter.api.dedns.org/https://steamcommunity.com/${modifiedProfile}/${
    profileName[0]
  }/?api-key=${import.meta.env.VITE_TEMPORARY_REQUEST_API_KEY}`;
};
