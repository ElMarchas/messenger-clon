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
  Image,
  Text,
  Card,
  CardBody,
} from "@chakra-ui/react";

import { Context } from "../context/Context";

function ChatPanel(props) {}

function FriendPanel(props) {
  const isImagenes =
    props.rightPanelData.images && props.rightPanelData.images.length > 0
      ? true
      : false;

  return (
    <>
      {props.rightPanelData && (
        <VStack margin="5">
          <Box>
            <Image
              maxBlockSize="480px"
              maxInlineSize="430px"
              src={props.rightPanelData.avatar}
              alt={props.rightPanelData.nickName}
              borderRadius="lg"
            />
          </Box>
          <Heading color="brand.300">{props.rightPanelData.nickName}</Heading>

          {props.rightPanelData.bio && (
            <Text
              as="i"
              whiteSpace="pre-line"
              noOfLines={12}
              alignSelf="flex-start"
            >
              {props.rightPanelData.bio}
            </Text>
          )}

          {props.rightPanelData.firstName && (
            <Box alignSelf="flex-start">
              <Heading size="md" color="brand.300" marginEnd="2">
                Name
              </Heading>
              <Box>
                {props.rightPanelData.firstName +
                  "  " +
                  props.rightPanelData.lastName}
              </Box>
            </Box>
          )}

          {isImagenes && (
            <Flex flexWrap="wrap" alignItems="flex-start">
              <Heading
                size="md"
                color="brand.300"
                marginEnd="2"
                display="block"
                width="80%"
              >
                Images
              </Heading>
              {props.rightPanelData.images.map((imagen, key) => {
                return (
                  <Card maxW="md" key={key} marginTop="3" marginRight="3">
                    <CardBody>
                      <Image
                        src={imagen.url}
                        alt={imagen.title}
                        borderRadius="lg"
                        maxBlockSize="600px"
                        maxInlineSize="380px"
                      />
                      <Stack mt="3" spacing="3">
                        {imagen.title && (
                          <Heading size="md" color="brand.600">
                            {imagen.title}
                          </Heading>
                        )}
                        {imagen.description && (
                          <Text>{imagen.description}</Text>
                        )}
                      </Stack>
                    </CardBody>
                  </Card>
                );
              })}
            </Flex>
          )}
        </VStack>
      )}
    </>
  );
}

function RightPanel(props) {
  const { userData, setgifts, isLoggedIn, isOpenRightPanel, rightPanelData } =
    useContext(Context);

  return (
    <VStack
      spacing={1}
      alignItems="center"
      display={isOpenRightPanel ? "flex" : "none"}
      width={isOpenRightPanel ? "490px" : "0px"}
      height="100vh"
      overflowY="scroll"
      //overflowX="hidden"
    >
      {rightPanelData.type === "friend" && (
        <FriendPanel rightPanelData={rightPanelData} />
      )}
      {rightPanelData.type === "chat" && <ChatPanel />}

      <Button
        onClick={() => {
          console.log(rightPanelData.images.length);
        }}
      >
        click
      </Button>
      <p>Default nada, funcioa como drawer de chats</p>
      <p>(header chat) foto nombre y hace cuanto activo mas grande</p>
      <p>(header grupo) (foto nombre grupo) y hace cuanto activo</p>
      <p>(body) media files y links</p>
    </VStack>
  );
}

export { RightPanel };
