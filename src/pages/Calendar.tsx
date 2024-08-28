import { DropColumn, Search } from "@/components/Calendar"
import { Box, ButtonGroup, Flex, Heading, HStack, Icon, IconButton } from "@chakra-ui/react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

export const Calendar = () => {
    return (
        <Box w={"full"}>
            <HStack w={"full"} flexDir={{ base: "column", md: "row" }}>
                <Flex w={"full"} gap={6} flex={3} justifyContent={{ base: "space-between", md: "start" }} >
                    <Heading>2 August 2023</Heading>
                    <ButtonGroup gap={3} variant={"outline"} colorScheme="blackAlpha" >
                        <IconButton aria-label="previous day" rounded={"full"} icon={<Icon as={FiArrowLeft} color={"black"} />} />
                        <IconButton aria-label="previous day" rounded={"full"} icon={<Icon as={FiArrowRight} color={"black"} />} />
                    </ButtonGroup>
                </Flex>

                <Search />
            </HStack>

            <DropColumn />
        </Box>
    )
}
