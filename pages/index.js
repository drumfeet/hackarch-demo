import WeaveDB from "weavedb-sdk"
import {
  Avatar,
  Button,
  ChakraProvider,
  Flex,
  IconButton,
  Link,
  Spacer,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import { map } from "ramda"
import {
  CheckIcon,
  DeleteIcon,
  EditIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons"

export default function Home() {
  const CONTRACT_TX_ID = "GS8W3JJBzC9WstwnDNMjy7E9VORPJlVBDW35OkUeSSI"
  const COLLECTION_POSTS = "posts"
  const [db, setDb] = useState(null)
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState("")
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
        <Link color="white" href="/">
          X
        </Link>
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
          <Button borderRadius="116px" onClick={login}>
            Login
          </Button>
        </>
      )}
    </Flex>
  )

  const PostCard = ({ post }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedPost, setEditedPost] = useState(post.data.body)

    const updatePost = async () => {
      try {
        console.log("editedPost", editedPost)
        const tx = await db.update(
          {
            body: editedPost,
          },
          COLLECTION_POSTS,
          post.id,
          ...(user ? [user] : [])
        )
        console.log("updatePost", tx)
        if (tx.success) {
          fetchPosts()
          toast({
            description: "Post updated",
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

    const handleChange = (e) => {
      setEditedPost(e.target.value)
    }

    const handleEditStatus = () => {
      setEditedPost(post.data.body)
      setIsEditing(!isEditing)
    }

    return (
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
            {post.setter}
          </Text>
        </Flex>

        {/* CARD CONTENT */}
        <Flex flexDirection="column" py="16px" gap="18px">
          {isEditing ? (
            <Textarea
              color="#667085"
              fontSize="18px"
              fontWeight="500"
              pl="14px"
              value={editedPost}
              onChange={handleChange}
            />
          ) : (
            <Text
              color="rgba(255, 255, 255, 0.90)"
              fontSize="18px"
              fontWeight="400"
              textAlign="left"
            >
              {post.data.body}
            </Text>
          )}

          {/* CARD BUTTONS */}
          {user &&
            (user.signer === post.setter ? (
              <Flex justifyContent="flex-end">
                {isEditing ? (
                  <>
                    <IconButton
                      icon={<SmallCloseIcon />}
                      colorScheme="none"
                      onClick={handleEditStatus}
                    >
                      Save
                    </IconButton>
                    <IconButton
                      icon={<CheckIcon />}
                      colorScheme="none"
                      onClick={updatePost}
                    >
                      Save
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="none"
                    onClick={handleEditStatus}
                  />
                )}
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="none"
                  onClick={() => deletePost(post)}
                />
              </Flex>
            ) : (
              <></>
            ))}
        </Flex>
      </Flex>
    )
  }

  const setupWeaveDB = async () => {
    try {
      const _db = new WeaveDB({
        contractTxId: CONTRACT_TX_ID,
        remoteStateSyncEnabled: true,
        remoteStateSyncSource: "https://dre-3.warp.cc/contract",
      })
      await _db.init()
      setDb(_db)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchPosts = async () => {
    if (tab === "all") fetchAllPosts()
    if (tab === "yours" && user) fetchUserPosts()
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

  const fetchAllPosts = async () => {
    try {
      const _posts = await db.cget(COLLECTION_POSTS, ["date", "desc"])
      setPosts(_posts)
      console.log("_posts", _posts)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchUserPosts = async () => {
    try {
      const _posts = await db.cget(
        COLLECTION_POSTS,
        ["date", "desc"],
        ["user_wallet", "==", user.signer]
      )
      setPosts(_posts)
      console.log("_posts", _posts)
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
      console.log("post", post)
      const tx = await db.add(
        {
          body: post,
        },
        COLLECTION_POSTS,
        ...(user ? [user] : [])
      )
      console.log("addPost", tx)
      if (tx.success) {
        setPost("")
        fetchPosts()
        toast({
          description: "Post added",
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

  const deletePost = async (post) => {
    try {
      const tx = await db.delete(
        COLLECTION_POSTS,
        post.id,
        ...(user ? [user] : [])
      )
      console.log("deletePost", tx)
      if (tx.success) {
        fetchPosts()
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
    if (db) fetchPosts()
  }, [db])

  useEffect(() => {
    fetchPosts()
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
                  placeholder="What is happening?!"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
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

            {/* CARDS SECTION */}
            <Flex flexDirection="column" pb="58px">
              {map((_post) => {
                return (
                  <>
                    <Flex
                      w="100%"
                      px="29px"
                      flexDirection="column"
                      alignItems="center"
                      py="18px"
                    >
                      <PostCard post={_post} />
                    </Flex>
                  </>
                )
              })(posts)}
            </Flex>
          </Flex>

          <Flex flexGrow="1" />
        </Flex>
      </ChakraProvider>
    </>
  )
}
