import { Avatar } from "@hope-ui/solid";
import { Component } from "solid-js";
import { S_Info_Avatar } from "@app/components/styled/Profile";

interface InfoProps {
  position: string;
  avatar: string;
}

export const Info: Component<InfoProps> = (props) => {
  return (
    <S_Info_Avatar position={props.position}>
      <Avatar src={props.avatar} size="2xl" />
    </S_Info_Avatar>
  );
};
