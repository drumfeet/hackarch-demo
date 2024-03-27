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
  // Constants and state variables
  const CONTRACT_TX_ID = "SeEKNQRppFVkyZ0BnrTIZtWfpgUbz_vtb5tUvdLlfAc"
  const COLLECTION_POSTS = "posts"

  // State variable storing the weavedb-sdk object
  const [db, setDb] = useState(null)
  // State to store an array of posts
  const [posts, setPosts] = useState([])
  // State to store the content of a single post
  const [post, setPost] = useState("")
  // State to store user wallet information
  const [user, setUser] = useState(null)

  // State to manage the current tab selection
  const [tab, setTab] = useState("all")
  // Array of available tabs with their keys and display names
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
      {/* Check if the 'user' object exists */}
      {user ? (
        <>
          {/* Display an Avatar when the user is logged in */}
          <Avatar
            bg="twitter.800"
            onClick={() =>
              // Show a toast notification when the Avatar is clicked
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
          {/* Display a Login button when the user is not logged in */}
          <Button borderRadius="116px" onClick={login}>
            Login
          </Button>
        </>
      )}
    </Flex>
  )

  const PostCard = ({ post }) => {
    // State to track whether the post is currently being edited
    const [isEditing, setIsEditing] = useState(false)
    // State to hold the edited content of the post
    const [editedPost, setEditedPost] = useState(post.data.body)

    const updatePost = async () => {
      try {
        console.log("editedPost", editedPost)
        // WeaveDB SDK query to perform the database update
        const tx = await db.update(
          {
            body: editedPost,
          },
          COLLECTION_POSTS,
          post.id,
          ...(user ? [user] : [])
        )
        console.log("updatePost", tx)
        // Check if the update was successful
        if (tx.success) {
          // Fetch the updated list of posts
          fetchPosts()
          toast({
            description: "Post updated",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          })
        } else {
          toast({
            description: `Error: ${tx.error}`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          })
        }
      } catch (e) {
        toast({
          description: `Error: ${e}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
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
            {/* display the wallet address of the original creator of the document */}
            {post.setter}
          </Text>
        </Flex>

        {/* CARD CONTENT */}
        <Flex flexDirection="column" py="16px" gap="18px">
          {/* - If 'isEditing' is true, a Textarea is displayed for editing the 'editedPost'
              - Otherwise, the post body is displayed as static text */}
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
          {/*   - If 'isEditing' is true, shows 'Close' and 'Save' buttons to manage the editing state.
                - Otherwise, displays an 'Edit' button to initiate editing.
                - A 'Delete' button is always displayed to remove the post. */}
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

  // Initialize WeaveDB
  const setupWeaveDB = async () => {
    try {
      const _db = new WeaveDB({
        contractTxId: CONTRACT_TX_ID,
        nocache: true
      })
      await _db.init()
      setDb(_db)
    } catch (e) {
      toast({
        description: `Error: ${e}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      console.error(e)
    }
  }

  // Fetch posts based on the active tab
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

  // Fetch all posts
  const fetchAllPosts = async () => {
    try {
      // WeaveDB SDK query to fetch all documents from the database with the given collection name
      const _posts = await db.cget(COLLECTION_POSTS)
      setPosts(_posts)
      console.log("fetchAllPosts", _posts)
    } catch (e) {
      toast({
        description: `Error: ${e}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      console.error(e)
    }
  }

  // Fetch posts created by the logged-in user
  const fetchUserPosts = async () => {
    try {
      // WeaveDB SDK query to fetch all documents from the database with the given collection name, where the 'user_wallet' field matches 'user.signer'
      const _posts = await db.cget(COLLECTION_POSTS, [
        "user_wallet",
        "==",
        user.signer,
      ])
      setPosts(_posts)
      console.log("fetchUserPosts", _posts)
    } catch (e) {
      toast({
        description: `Error: ${e}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      console.error(e)
    }
  }

  const login = async () => {
    try {
      // WeaveDB SDK query to internally link a temporary address to the signer wallet
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
      toast({
        description: `Error: ${e}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      console.error(e)
    }
  }

  const addPost = async () => {
    try {
      console.log("post", post)
      // WeaveDB SDK query to add a new document to the database
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
      } else {
        toast({
          description: `Error: ${tx.error}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      }
    } catch (e) {
      toast({
        description: `Error: ${e}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      console.error(e)
    }
  }

  const deletePost = async (post) => {
    try {
      // WeaveDB SDK query to remove a document from the database with the given document id
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
      } else {
        toast({
          description: `Error: ${tx.error}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      }
    } catch (e) {
      toast({
        description: `Error: ${e}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      console.error(e)
    }
  }

  // Initialize WeaveDB when the component mounts
  useEffect(() => {
    setupWeaveDB()
  }, [])

  // Fetch posts whenever 'db' is initialized or 'tab' changes
  useEffect(() => {
    if (db) fetchPosts()
  }, [db, tab])

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
