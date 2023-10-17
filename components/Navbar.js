import { Avatar, Flex, Spacer, Text } from "@chakra-ui/react"
import { WriteIcon } from "./images/icons/icons"

export default function Navbar() {
  return (
    <>
      <Flex
        w="100%"
        borderBottom="1px solid rgba(255, 255, 255, 0.15)"
        py="16px"
        color="#FCFCFD"
        alignItems="center"
        gap="40px"
        px={{ base: "16px", md: "0" }}
      >
        <Text fontSize="24px" fontWeight="600">
          X
        </Text>
        <Spacer />
        <Flex display={{ base: "none", md: "flex" }}>
          <WriteIcon />
        </Flex>
        <Avatar src="https://bit.ly/dan-abramov" />
      </Flex>
    </>
  )
}
