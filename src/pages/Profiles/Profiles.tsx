import { Component, createMemo } from "solid-js";
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

export const Profiles: Component = () => {
  const state = store();
  const isCompareAvailable = createMemo(() => {
    return [state.firstProfile.link, state.secondProfile.link].some((item) =>
      validateField(item),
    );
  });

  return (
    <>
      <S_Profiles>
        <S_Profiles_Block>
          <S_Profiles_Form>
            <S_Profiles_InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <SingleField
                onChange={(value) =>
                  store.setState((state) => ({
                    firstProfile: { ...state.firstProfile, link: value },
                  }))
                }
                innerValue={state.firstProfile.link}
                placeholder="Your steam id"
                validation={validateField}
              />
            </S_Profiles_InputGroup>
            <S_Profiles_InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <SingleField
                onChange={(value) =>
                  store.setState((state) => ({
                    secondProfile: {
                      ...state.secondProfile,
                      link: value,
                    },
                  }))
                }
                innerValue={state.secondProfile.link}
                placeholder="Second steam id"
                validation={validateField}
              />
            </S_Profiles_InputGroup>
          </S_Profiles_Form>
        </S_Profiles_Block>

        <S_Profiles_Button>
          <Button disabled={isCompareAvailable()}>Compare</Button>
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
