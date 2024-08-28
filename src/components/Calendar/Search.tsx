import { Icon, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'

export const Search = () => {
    return (
        <InputGroup alignSelf={"right"} flex={1}>
            <InputLeftAddon bg={"transparent"} borderRight={"none"}>
                <Icon as={BiSearch} />
            </InputLeftAddon>
            <Input type="text" borderLeft={"none"} placeholder="Search" />
        </InputGroup>
    )
}
