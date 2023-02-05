import { Component, createMemo, createSignal } from "solid-js";
import { Button } from "@hope-ui/solid";
import {
  S_Compare,
  S_Compare_Form,
  S_Compare_Block,
  S_Compare_Button,
  S_Compare_Main,
  S_Compare_InputGroup,
} from "@app/components/styled/Compare";
import { Profiles } from "@app/components/Profile/Profiles";
import { store } from "@app/data/store/store";
import { validateField } from "@app/utils/validateField";
import { SingleField } from "@app/components/common/SingleField/SingleField";
import { parseLink } from "@app/utils/parseLink";
import {
  requestProfileIds,
  requestProfileData,
} from "@app/utils/requestProfileData";
import { produce } from "solid-js/store";

export const Compare: Component = () => {
  const [firstLocalLink, setFirstLocalLink] = createSignal<string>("");
  const [secondLocalLink, setSecondLocalLink] = createSignal<string>("");

  const isCompareAvailable = createMemo(() => {
    if (!firstLocalLink().length || !secondLocalLink().length) {
      return false;
    }
    return [firstLocalLink(), secondLocalLink()].every((item) =>
      validateField(item),
    );
  }, [firstLocalLink(), secondLocalLink()]);

  const handleRequest = async (profiles: string[]) => {
    const links = profiles.map((item) => parseLink(item));

    return requestProfileIds(links)
      .then((profiles) => {
        return profiles.map((item) => item.steamid);
      })
      .then((profilesSteamIds) =>
        requestProfileData(profilesSteamIds).then((profiles) => {
          const [firstProfile, secondProfile] = profiles;
          store.setState(
            produce((state) => {
              state.firstProfile.profileData = firstProfile;
              state.secondProfile.profileData = secondProfile;
            }),
          );
        }),
      );
  };

  return (
    <>
      <S_Compare>
        <S_Compare_Block>
          <S_Compare_Form>
            <S_Compare_InputGroup>
              <SingleField
                onChange={(value) => {
                  setFirstLocalLink(value);
                }}
                innerValue={firstLocalLink()}
                placeholder="Steam ID / URL / name profile #1"
                validation={validateField}
              />
            </S_Compare_InputGroup>
            <S_Compare_InputGroup>
              <SingleField
                onChange={(value) => {
                  setSecondLocalLink(value);
                }}
                innerValue={secondLocalLink()}
                placeholder="Steam ID / URL / name profile #2"
                validation={validateField}
              />
            </S_Compare_InputGroup>
          </S_Compare_Form>
        </S_Compare_Block>

        <S_Compare_Button>
          <Button
            onClick={() => {
              handleRequest([firstLocalLink(), secondLocalLink()]);
            }}
            disabled={!isCompareAvailable()}
          >
            Compare
          </Button>
        </S_Compare_Button>

        <S_Compare_Block>
          <S_Compare_Main>
            <Profiles />
          </S_Compare_Main>
        </S_Compare_Block>
      </S_Compare>
    </>
  );
};
