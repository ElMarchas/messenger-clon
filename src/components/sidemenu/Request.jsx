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

function Requests(props) {
  const {
    userData,
    recommendedUsers,
    friendsList,
    setgifts,
    isLoggedIn,
    toggleisLoggedIn,
    logOut,
  } = useContext(Context);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack marginBottom="auto" width="90%" overflow="hidden">
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent={props.isOpen ? "flex-start" : "center"}
      >
        <Tooltip
          hasArrow
          label="Requests"
          aria-label="Requests"
          placement="right"
        >
          <Box>
            <Icon
              as={RiUserAddFill}
              boxSize={6}
              display={props.isOpen ? "none" : "inline-block"}
            />
            <Box display={props.isOpen ? "inline-block" : "none"}>Requests</Box>
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
          {recommendedUsers.map((user, key) => {
            return (
              <Popover placement="right" trigger="hover" key={key}>
                <PopoverTrigger>
                  <Stack
                    width="100%"
                    direction="row"
                    rounded="7"
                    marginY="1.5"
                    padding="0.5"
                    _hover={
                      colorMode == "dark"
                        ? { background: "gray.600" }
                        : { background: "gray.200" }
                    }
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
                          colorScheme={"brand"}
                          onClick={async () => {
                            try {
                              const response = await axios.post(
                                "http://localhost:6660/api/user/add",
                                {
                                  request: user.nickName,
                                },
                                { withCredentials: true }
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          Add user
                        </Button>
                        <Button
                          width="100%"
                          marginBlock={2}
                          colorScheme={"brand"}
                          onClick={() => {
                            console.log("Block User");
                          }}
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

export { Requests };
