import { Box, Heading, HStack, IconButton, Tag } from "@chakra-ui/react"
import { PiPlus } from "react-icons/pi"

export const DropColumn = () => {
    return (
        <Box w={"30.33%"} bg={"#F5F7F9"} rounded={"lg"} p={3}>
            <HStack>
                <Heading fontSize={"xl"} fontWeight={"400"} color={"gray.400"}>To do</Heading>
                <Tag colorScheme="blackAlpha">4</Tag>

                <IconButton aria-label="add new todo item" variant={"ghost"} colorScheme="gray" icon={<PiPlus />} ml="auto" />
            </HStack>
        </Box>
    )
}
