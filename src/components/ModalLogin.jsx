import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { Context } from "../context/Context";

import {
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalFooter,
  ModalContent,
  ModalBody,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  IconButton,
  Stack,
  HStack,
  Divider,
  color,
  Icon,
  Heading,
  Flex,
  Checkbox,
  Switch,
  SimpleGrid,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@chakra-ui/react";
import {
  RiSkull2Fill,
  RiKey2Fill,
  RiEyeFill,
  RiEyeOffFill,
  RiNurseFill,
  RiNurseLine,
  RiAtLine,
} from "react-icons/ri";

import ModalTermsPolicy from "./ModalTermsPolicy.jsx";

function SingupDisplay(props) {
  return (
    <Stack mt={-4}>
      <Text fontSize="xs">
        Have an account?
        <Text
          mx={1}
          as="ins"
          color="blue.300"
          cursor="pointer"
          onClick={() => props.boolHandle("display")}
        >
          Log In
        </Text>
      </Text>

      <form onSubmit={props.handleSubmit}>
        <FormControl
          mt={-2}
          isInvalid={props.loginForm.loginError !== ""}
          isRequired
        >
          <FormLabel>User</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              children={<Icon as={RiSkull2Fill} color="gray.300" />}
            />
            <Input
              placeholder="Enter user"
              name="nickName"
              value={props.loginForm.nickName}
              onChange={props.handleChangeForm}
              onKeyDown={props.handleChangeForm}
            />
          </InputGroup>

          {props.loginForm.loginError === "" ? (
            <FormHelperText>I like that one c:</FormHelperText>
          ) : (
            <FormErrorMessage>{props.loginForm.loginError}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Password (optional)</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={RiKey2Fill} color="gray.300" />}
            />
            <Input
              pr="4.5rem"
              type={props.show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={props.loginForm.password}
              onChange={props.handleChangeForm}
              onKeyDown={props.handleChangeForm}
            />
            <InputRightElement>
              <Button variant="link" onClick={() => props.boolHandle("show")}>
                {props.show ? (
                  <Icon as={RiEyeOffFill} />
                ) : (
                  <Icon as={RiEyeFill} />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>
            please DO NOT enter a real password, it's stored as plain text 💀💀
          </FormHelperText>
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>First name (optional)</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              children={<Icon as={RiNurseFill} color="gray.300" />}
            />
            <Input
              placeholder="Enter First name"
              name="firstName"
              value={props.loginForm.firstName}
              onChange={props.handleChangeForm}
              onKeyDown={props.handleChangeForm}
            />
          </InputGroup>
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Last name (optional)</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              children={<Icon as={RiNurseLine} color="gray.300" />}
            />
            <Input
              placeholder="Enter Last name"
              name="lastName"
              value={props.loginForm.lastName}
              onChange={props.handleChangeForm}
              onKeyDown={props.handleChangeForm}
            />
          </InputGroup>
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>email (not recommendable)</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              children={<Icon as={RiAtLine} color="gray.300" />}
            />
            <Input
              placeholder="Enter email"
              name="email"
              value={props.loginForm.email}
              onChange={props.handleChangeForm}
              onKeyDown={props.handleChangeForm}
            />
          </InputGroup>
          <FormHelperText>preferably don't put a email 💀💀💀💀</FormHelperText>
        </FormControl>
        <FormControl mt={2} as={SimpleGrid} columns={{ base: 1, lg: 2 }}>
          <FormLabel htmlFor="public-switch" mb="0">
            Public account?
          </FormLabel>
          <Switch
            id="public-switch"
            colorScheme="brand"
            isChecked={props.loginForm.isPublic}
            onChange={(e) => {
              props.setloginForm({
                ...props.loginForm,
                isPublic: !props.loginForm.isPublic,
              });
            }}
          />
          <FormLabel htmlFor="hidden-switch" mb="0">
            Hidden account?
          </FormLabel>
          <Switch
            id="hidden-switch"
            colorScheme="brand"
            isChecked={props.loginForm.isHidden}
            onChange={(e) => {
              props.setloginForm({
                ...props.loginForm,
                isHidden: !props.loginForm.isHidden,
              });
            }}
          />
        </FormControl>

        <FormControl mt={2} isInvalid={props.loginForm.checkBox === false}>
          <Checkbox
            colorScheme="brand"
            size="md"
            defaultChecked
            isRequired
            onChange={(e) => {
              props.setloginForm({
                ...props.loginForm,
                checkBox: !props.loginForm.checkBox,
              });
            }}
          >
            <Text fontSize="xs">
              I confirm that I am 16 years or older and I consent to this page
              to processing my personal data.
            </Text>
          </Checkbox>
        </FormControl>

        <HStack justifyContent={"space-between"}>
          <Flex>
            <Text fontSize="xs" marginEnd="0.5">
              By clicking Sign Up, you agree to our <ModalTermsPolicy />
            </Text>
          </Flex>
          <Flex>
            <Button
              colorScheme="brand"
              onClick={props.handleSubmit}
              type="submit"
            >
              Sign Up
            </Button>
          </Flex>
        </HStack>
      </form>
    </Stack>
  );
}

function LoginDisplay(props) {
  const [testUsers, settestUsers] = useState([]);

  const getTestUsers = async () => {
    try {
      const response = await axios.get("http://localhost:6660/api/user/test", {
        withCredentials: true,
      });

      settestUsers(response.data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    getTestUsers();
  }, []);

  return (
    <Stack>
      <form onSubmit={props.handleSubmit}>
        <FormControl
          mt={-2}
          isInvalid={props.loginForm.loginError !== ""}
          isRequired
        >
          <FormLabel>User</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              children={<Icon as={RiSkull2Fill} color="gray.300" />}
            />
            <Input
              placeholder="Enter user"
              name="nickName"
              value={props.loginForm.nickName}
              onChange={props.handleChangeForm}
              onKeyDown={props.handleChangeForm}
            />
          </InputGroup>

          {props.loginForm.loginError !== "" && (
            <FormErrorMessage>{props.loginForm.loginError}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={RiKey2Fill} color="gray.300" />}
            />
            <Input
              pr="4.5rem"
              type={props.show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={props.loginForm.password}
              onChange={props.handleChangeForm}
              onKeyDown={props.handleChangeForm}
            />
            <InputRightElement>
              <Button variant="link" onClick={() => props.boolHandle("show")}>
                {props.show ? (
                  <Icon as={RiEyeOffFill} />
                ) : (
                  <Icon as={RiEyeFill} />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <HStack justifyContent={"space-between"} mt="4">
          <Flex>
            <Text fontSize="xs" marginEnd="0.5">
              Haven't an account?
            </Text>
            <Text
              fontSize="xs"
              as="ins"
              color="blue.300"
              cursor="pointer"
              onClick={() => props.boolHandle("display")}
            >
              Sing Up
            </Text>
          </Flex>
          <Flex>
            <Button
              colorScheme="brand"
              onClick={props.handleSubmit}
              type="submit"
            >
              Log in
            </Button>
          </Flex>
        </HStack>
      </form>

      <Divider orientation="horizontal" />
      <Heading size="md">Test accounts</Heading>
      <Box>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        >
          {testUsers.length > 0 &&
            testUsers.map((user, index) => {
              return (
                <Card
                  key={user._id}
                  variant="testList"
                  onClick={(e) => {
                    props.loginForm.nickName = user.nickName;
                    props.loginForm.password = "";
                    props.handleSubmit(e);
                  }}
                >
                  <CardBody>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Avatar name="Segun Adebayo" src={user.avatar} />
                        <Box>
                          <Heading size="sm">{user.nickName}</Heading>
                        </Box>
                      </Flex>
                    </Flex>
                    <Text>{user.bio}</Text>
                  </CardBody>
                </Card>
              );
            })}
        </SimpleGrid>
      </Box>
    </Stack>
  );
}

function ModalLogin(props) {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [display, setDisplay] = useState(true);
  const [show, setShow] = useState(false);
  const { logInSingIn } = useContext(Context);

  const [loginForm, setloginForm] = useState({
    nickName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    isPublic: true,
    isHidden: false,
    checkBox: true,
    loginError: "",
    singupError: "",
  });

  let displayShow;

  const handleChangeForm = (e) => {
    setloginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
      loginError: "",
    });
    if (e.key == "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    if (loginForm.nickName === "")
      return setloginForm({
        ...loginForm,
        loginError: "User is required, actually is the only one required.",
      });

    if (display === false && loginForm.checkBox === false) return;

    e.preventDefault();

    const response = await logInSingIn(loginForm, display);

    if (response[0] === "error") {
      return setloginForm({
        ...loginForm,
        loginError: response[1],
      });
    }
    setloginForm({
      ...loginForm,
      loginError: "",
    });

    onClose();
  };

  const boolHandle = (e) => {
    if (e === "show") setShow(!show);
    if (e === "display") {
      setDisplay(!display);
      setloginForm({
        ...loginForm,
        loginError: "",
      });
    }
  };

  if (display) {
    displayShow = (
      <LoginDisplay
        handleChangeForm={handleChangeForm}
        handleSubmit={handleSubmit}
        boolHandle={boolHandle}
        loginForm={loginForm}
        setloginForm={setloginForm}
        show={show}
      />
    );
  } else {
    displayShow = (
      <SingupDisplay
        handleChangeForm={handleChangeForm}
        handleSubmit={handleSubmit}
        boolHandle={boolHandle}
        loginForm={loginForm}
        setloginForm={setloginForm}
        show={show}
      />
    );
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bgGradient="linear(to-r, rgba(129,230,217,0.2), rgba(237,100,166,0.2))"
          backdropFilter="blur(2px) "
        />
        <ModalContent>
          <ModalHeader>{display ? "Please login" : "Register"}</ModalHeader>
          <ModalBody pb={6}>{displayShow}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { ModalLogin };
