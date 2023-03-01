import { useContext, useState, useEffect, setisLoggedIn } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
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
  Icon,
  Wrap,
  Switch,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Image,
} from "@chakra-ui/react";

import {
  RiSkull2Fill,
  RiKey2Fill,
  RiEyeFill,
  RiEyeOffFill,
  RiNurseFill,
  RiNurseLine,
  RiAtLine,
  RiSettings3Fill,
  RiLogoutBoxRLine,
  RiSunFill,
  RiMoonFill,
  RiMapPinUserFill,
  RiUserHeartFill,
  RiUserFill,
  RiUserAddFill,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";

function Friends(props) {
  const {
    userData,
    recommendedUsers,
    friendsList,
    setgifts,
    isLoggedIn,
    toggleisLoggedIn,
    logOut,
    handlesetrightPanelData,
    blockUser,
    deleteFriend,
  } = useContext(Context);
  const { colorMode, toggleColorMode } = useColorMode();
  const height = 100 * Object.keys(friendsList).length + 25 + "px";

  return (
    <Stack
      marginBottom={Object.keys(recommendedUsers).length > 0 ? "0" : "auto"}
      width="90%"
      overflow="hidden"
      height={height}
      maxHeight={Object.keys(recommendedUsers).length > 0 ? "360px" : height}
    >
      <Stack
        marginBottom="-10px"
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent={props.isOpen ? "flex-start" : "center"}
      >
        <Tooltip
          hasArrow
          label={"Friends : " + Object.keys(friendsList).length}
          aria-label="Friends"
          placement="right"
        >
          <Box>
            <Icon
              as={RiUserFill}
              boxSize={6}
              display={props.isOpen ? "none" : "inline-block"}
            />
            <Box display={props.isOpen ? "inline-block" : "none"}>Friends</Box>
          </Box>
        </Tooltip>
      </Stack>

      <Stack
        width="100%"
        direction="column"
        alignItems="center"
        justifyContent={props.isOpen ? "flex-start" : "flex-start"}
        overflowY="scroll"
        //maxHeight="183px"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&::-webkit-scrollbar-track": {
            display: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            display: "none",
          },
        }}
      >
        <Box width="100%">
          {friendsList.map((user, key) => {
            return (
              <Popover placement="right" trigger="hover" key={key}>
                <PopoverTrigger>
                  <Stack
                    width="100%"
                    direction="row"
                    rounded="7"
                    marginBottom="1.5"
                    padding="0.5"
                    _hover={
                      colorMode == "dark"
                        ? { background: "gray.600" }
                        : { background: "gray.200" }
                    }
                    onClick={() => handlesetrightPanelData(user, "friend")}
                  >
                    <Flex>
                      <Avatar
                        size="md"
                        name={user.nickName}
                        src={user.avatar}
                      />
                      <Box
                        display={props.isOpen ? "inline-block" : "none"}
                        alignSelf="center"
                        marginLeft="3"
                        noOfLines={2}
                      >
                        {user.nickName}
                      </Box>
                    </Flex>
                  </Stack>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>
                    <Flex>
                      <Box>
                        <Avatar
                          showBorder
                          size="2xl"
                          name={user.nickName}
                          src={user.avatar}
                          borderRadius={8}
                        />
                      </Box>
                      <Box marginInlineStart={4} width="100%">
                        <Button
                          width="100%"
                          colorScheme={"purple"}
                          onClick={async () => deleteFriend(user)}
                        >
                          Delete friend
                        </Button>

                        <Button
                          width="100%"
                          marginBlock={2}
                          colorScheme={"red"}
                          onClick={async () => blockUser(user)}
                        >
                          Block user
                        </Button>
                      </Box>
                    </Flex>
                  </PopoverHeader>
                  <PopoverBody>
                    <Tooltip
                      hasArrow
                      label={user.nickName}
                      aria-label={user.nickName}
                      placement="right"
                    >
                      <Heading as="h3" size="lg" noOfLines={1}>
                        {user.nickName}
                      </Heading>
                    </Tooltip>
                    <Tooltip
                      hasArrow
                      label={user.bio}
                      aria-label={user.bio}
                      placement="right"
                    >
                      <Box as="i" noOfLines={5}>
                        {user.bio}
                      </Box>
                    </Tooltip>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            );
          })}
        </Box>
      </Stack>
    </Stack>
  );
}

export { Friends };
