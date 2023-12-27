import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Image, Text,
    useDisclosure
} from "@chakra-ui/react";
import { FaClipboardCheck } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { HiCollection } from "react-icons/hi";
import React from "react";
import { RiRobot2Fill } from "react-icons/ri";
import Allrouters from "./pages/Allrouters";
import { useNavigate } from "react-router-dom";
import { FaCloudSunRain } from "react-icons/fa";
import Logo from "../icons/logo.png"

export default function Sidebar() {
    const sidebar = useDisclosure();
    const navigate = useNavigate()

    const NavItem = (props) => {
        const { icon, children, ...rest } = props;
        return (
            <Flex
                align="center"
                px="4"
                pl="4"
                py="3"
                cursor="pointer"
                color={"#bf2661"}
                _hover={{
                    bg: ("#f97da2"),
                    color: ("white"),
                }}
                role="group"
                fontWeight="semibold"
                transition=".15s ease"
                fontSize={18}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="2"
                        boxSize="4"
                        _groupHover={{
                            color: ("white"),
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        );
    };
    
    const handleChat = () => {
        navigate("/")
        sidebar.onClose()
    }

    const handleWeather = () => {
        navigate("/weather")
        sidebar.onClose()
    }

    const handleNews = () => {
        navigate("/news")
        sidebar.onClose()
    }

    const handleTask = () => {
        navigate("/task-manager")
        sidebar.onClose()
    }
    
    const SidebarContent = (props) => (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg={"#ffebf7"}
            borderColor={"#ffebf7"}
            borderRightWidth="1px"
            w="60"
            {...props}
        >
            <Flex px="4" py="5" align="center">
                <Image w={120} src={Logo} />
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="black"
                aria-label="Main Navigation"
            >
                <NavItem onClick={handleChat} icon={RiRobot2Fill}>Chat App</NavItem>
                <NavItem onClick={handleWeather} icon={FaCloudSunRain}>Weather App</NavItem>
                <NavItem onClick={handleNews} icon={HiCollection}>News App</NavItem>
                <NavItem onClick={handleTask} icon={FaClipboardCheck}>Task Manager App</NavItem>
            </Flex>
        </Box>
    );

    return (
        <Box
            as="section"
            bg={"white"}
        >
            <SidebarContent display={{ base: "none", md: "unset" }} />
            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease" >
                <Flex
                    as="header"
                    align="center"
                    justify="space-between"
                    w="full"
                    px="4"
                    bg={"#f97da2"}
                    borderColor={("inherit", "gray.700")}
                    h="14"
                    className="no-scrollbar"
                >
                    <IconButton
                        aria-label="Menu"
                        display={{ base: "inline-flex", md: "none" }}
                        onClick={sidebar.onOpen}
                        icon={<FiMenu />}
                        size="sm"
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Text textAlign={"center"} fontSize="xl" fontWeight="bold" color="white">
                            ChatBNX
                        </Text>
                    </Box>
                </Flex>
                <Box as="main" p="4">
                    <Allrouters />
                </Box>
            </Box>
        </Box>
    );
}
