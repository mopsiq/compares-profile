import { Component, createMemo, createSignal } from "solid-js";
import { InputLeftAddon, Button } from "@hope-ui/solid";
import {
  S_Profiles,
  S_Screen,
  S_Profiles_Form,
  S_Profiles_Block,
  S_Profiles_Button,
  S_Profiles_InputGroup,
} from "@app/components/styled/Profiles";
import { Card } from "@app/components/Card/Card";
import { store } from "@app/data/store/store";
import { validateField } from "@app/utils/validateField";
import { SingleField } from "@app/components/common/SingleField/SingleField";
import { parseLink } from "@app/utils/parseLink";
import { ItemConverter } from "@app/types/api/ItemConverter";
import {
  requestProfileIds,
  requestProfileData,
} from "@app/utils/requestProfileData";
import { produce } from "solid-js/store";

export const Profiles: Component = () => {
  const { firstProfile, secondProfile } = store();
  const [firstLocalLink, setFirstLocalLink] = createSignal<string>("");
  const [secondLocalLink, setSecondLocalLink] = createSignal<string>("");

  const isCompareAvailable = createMemo(() => {
    if (!firstLocalLink().length || !secondLocalLink().length) {
      return false;
    }
    return [firstLocalLink(), secondLocalLink()].some((item) =>
      validateField(item),
    );
  }, [firstLocalLink(), secondLocalLink()]);

  const handleRequest = async (profiles: string[]) => {
    const links = profiles.map((item) => parseLink(item));

    return requestProfileIds(links)
      .then((data) => {
        data.forEach((item: ItemConverter) => {
          store.setState(
            produce((state) => {
              state[item.type].ids = {
                steam_id: item?.data?.steam_id,
                steam_id3: item?.data?.steam_id3,
                steam_id64: item?.data?.steam_id64,
                steam_url: item?.data?.steam_url,
              };
            }),
          );
        });
      })
      .then(() => {
        return [firstProfile.ids.steam_id64, secondProfile.ids.steam_id64];
      })
      .then((profilesSteamIds) =>
        requestProfileData(profilesSteamIds).then((profiles) => {
          const [firstProfile, secondProfile] = profiles;

          store.setState(
            produce((state) => {
              state.firstProfile.profileData.mainInfo = firstProfile.info;
              state.firstProfile.profileData.gamesList = firstProfile.gameList;
              state.secondProfile.profileData.mainInfo = secondProfile.info;
              state.secondProfile.profileData.gamesList =
                secondProfile.gameList;
            }),
          );
        }),
      );
  };

  return (
    <>
      <S_Profiles>
        <S_Profiles_Block>
          <S_Profiles_Form>
            <S_Profiles_InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <SingleField
                onChange={(value) => {
                  setFirstLocalLink(value);
                }}
                innerValue={firstLocalLink()}
                placeholder="Your steam id"
                validation={validateField}
              />
            </S_Profiles_InputGroup>
            <S_Profiles_InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <SingleField
                onChange={(value) => {
                  setSecondLocalLink(value);
                }}
                innerValue={secondLocalLink()}
                placeholder="Second steam id"
                validation={validateField}
              />
            </S_Profiles_InputGroup>
          </S_Profiles_Form>
        </S_Profiles_Block>

        <S_Profiles_Button>
          <Button
            onClick={() => {
              handleRequest([firstLocalLink(), secondLocalLink()]);
            }}
            disabled={!isCompareAvailable()}
          >
            Compare
          </Button>
        </S_Profiles_Button>

        <S_Profiles_Block>
          <S_Screen>
            <Card profileType="firstProfile" />
          </S_Screen>
          <S_Screen>
            <Card profileType="secondProfile" />
          </S_Screen>
        </S_Profiles_Block>
      </S_Profiles>
    </>
  );
};
