import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import {
  useColorMode,
  useDisclosure,
  Flex,
  Heading,
  Box,
  Button,
  Avatar,
  Icon,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Badge,
  Text,
  Card,
  CardBody,
  Textarea,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";

import { RiQuillPenFill } from "react-icons/ri";

function ModalChangePicture(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changeAvatar, setchangeAvatar] = useState(props.userData.avatar);

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setchangeAvatar(inputValue);
  };

  const handleChangeAvatar = (e) => {
    if (changeAvatar == props.userData.avatar) {
      return onClose();
    }
    props.changeUserAvatar(changeAvatar);
    onClose();
  };

  return (
    <>
      <Box
        marginRight={6}
        rounded="6"
        color="blue.300"
        _hover={{
          background: props.colorMode == "dark" ? "gray.600" : "gray.200",
          cursor: "pointer",
          textDecor: "underline",
          color: "blue.300",
        }}
        onClick={() => {
          onOpen();
          setchangeAvatar(props.userData.avatar);
        }}
      >
        change profile picture
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(2px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>
            <Flex>
              <Heading as="h4" size="md" marginLeft={"2"}>
                change profile picture
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" alignItems="center">
              <Box minHeight="300px" maxHeight="400px">
                <Image
                  maxHeight="400px"
                  src={changeAvatar}
                  alt="Avatar Imagen"
                  fallbackSrc="https://via.placeholder.com/150"
                  borderRadius="lg"
                />
              </Box>
              <Box alignSelf="stretch" marginBlock={2}>
                Set picture url
                <Input
                  type="text"
                  value={changeAvatar || ""}
                  onChange={handleInputChange}
                  placeholder="Set profile picture"
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="brand"
              onClick={async () => handleChangeAvatar()}
            >
              Update picture
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function UserAvatar(props) {
  const [previousNotifi, setpreviousNotifi] = useState(props.notifications);
  const [nowDate, setnowDate] = useState(Date.now());

  const handleUpdateNotifications = async () => {
    if (JSON.stringify(previousNotifi) === JSON.stringify(props.notifications))
      return;

    const response = props.updateUserNotifications(props.notifications);
    setpreviousNotifi(response);
  };

  return (
    <Popover
      placement="right"
      onOpen={() => {
        setpreviousNotifi(props.notifications);
        props.setpopoverHeight(innerHeight - 80);
        setnowDate(Date.now());
        props.handlesetNotifications({
          notifications: props.notifications.notifications,
          unread: 0,
        });
      }}
      onClose={async () => handleUpdateNotifications()}
    >
      <PopoverTrigger>
        <Box>
          <Tooltip
            hasArrow
            label={"You: " + props.userData.nickName}
            aria-label={props.userData.nickName}
            placement="right"
          >
            <Flex>
              <Avatar
                size="md"
                name={props.userData.nickName}
                src={props.userData.avatar}
                showBorder="true"
                borderColor="pink"
              />
              {props.notifications.unread > 0 && (
                <Badge
                  rounded={"20px"}
                  border="1px"
                  fontSize="1.2em"
                  colorScheme="brand"
                  boxShadow="dark-lg"
                  pos="absolute"
                  top="2px"
                  left={props.isOpen ? "52px" : "42px"}
                >
                  {props.notifications.unread}
                </Badge>
              )}
            </Flex>
          </Tooltip>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader display="flex" justifyContent="space-between">
          <Box>Notifications</Box>
          <ModalChangePicture
            colorMode={props.colorMode}
            userData={props.userData}
            changeUserAvatar={props.changeUserAvatar}
          />
        </PopoverHeader>
        <PopoverBody overflowY="auto" maxHeight={props.popoverHeight + "px"}>
          {props.notifications.notifications.map((notifi, index) => {
            var d = new Date(notifi.timestamp).toDateString();
            return (
              <Card key={index} variant="testList" marginBlock="2">
                <CardBody paddingInline={"3"} paddingBlock="4">
                  <Flex justifyContent="flex-start">
                    <Box>
                      <Heading size="sm">{notifi.data}</Heading>
                    </Box>
                    <Flex flexDirection="column">
                      <Box
                        alignSelf="flex-end"
                        textAlign="right"
                        marginTop={-2}
                        onClick={(e) => {
                          const not2 = props.notifications.notifications.filter(
                            (notification, _index) => _index !== index
                          );
                          return props.handlesetNotifications({
                            notifications: not2,
                            unread: 0,
                          });
                        }}
                      >
                        x
                      </Box>
                      <Box alignSelf="flex-end">
                        <Tooltip
                          hasArrow
                          label={d}
                          aria-label={d}
                          placement="right"
                        >
                          {props.getDate(notifi.timestamp, nowDate)}
                        </Tooltip>
                      </Box>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            );
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function User(props) {
  const {
    userData,
    recommendedUsers,
    friendsList,
    setgifts,
    isLoggedIn,
    toggleisLoggedIn,
    logOut,
    friendsRequests,
    notifications,
    setnotifications,
    setuserData,
    getDate,
    changeUserAvatar,
    handlesetNotifications,
    updateUserNotifications,
    updateUserBio,
  } = useContext(Context);

  const [popoverHeight, setpopoverHeight] = useState(innerHeight - 80);
  const [changeBio, setchangeBio] = useState(userData.bio);
  const { colorMode, toggleColorMode } = useColorMode();

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setchangeBio(inputValue);
  };

  return (
    <Box
      alignSelf={props.isOpen ? "flex-start" : "center"}
      marginInline="4"
      marginBlock="3"
    >
      <UserAvatar
        colorMode={colorMode}
        userData={userData}
        notifications={notifications}
        popoverHeight={popoverHeight}
        setpopoverHeight={setpopoverHeight}
        getDate={getDate}
        changeUserAvatar={changeUserAvatar}
        handlesetNotifications={handlesetNotifications}
        updateUserNotifications={updateUserNotifications}
      />
      <Box display={props.isOpen ? "block" : "none"}>
        <Tooltip
          hasArrow
          label={"You: " + userData.nickName}
          aria-label={userData.nickName}
          placement="right"
        >
          <Heading as="h3" size="lg" noOfLines={2}>
            {userData.nickName}
          </Heading>
        </Tooltip>
      </Box>

      <Popover
        placement="right"
        onOpen={() => {
          setchangeBio(userData.bio);
          setpopoverHeight(innerHeight - 80);
        }}
      >
        <PopoverTrigger>
          <Box display={props.isOpen ? "block" : "none"}>
            <Tooltip
              hasArrow
              whiteSpace="pre-line"
              label={userData.bio}
              aria-label={userData.bio}
              placement="right"
            >
              <Text
                as="i"
                whiteSpace="pre-line"
                display={"inline"}
                noOfLines={3}
                rounded="6"
                _hover={{
                  background: colorMode == "dark" ? "gray.600" : "gray.200",
                  cursor: "pointer",
                  textDecor: "underline",
                  color: "blue.300",
                }}
              >
                {userData.bio ? userData.bio : "Set Bio"}
              </Text>
            </Tooltip>
          </Box>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Flex>
              <Icon as={RiQuillPenFill} boxSize={6} />
              <Heading as="h4" size="md" marginLeft={"2"}>
                Set Bio
              </Heading>
            </Flex>
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Textarea
              value={changeBio}
              onChange={handleInputChange}
              placeholder="Set Bio"
              height={
                userData.bio
                  ? 26 * userData.bio.split(/\r\n|\r|\n/).length + "px"
                  : "100px"
              }
              maxHeight={popoverHeight - 50 + "px"}
            />
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <Button
              colorScheme="brand"
              onClick={async () => updateUserBio(changeBio)}
            >
              Update Bio
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export { User };
