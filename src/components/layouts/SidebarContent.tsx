import logo from "@/assets/logo.png"
import { CloseButton } from "@chakra-ui/close-button"
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import { Icon } from "@chakra-ui/icon"
import { Box, BoxProps, Flex, FlexProps, Text } from "@chakra-ui/layout"
import { IconButton, Image } from "@chakra-ui/react"
import PropTypes from "prop-types"
import { IconType } from "react-icons"
import { BsMoon, BsSun } from "react-icons/bs"
import { navLink } from "./list"
import { useMatches } from "react-router-dom"

interface NavItemProps extends FlexProps {
  to: string;
  name?: string;
  icon: IconType;
}

const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  const matches = useMatches()
  const textColor = useColorModeValue("secondary.900", "gray.50")
  return (
    <Box
      as="a"
      href={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        // mx="4"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'primary.50',
          color: 'primary.700',
        }}
        bgColor={matches[2].pathname === to ? "#F5F3FF" : "transparent"}
        borderRight={matches[2].pathname === to ? "6px solid #4F35F3" : "none"}
        {...rest}>
        <Text
          color={matches[2].pathname === to ? "#4F35F3" : textColor}
          display={"flex"}
        >
          <Icon
            mr="4"
            fontSize="24"
            _groupHover={{
              color: 'primary.700',
            }}
            as={icon}
          />
          {children}
        </Text>
      </Flex>
    </Box>
  )
}
NavItem.propTypes = {
  icon: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
}

interface SidebarContentProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('slate.50', 'gray.900')}
      flexDirection="column"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: "15%" }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="28" alignItems="center" justifyContent={{ md: "center" }} gap={"20%"} position={"relative"}>
        {/* <Text fontWeight="bold" color="primary.500" fontSize={{ base: "xl", md: "4xl" }}>
          Luminate
        </Text> */}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        <Image src={logo} />
      </Flex>
      {navLink.map((link) => (
        <NavItem key={link.name} to={link.to} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}

      <IconButton alignSelf={"start"} roundedLeft={"none"} roundedRight={"full"} mt={"auto"} onClick={toggleColorMode} icon={<Icon as={colorMode === "dark" ? BsSun : BsMoon} />} aria-label="switch mode" pos={"fixed"} left={0} bottom={{ base: "99%", md: 1 }} />
    </Box>
  )
}
SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export { SidebarContent }

