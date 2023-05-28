import { Component } from "solid-js";
import { Info } from "@app/components/Profile/Info/Info";
import { ProfileBlock } from "@app/components/Profile/ProfileBlock";
import { S_Screen } from "@app/components/styled/Compare";
import { store } from "@app/data/store/store";

export const Profiles: Component = () => {
  const { firstProfile, secondProfile } = store()

  return (
    <>
      <ProfileBlock title="Profiles comprasion">
        <S_Screen>
          <Info
            avatar={firstProfile.profileData.info.avatarfull}
            position="left"
          />
        </S_Screen>
        <S_Screen>
          <Info
            avatar={secondProfile.profileData.info.avatarfull}
            position="right"
          />
        </S_Screen>
      </ProfileBlock>
      <ProfileBlock title="Timeline comparison">
        <S_Screen>timeline активности на протяжение двух недель</S_Screen>
        <S_Screen>timeline активности на протяжение двух недель</S_Screen>
      </ProfileBlock>
      <ProfileBlock title="Games comparison">
        <S_Screen>Games total & select any game</S_Screen>
        <S_Screen>Games total & select any game</S_Screen>
      </ProfileBlock>
      <ProfileBlock title="Achievements comparison">
        <S_Screen>Achievements total & select any game</S_Screen>
        <S_Screen>Achievements total & select any game</S_Screen>
      </ProfileBlock>
      <ProfileBlock title="Games comparison">
        <S_Screen>Games total & select any game</S_Screen>
        <S_Screen>Games total & select any game</S_Screen>
      </ProfileBlock>
      <ProfileBlock title="Inventory comparison">
        <S_Screen>Inventory total & select any game</S_Screen>
        <S_Screen>Inventory total & select any game</S_Screen>
      </ProfileBlock>
    </>
  );
};
