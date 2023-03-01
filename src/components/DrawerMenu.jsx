import { useState, useContext, useRef, useEffect } from "react";
import { Context } from "../context/Context.jsx";
import axios from "axios";

import {
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  IconButton,
  color,
  Avatar,
  Stack,
  HStack,
  VStack,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

function DrawerMenu(props) {
  const { userData, logOut } = useContext(Context);
  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgInput = useColorModeValue("white", "gray.800");

  const [formData, setFormData] = useState({
    id: "",
    gift: "",
    units: "",
    picture: "",
    receiver: "",
    price: "",
  });

  const btnRef = useRef();
  const firstField = useRef();
  const secondField = useRef();

  const [isError, setisError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const idGift = gifts.length > 0 ? gifts[gifts.length - 1].id : 0;

    if (formData.gift === "") {
      setisError(true);
      return;
    }

    if (formData.units === "") formData.units = 1;
    if (formData.picture === "") formData.picture = "default.png";
    if (formData.receiver === "") formData.receiver = "El Marchas";
    if (formData.price === "") formData.price = 1;

    if (props.layout.action === "edit") {
      updateGift(props.gift.id, {
        id: props.gift.id,
        gift: formData.gift,
        units: formData.units,
        picture: formData.picture,
        receiver: formData.receiver,
        price: formData.price,
      });
    } else {
      addGift({
        id: idGift + 1,
        gift: formData.gift,
        units: formData.units,
        picture: formData.picture,
        receiver: formData.receiver,
        price: formData.price,
      });
    }

    onClose();

    setFormData({
      id: "",
      gift: "",
      units: "",
      picture: "",
      receiver: "",
      price: "",
    });
  }

  function handleChange(e) {
    const value = e.target.value;
    if (e.target.value !== "") setisError(false);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleOpen() {
    onOpen();
  }

  function handleClose() {
    onClose();
  }

  function handleRandom() {
    const randomItem = Math.floor(Math.random() * RANDOMGIFTS.length);
    const randomGift = RANDOMGIFTS[randomItem];

    setFormData({
      ...formData,
      gift: randomGift.gift,
      units: randomGift.units,
      picture: randomGift.picture,
      price: randomGift.price,
    });
  }

  return (
    <>
      <HStack justifyContent="flex-start" width="100%" pe={1}>
        <IconButton
          ref={btnRef}
          //colorScheme="brand"
          onClick={handleOpen}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="iconMenu"
          padding="-14"
        />

        <InputGroup size="xs" bg={bgInput}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input placeholder="Search" borderRadius={5}></Input>
        </InputGroup>
      </HStack>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={handleClose}
        initialFocusRef={true === true ? secondField : firstField}
        finalFocusRef={btnRef}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <VStack alignItems="flex-start">
              <Box>
                <Box>
                  <Avatar
                    size="md"
                    name={userData.nickName}
                    src={userData.avatar}
                  />
                </Box>
                <Box>{userData.nickName}</Box>
                <Box>{userData.bio ? userData.bio : "set Bio"}</Box>
              </Box>

              <Box>
                <Button colorScheme="brand" size="lg" onClick={toggleColorMode}>
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
                <Button
                  colorScheme="brand"
                  size="lg"
                  onClick={async () => {
                    logOut();
                  }}
                >
                  Log out
                </Button>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            Messenger Desktop Version 0.0.0 x64 - About
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { DrawerMenu };
