import WeaveDB from "weavedb-sdk"
import {
  Avatar,
  Button,
  ChakraProvider,
  Flex,
  IconButton,
  Spacer,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import { map } from "ramda"
import { WriteIcon } from "@/components/images/icons/icons"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"

export default function Home() {
  const CONTRACT_TX_ID = "GS8W3JJBzC9WstwnDNMjy7E9VORPJlVBDW35OkUeSSI"
  const COLLECTION_POSTS = "posts"
  const [db, setDb] = useState(null)
  const [tweets, setTweets] = useState([])
  const [tweetPost, setTweetPost] = useState("")
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState("all")
  const tabs = [
    { key: "all", name: "All" },
    { key: "yours", name: "Yours" },
  ]

  const toast = useToast()

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
      {user ? (
        <>
          <Avatar
            bg="twitter.800"
            onClick={() =>
              toast({
                description: "You are logged in",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              })
            }
          />
        </>
      ) : (
        <>
          <WriteIcon
            onClick={() =>
              toast({
                description: "Coming Soon",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              })
            }
          />
          <Button borderRadius="116px" onClick={login}>
            Login
          </Button>
        </>
      )}
    </Flex>
  )

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
      <Flex flexDirection="column" py="16px" gap="18px">
        <Text
          color="rgba(255, 255, 255, 0.90)"
          fontSize="18px"
          fontWeight="400"
          textAlign="left"
        >
          {tweet.data.body}
        </Text>

        {/* BUTTONS */}
        {user &&
          (user.signer === tweet.setter ? (
            <Flex justifyContent="flex-end">
              <IconButton icon={<EditIcon />} colorScheme="none" />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="none"
                onClick={() => deletePost(tweet)}
              />
            </Flex>
          ) : (
            <></>
          ))}
      </Flex>
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
    if (tab === "all") fetchAllTweets()
    if (tab === "yours" && user) fetchUserTweets()
    if (tab === "yours" && !user) {
      toast({
        description: "Please login",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    }
  }

  const fetchAllTweets = async () => {
    try {
      const _tweets = await db.cget(COLLECTION_POSTS, ["date", "desc"])
      setTweets(_tweets)
      console.log("_tweets", _tweets)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchUserTweets = async () => {
    try {
      const _tweets = await db.cget(
        COLLECTION_POSTS,
        ["date", "desc"],
        ["user_wallet", "==", user.signer]
      )
      setTweets(_tweets)
      console.log("_tweets", _tweets)
    } catch (e) {
      console.error(e)
    }
  }

  const login = async () => {
    try {
      const { tx, identity } = await db.createTempAddress()
      console.log("login", tx)
      setUser(identity)
      toast({
        description: "User logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    } catch (e) {
      console.error(e)
    }
  }

  const addPost = async () => {
    try {
      console.log("tweetPost", tweetPost)
      const tx = await db.add(
        { body: tweetPost, date: db.ts(), user_wallet: db.signer() },
        COLLECTION_POSTS,
        ...(user ? [user] : [])
      )
      console.log("addPost", tx)
      if (tx.success) {
        toast({
          description: "Post added",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
        fetchTweets()
      }
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

  const deletePost = async (tweet) => {
    try {
      const tx = await db.delete(
        COLLECTION_POSTS,
        tweet.id,
        ...(user ? [user] : [])
      )
      console.log("deletePost", tx)
      if (tx.success) {
        fetchTweets()
        toast({
          description: "Post deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setupWeaveDB()
  }, [])

  useEffect(() => {
    if (db) fetchTweets()
  }, [db])

  useEffect(() => {
    fetchTweets()
  }, [tab])

  return (
    <>
      <Head>
        <title>HackAtArch WeaveDB Demo</title>
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
            {/* NAVBAR */}
            <Navbar />

            {/* POST SECTION */}
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
                  onChange={(e) => setTweetPost(e.target.value)}
                />
              </Flex>

              <Flex alignItems="center">
                <Spacer />
                <Button borderRadius="116px" onClick={addPost}>
                  Post
                </Button>
              </Flex>
            </Flex>

            {/* TAB SECTION*/}
            {user && (
              <Flex px={{ base: "16px", md: "16px" }}>
                <Flex
                  padding="10px 16px"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  w="100%"
                  borderRadius="116px"
                  border="1px solid rgba(255, 255, 255, 0.40)"
                >
                  {map((_tab) => {
                    return (
                      <>
                        <Flex
                          onClick={() => setTab(_tab.key)}
                          flexGrow="1"
                          padding="8px"
                          justifyContent="center"
                          borderRadius="116px"
                          backdropFilter="blur(48px)"
                          background={
                            tab === _tab.key ? "rgba(255, 255, 255, 0.20)" : ""
                          }
                        >
                          <Text
                            sx={{
                              color: "rgba(255, 255, 255, 0.90)",
                              textAlign: "center",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: "500",
                              lineHeight: "normal",
                            }}
                          >
                            {_tab.name}
                          </Text>
                        </Flex>
                      </>
                    )
                  })(tabs)}
                </Flex>
              </Flex>
            )}

            {/* TWEET SECTION */}
            <Flex flexDirection="column" pb="58px">
              {map((_tweet) => {
                return (
                  <>
                    <Flex
                      w="100%"
                      px="29px"
                      flexDirection="column"
                      alignItems="center"
                      py="18px"
                    >
                      <TweetCard tweet={_tweet} />
                    </Flex>
                  </>
                )
              })(tweets)}
            </Flex>
          </Flex>

          <Flex flexGrow="1" />
        </Flex>
      </ChakraProvider>
    </>
  )
}
