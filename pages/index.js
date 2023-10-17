import MessageCard from "@/components/MessageCard"
import Navbar from "@/components/Navbar"
import {
  Avatar,
  Button,
  ChakraProvider,
  Divider,
  Flex,
  Spacer,
  Textarea,
} from "@chakra-ui/react"
import Head from "next/head"

export default function Home() {

  return (
    <>
      <Head>
        <title>HackAtArch Demo</title>
        <meta name="description" content="HackAtArch WeaveDB Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChakraProvider>
        <Flex justify="center" minH="100vh" bg="#000014">
          <Flex flexGrow="1" />
          <Flex
            flexDirection="column"
            w="100%"
            maxW="760px"
            minH="100%"
            gap="24px"
          >
            <Navbar />

            {/* POST */}
            <Flex flexDirection="column">
              <Flex pt="16px">
                <Avatar src="https://bit.ly/dan-abramov" />

                <Textarea
                  variant="unstyled"
                  color="#667085"
                  fontSize="18px"
                  fontWeight="500"
                  pl="14px"
                  placeholder="Post your reply"
                />
              </Flex>

              <Flex alignItems="center">
                <Spacer />
                <Button borderRadius="116px">Post</Button>
              </Flex>
              <Divider py="16px" borderBottom="0.5px solid #666672" />
            </Flex>

            {/* MESSAGES */}
            <MessageCard />
          </Flex>
          <Flex flexGrow="1" />
        </Flex>
      </ChakraProvider>
    </>
  )
}
