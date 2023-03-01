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

import { Context } from "../context/Context";

import { DrawerMenu } from "../components/DrawerMenu";
import { ModalLogin } from "../components/ModalLogin";
import { ChatsList } from "../components/ChatsList";
import { SideMenu } from "../components/SideMenu";
import { RightPanel } from "../components/RightPanel";

function Layout() {
  const {
    userData,
    setgifts,
    isLoggedIn,
    toggleisLoggedIn,
    handleisOpenRightPanel,
  } = useContext(Context);

  const bgSidePanel = useColorModeValue("gray.50", "gray.900");

  return (
    <div className="App">
      {!isLoggedIn && <ModalLogin />}
      <Flex width="100vw" height="100vh">
        <Flex>
          <SideMenu />
          <Box minW="360px" w="360px" bg={bgSidePanel}>
            <VStack p={1}>
              <DrawerMenu />
              <ChatsList />
            </VStack>
          </Box>
        </Flex>

        <Flex flex="1">
          <VStack flex="1">
            <Box alignSelf={"flex-end"} margin="2">
              <Button onClick={() => handleisOpenRightPanel()}>
                Open rght panel
              </Button>
            </Box>
            <Divider />
            <Box>
              <Button
                onClick={() => {
                  console.log(Object.keys(userData).length);
                  console.log(userData);
                }}
              >
                Aywey
              </Button>

              <p>Default nada</p>
              <p>aparece chat</p>
              <p>(header) foto nombre y hace cuanto activo</p>
              <p>(Body) chat globos con hora</p>
              <p>(footer) (enviar media)(escribir mensaje)(enviar)</p>
              <p>aparece chat</p>
            </Box>
          </VStack>
        </Flex>
        <Flex bg={bgSidePanel}>
          <RightPanel />
        </Flex>
      </Flex>
    </div>
  );
}

export default Layout;

//{!isLoggedIn && <ModalLogin />}
