import { Avatar } from "@hope-ui/solid";
import { Component } from "solid-js";
import { S_Card, S_Block, S_Title } from "@app/components/styled/Card";
import { Divider } from "@hope-ui/solid";
import { store } from "@app/data/store/store";
import { parseAvatar } from "@app/utils/parseAvatar";

interface CardProps {
  profileType: "firstProfile" | "secondProfile";
}

export const Card: Component<CardProps> = ({ profileType }) => {
  const state = store();
  const currentProfile = state[profileType];

  return (
    <>
      <S_Card>
        <>
          <S_Title>
            {currentProfile?.profileData?.mainInfo?.personaname}
          </S_Title>
          <Divider />
          <S_Block>
            <Avatar src={parseAvatar(currentProfile)} />
          </S_Block>
        </>
      </S_Card>
    </>
  );
};
