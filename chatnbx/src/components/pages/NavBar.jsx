import React, { useRef } from "react";
import {
  VStack,
  Text,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  Box,
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeBtnRef = useRef();

  const handleToggleDrawer = () => {
    isOpen ? onClose() : onOpen();
  };

  const menuOptions = [
    { label: "New Chat", onClick: () => console.log("New Chat clicked") },
    { label: "Get Weather", onClick: () => console.log("Get Weather clicked") },
    {
      label: "Get Latest News",
      onClick: () => console.log("Get Latest News clicked"),
    },
    {
      label: "Task Manager",
      onClick: () => console.log("Task Manager clicked"),
    },
  ];

  return (
    <div>
      <Flex
        bg="pink.500"
        p={4}
        mb={4}
        boxShadow="md"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          icon={<BiMenu />}
          aria-label="Toggle Drawer"
          onClick={handleToggleDrawer}
          color="black"
        />
        <Drawer
          placement="left"
          onClose={onClose}
          isOpen={isOpen}
          size="xs"
          finalFocusRef={closeBtnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg="#ff69b4">
            <DrawerCloseButton
              onClick={onClose}
              ref={closeBtnRef}
              color="white"
              _hover={{ color: "pink.100" }}
              className="absolute top-2 right-2"
            />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
              <div className="p-4 border border-red bg-[#fdfe82] h-full rounded-3xl">
                <VStack align="start" spacing={4}>
                  {menuOptions.map((option, index) => (
                    <Button
                      key={index}
                      onClick={option.onClick}
                      colorScheme="pink"
                      border={"none"}
                      variant="outline"
                      w="100%"
                      bg="#19b6ff"
                      _hover={{
                        bg: "#ffd5e8",
                        color: "#5c0830",
                      }}
                    >
                      {`${option.label}`}
                    </Button>
                  ))}
                </VStack>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Text fontSize="xl" fontWeight="bold" color="white">
          ChatBNX
        </Text>
        <Box w="24" />
      </Flex>
    </div>
  );
};

export default NavBar;
