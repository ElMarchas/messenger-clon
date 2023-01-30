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
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Text,
} from "@chakra-ui/react";

import { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import chatsData from "../assets/getchats.json";

function GettingChats(props) {
  function skeletonChat() {
    return (
      <HStack
        justifyContent="flex-start"
        width="96%"
        borderRadius={8}
        p="2"
        _hover={
          props.colorMode == "dark"
            ? { background: "gray.600" }
            : { background: "gray.200" }
        }
      >
        <Box minWidth="48px">
          <SkeletonCircle size="12" isLoaded={props.isLoaded} />
        </Box>
        <Box minWidth="215px">
          <Skeleton
            height="16px"
            m={2}
            width="100px"
            isLoaded={props.isLoaded}
            borderRadius="lg"
          />

          <HStack fontSize={12}>
            <Skeleton
              height="10px"
              width="180px"
              isLoaded={props.isLoaded}
              borderRadius="lg"
            />
          </HStack>
        </Box>
      </HStack>
    );
  }

  return (
    <>
      {skeletonChat()}
      {skeletonChat()}
      {skeletonChat()}
      {skeletonChat()}
    </>
  );
}

function RenderChats(props) {
  function setchatMain(params) {
    console.log(params);
  }

  function getDate(epochDate) {
    let nowDate = Date.now();
    let derivatedDate = nowDate - epochDate;
    //ahora, minutos, horas, dias, semanas, años
    /*los primeros 10 digitos son los chidos, los otros 3 son ms
      1 minute 60 seconds
      1 hour	3600 seconds
      1 day	86400 seconds
      1 week	604800 seconds
      1 month (30.44 days) 	2629743 seconds
      1 year (365.24 days) 	 31556926 seconds
    */
    if (derivatedDate < 60000) return "now";
    if (derivatedDate < 3600000)
      return Math.floor(derivatedDate / (1000 * 60)) + "m";
    if (derivatedDate < 86400000)
      return Math.floor(derivatedDate / (1000 * 60 * 60)) + "h";
    if (derivatedDate < 604800000)
      return Math.floor(derivatedDate / (1000 * 60 * 60 * 24)) + "d";
    if (derivatedDate < 31556926000)
      return Math.floor(derivatedDate / (1000 * 60 * 60 * 24 * 7)) + "w";
    return Math.floor(derivatedDate / (1000 * 60 * 60 * 24 * 7 * 52)) + "y";
  }

  return (
    <>
      {chatsData.map((chat, key) => {
        return (
          <HStack
            key={key}
            justifyContent="flex-start"
            borderLeftRadius="8"
            borderRightRadius="8"
            p="2"
            _hover={
              props.colorMode == "dark"
                ? { background: "gray.600" }
                : { background: "gray.200" }
            }
            onClick={() => setchatMain(chat.id)}
          >
            //esta madre se tiene que mapear 331px 38px
            <Box minWidth="48px">
              <Avatar name={chat.name} src={chat.imgAvatar}>
                {chat.isConnected && (
                  <AvatarBadge bg="brand.500" boxSize="0.9em" />
                )}
              </Avatar>
            </Box>
            <Box minWidth="215px">
              <Box fontWeight="normal" noOfLines={1}>
                {chat.name}
              </Box>
              <HStack fontSize={12}>
                <Box maxWidth="180px" noOfLines={1}>
                  {chat.message}
                </Box>
                <Box minWidth="35px"> : {getDate(chat.date)}</Box>
              </HStack>
            </Box>
            <Box minWidth="24px">
              {chat.isGroup ? (
                <AvatarGroup size="2xs" fontSize={12} max={2}>
                  {chat.groupMembers.map((member, key) => {
                    return (
                      <Avatar
                        key={key}
                        name={member.name}
                        src={member.imgAvatar}
                      />
                    );
                  })}
                </AvatarGroup>
              ) : (
                <Avatar size="2xs" name={chat.name} src={chat.imgAvatar} />
              )}
            </Box>
            //esta madre se tiene que mapear //son 3 secciones y 2 modos,
            abierto cerrado abierto | avatar estado | nombre y mensajehora |
            icono leido| cerrado | avatar estado | //en hover se agrega un menu
            ... tal vez
          </HStack>
        );
      })}
    </>
  );
}

function ChatsList() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Stack overflow="auto" maxHeight={"80vh"}>
      {onscroll}
      {isLoaded ? (
        <RenderChats isLoaded={isLoaded} colorMode={colorMode} />
      ) : (
        <GettingChats isLoaded={isLoaded} colorMode={colorMode} />
      )}

      <Button
        onClick={() => {
          setIsLoaded((toggle) => !toggle);
        }}
      >
        Carga
      </Button>
    </Stack>
  );
}

export { ChatsList };
