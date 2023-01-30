import {
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
} from "@chakra-ui/react";

import { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";

import { DrawerMenu } from "../components/DrawerMenu";
import { ChatsList } from "../components/ChatsList";

function Layout() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className="App">
      <Button colorScheme="brand" size="lg" onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <Grid width="100vw" templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={2} bg="" minW="336px">
          <VStack p={1}>
            <DrawerMenu />
            <ChatsList />
          </VStack>
        </GridItem>
        <GridItem colSpan={7} bg="blue.200">
          <p>Default nada</p>
          <p>aparece chat</p>
          <p>(header) foto nombre y hace cuanto activo</p>
          <p>(Body) chat globos con hora</p>
          <p>(footer) (enviar media)(escribir mensaje)(enviar)</p>
          <p>aparece chat</p>
        </GridItem>
        <GridItem colSpan={3} bg="pink.300">
          <p>Default nada, funcioa como drawer de chats</p>
          <p>(header chat) foto nombre y hace cuanto activo mas grande</p>
          <p>(header grupo) (foto nombre grupo) y hace cuanto activo</p>
          <p>(body) media files y links</p>
        </GridItem>
      </Grid>
    </div>
  );
}

export default Layout;
