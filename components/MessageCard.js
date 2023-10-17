import { ChakraProvider } from "@chakra-ui/react"
import { Avatar, Flex, Text } from "@chakra-ui/react"

export default function MessageCard() {
  return (
    <>
      <ChakraProvider>
        <Flex
          w="100%"
          borderRadius="16px"
          bg="#282832"
          backdropFilter="blur(48px)"
          py="16px"
          px="24px"
          flexDirection="column"
        >
          {/* USER */}
          <Flex alignItems="center" gap="8px">
            <Avatar src="https://bit.ly/dan-abramov" />
            <Text
              color="rgba(255, 255, 255, 0.90)"
              fontSize="18px"
              fontWeight="500"
            >
              Sujeesh
            </Text>
            <Text color="#D0D5DD" fontSize="16px" fontWeight="300">
              @sujeesh
            </Text>
            <Text color="#D0D5DD" fontSize="14px" fontWeight="300">
              2d
            </Text>
          </Flex>

          {/* CONTENT */}
          <Flex flexDirection="column" py="16px">
            <Text
              color="rgba(255, 255, 255, 0.90)"
              fontSize="18px"
              fontWeight="400"
              textAlign="left"
            >
              Introducing Orafolio - a Framer Simple & Chic Templates! Simple &
              Chic Design Framer & Figma Files Ready Easy to Customize
              CMS-powered content Get it at heyproject.lemonsqueezy.com
            </Text>
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}
