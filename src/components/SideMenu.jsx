import { useContext, useState, useEffect, setisLoggedIn } from "react";
import axios from "axios";
import { Context } from "../context/Context";
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
  Tag,
  TagLabel,
  Badge,
  Text,
  Card,
  CardBody,
  Textarea,
  flexbox,
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
  RiQuillPenFill,
} from "react-icons/ri";

import { Friends } from "./sidemenu/Friends";
import { Recommended } from "./sidemenu/Recommended";
import { Requests } from "./sidemenu/Request";
import { User } from "./sidemenu/User";

function SideMenu() {
  const {
    userData,
    logOut,
    friendsRequests,
    recommendedUsers,
    handleisOpenSideMenu,
    isOpenSideMenu,
  } = useContext(Context);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack
      divider={<StackDivider borderColor="gray.600" />}
      spacing={1}
      alignItems="center"
      minW="60px"
      width={isOpenSideMenu ? "248px" : "60px"}
      height="100vh"
    >
      <User isOpen={isOpenSideMenu} />
      {
        //listo carnal
      }

      {Object.keys(friendsRequests).length > 0 && (
        <Requests isOpen={isOpenSideMenu} />
      )}
      {
        //falta mucho wey :c
      }

      <Friends isOpen={isOpenSideMenu} />
      {
        //listo carnal
      }

      {Object.keys(recommendedUsers).length > 0 && (
        <Recommended isOpen={isOpenSideMenu} />
      )}
      {
        //falta pokito wey :|
      }

      <Stack marginBottom="3" width="90%">
        <Tooltip
          hasArrow
          label={"Log Out"}
          aria-label={"Log Out"}
          placement="right"
        >
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent={isOpenSideMenu ? "flex-start" : "center"}
            rounded="7"
            _hover={{
              background: colorMode == "dark" ? "gray.600" : "gray.200",
              cursor: "pointer",
              textDecor: "underline",
              color: "blue.300",
            }}
            onClick={logOut}
          >
            <Button variant="iconMenu">
              <Icon as={RiLogoutBoxRLine} boxSize={6} />
            </Button>
            <Box display={isOpenSideMenu ? "inline-block" : "none"}>
              Log Out
            </Box>
          </Stack>
        </Tooltip>
        <Tooltip
          hasArrow
          label={"Night Mode"}
          aria-label={"Night Mode"}
          placement="right"
        >
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent={isOpenSideMenu ? "flex-start" : "center"}
            rounded="7"
            _hover={{
              background: colorMode == "dark" ? "gray.600" : "gray.200",
              cursor: "pointer",
              textDecor: "underline",
              color: "blue.300",
            }}
            onClick={toggleColorMode}
          >
            <Button variant="iconMenu">
              <Icon
                as={colorMode === "light" ? RiMoonFill : RiSunFill}
                boxSize={6}
              />
            </Button>
            <Box display={isOpenSideMenu ? "inline-block" : "none"}>
              Night Mode
              <Switch
                marginLeft={2}
                isDisabled
                isInvalid
                isChecked={colorMode === "light" ? false : true}
              />
            </Box>
          </Stack>
        </Tooltip>
        <Tooltip
          hasArrow
          label={"Settings"}
          aria-label={"Settings"}
          placement="right"
        >
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent={isOpenSideMenu ? "flex-start" : "center"}
            rounded="7"
            _hover={{
              background: colorMode == "dark" ? "gray.600" : "gray.200",
              cursor: "pointer",
              textDecor: "underline",
              color: "blue.300",
            }}
            onClick={() => {
              console.log(userData);
            }}
          >
            <Button variant="iconMenu">
              <Icon as={RiSettings3Fill} boxSize={6} />
            </Button>
            <Box display={isOpenSideMenu ? "inline-block" : "none"}>
              Settings
              {
                //agregale para ver bloqueados y solicitudes enviadas
                //ver el perfil en el panel para subir fotos
              }
            </Box>
          </Stack>
        </Tooltip>
        <Tooltip
          hasArrow
          label={isOpenSideMenu ? "Close menu" : "Open menu"}
          aria-label={isOpenSideMenu ? "Close menu" : "Open menu"}
          placement="right"
        >
          <Button
            onClick={() => handleisOpenSideMenu()}
            variant="iconMenu"
            alignSelf={isOpenSideMenu ? "flex-end" : "center"}
          >
            <Icon
              as={isOpenSideMenu ? RiArrowLeftLine : RiArrowRightLine}
              boxSize={7}
            />
          </Button>
        </Tooltip>
      </Stack>
    </VStack>
  );
}

export { SideMenu };
