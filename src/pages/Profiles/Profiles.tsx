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
import { SteamService } from "@app/api/Steam/SteamService";

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
      .then(() => {
        const profilesSteamIds = [
          firstProfile.ids.steam_id64,
          secondProfile.ids.steam_id64,
        ];
        return profilesSteamIds;
      })
      .then((profilesSteamIds) =>
        requestProfileData(profilesSteamIds).then((data) => {
          store.setState((state) => ({
            firstProfile: {
              ...state.firstProfile,
              profileData: { ...data[0].response.players[0] },
            },
            secondProfile: {
              ...state.secondProfile,
              profileData: { ...data[1].response.players[1] },
            },
          }));
        }),
      );
  };

  const requestProfileData = async (profilesSteamIds: string[]) => {
    const [firstProfile, secondProfile] = profilesSteamIds;
    const service = new SteamService();

    return Promise.all([
      service.profileInfo(firstProfile),
      service.profileInfo(secondProfile),
    ]).then((data) => {
      return data;
    });
  };

  const request = async (
    link: string,
    type: string,
  ): Promise<ItemConverter> => {
    return fetch(link)
      .then((value) => value.json())
      .then((data) => {
        return { ...data, type };
      });
  };

  const requestProfileIds = async (profiles: string[]): Promise<void> => {
    const [firstProfile, secondProfile] = profiles;

    return Promise.all([
      request(firstProfile, "firstProfile"),
      request(secondProfile, "secondProfile"),
    ]).then((data) => {
      data.forEach((item: ItemConverter) => {
        store.setState((state) => ({
          [item?.type]: {
            ...state[item?.type],
            ids: {
              steam_id: item?.data?.steam_id,
              steam_id3: item?.data?.steam_id3,
              steam_id64: item?.data?.steam_id64,
              steam_url: item?.data?.steam_url,
            },
          },
        }));
      });
    });
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
            <Card />
          </S_Screen>
          <S_Screen>
            <Card />
          </S_Screen>
        </S_Profiles_Block>
      </S_Profiles>
    </>
  );
};
