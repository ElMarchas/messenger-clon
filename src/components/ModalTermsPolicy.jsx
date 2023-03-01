import {
  useDisclosure,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

export default function ModalTermsPolicy() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text as="ins" color="blue.300" cursor="pointer" onClick={onOpen}>
        Terms, Privacy Policy and Cookies Policy.
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={3}>
            Terms, Privacy Policy and Cookies Policy.
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              <ListItem>
                I am responsible for everything I do on this website
              </ListItem>
              <ListItem>
                All data can be stolen and i agree with this possibility
              </ListItem>
              <ListItem>
                All my provided information passes into the public domain and
                the website is not responsible for its use.
              </ListItem>
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
