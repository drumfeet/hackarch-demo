import WeaveDB from "weavedb-sdk"
import {
  Avatar,
  Button,
  ChakraProvider,
  Flex,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import { map } from "ramda"

const TweetCard = ({ tweet }) => (
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
      <Avatar bg="twitter.800" />
      <Text color="#D0D5DD" fontSize="16px" fontWeight="300" noOfLines={1}>
        {tweet.setter}
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
        {tweet.data.tweet}
      </Text>
    </Flex>
  </Flex>
)

export default function Home() {
  const CONTRACT_TX_ID = "GS8W3JJBzC9WstwnDNMjy7E9VORPJlVBDW35OkUeSSI"
  const COLLECTION_POSTS = "posts"
  const [db, setDb] = useState(null)
  const [tweets, setTweets] = useState([])
  const [tweetPost, setTweetPost] = useState("")

  const Navbar = () => (
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
      <Avatar bg="twitter.800" />
    </Flex>
  )

  const setupWeaveDB = async () => {
    try {
      const _db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
      await _db.init()
      setDb(_db)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchTweets = async () => {
    try {
      const _tweets = await db.cget(COLLECTION_POSTS)
      setTweets(_tweets)
      console.log("_tweets", _tweets)
    } catch (e) {
      console.error(e)
    }
  }

  const addPost = async () => {
    try {
    } catch (e) {
      console.error(e)
    }
  }

  const editPost = async () => {
    try {
    } catch (e) {
      console.error(e)
    }
  }

  const deletePost = async () => {
    try {
    } catch (e) {
      console.error(e)
    }
  }

  const addComment = async () => {
    try {
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setupWeaveDB()
  }, [])

  useEffect(() => {
    fetchTweets()
  }, [db])

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

            {/* TWEET */}
            <Flex
              flexDirection="column"
              px={{ base: "16px", md: "0" }}
              pb="48px"
              gap="28px"
            >
              <Flex pt="16px">
                <Avatar bg="twitter.800" />

                <Textarea
                  variant="unstyled"
                  color="#667085"
                  fontSize="18px"
                  fontWeight="500"
                  pl="14px"
                  placeholder="Post a tweet"
                />
              </Flex>

              <Flex alignItems="center">
                <Spacer />
                <Button borderRadius="116px">Post</Button>
              </Flex>
            </Flex>

            {/* TWEETS */}
            {map((_tweet) => {
              return (
                <>
                  <Flex
                    w="100%"
                    px="29px"
                    flexDirection="column"
                    alignItems="center"
                    gap="28px"
                  >
                    <TweetCard tweet={_tweet} />
                  </Flex>
                </>
              )
            })(tweets)}
          </Flex>

          <Flex flexGrow="1" />
        </Flex>
      </ChakraProvider>
    </>
  )
}
