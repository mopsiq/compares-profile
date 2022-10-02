import { Component } from "solid-js";
import { Input, InputLeftAddon, Button } from "@hope-ui/solid";
import {
  S_Profile,
  S_Screen,
  S_Profile_Form,
  S_Profile_Block,
  S_Profile_Button,
  S_Profile_InputGroup,
} from "@app/components/styled/Profile";
import { Card } from "@app/components/Card/Card";

export const Profile: Component = () => {
  return (
    <>
      <S_Profile>
        <S_Profile_Block>
          <S_Profile_Form>
            <S_Profile_InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input placeholder="Your steam id" />
            </S_Profile_InputGroup>
            <S_Profile_InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input placeholder="Second steam id" />
            </S_Profile_InputGroup>
          </S_Profile_Form>
        </S_Profile_Block>

        <S_Profile_Button>
          <Button>Compare</Button>
        </S_Profile_Button>

        <S_Profile_Block>
          <S_Screen>
            <Card />
          </S_Screen>
          <S_Screen>
            <Card />
          </S_Screen>
        </S_Profile_Block>
      </S_Profile>
    </>
  );
};
