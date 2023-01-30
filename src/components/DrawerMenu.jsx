import { useState, useContext, useRef, useEffect } from "react";
import { Context } from "../context/Context.jsx";

import {
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
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

function DrawerMenu(props) {
  const { gifts, addGift, updateGift } = useContext(Context);

  const { isOpen, onOpen, onClose } = useDisclosure();

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

        <InputGroup size="xs" bg="gray.700">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input placeholder="Search"></Input>
        </InputGroup>
      </HStack>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={handleClose}
        initialFocusRef={true === true ? secondField : firstField}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>"al chile no se"</DrawerHeader>

          <DrawerBody>
            <Stack as="form" onSubmit={handleSubmit} spacing="3">
              <FormControl isInvalid={isError}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="🎁"
                  />
                  <Input
                    ref={firstField}
                    placeholder="what do you wish?"
                    type="text"
                    name="gift"
                    value={formData.gift}
                    onChange={handleChange}
                  />
                </InputGroup>
                {isError && (
                  <FormErrorMessage fontSize="xs">
                    Gift is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <InputGroup marginTop="3">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="#️⃣"
                />
                <Input
                  ref={secondField}
                  placeholder="How many?"
                  type="number"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="🫅"
                />
                <Input
                  placeholder="Who receive?"
                  type="text"
                  name="receiver"
                  value={formData.receiver}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="🖼️"
                />
                <Input
                  placeholder="Image link (URL)"
                  type="text"
                  name="picture"
                  value={formData.picture}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="🪙"
                />
                <Input
                  placeholder="What's the Price?"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </InputGroup>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="brand"
              variant="outline"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleSubmit}>
              Accept
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { DrawerMenu };
