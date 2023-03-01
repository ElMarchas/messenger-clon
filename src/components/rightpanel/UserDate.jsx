import { useContext, useState, useEffect, setisLoggedIn } from "react";
import {
  useColorModeValue,
  useColorMode,
  Grid,
  GridItem,
  Flex,
  Stack,
  VStack,
  HStack,
  Heading,
  Box,
  Divider,
  Spacer,
  Button,
  StackDivider,
  Avatar,
  Show,
  Hide,
} from "@chakra-ui/react";

import { Context } from "../../context/Context";

function UserData() {
  const { userData, setgifts, isLoggedIn, toggleisLoggedIn } =
    useContext(Context);
  return (
    <>
      <Button
        onClick={() => {
          toggleisLoggedIn();
          console.log(isLoggedIn);
        }}
      >
        click
      </Button>
      <p>Default nada, funcioa como drawer de chats</p>
      <p>(header chat) foto nombre y hace cuanto activo mas grande</p>
      <p>(header grupo) (foto nombre grupo) y hace cuanto activo</p>
      <p>(body) media files y links</p>
    </>
  );
}

export { UserData };
