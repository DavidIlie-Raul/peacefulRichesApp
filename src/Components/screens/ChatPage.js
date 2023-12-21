import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Message,
} from "react-native-gifted-chat";
import PocketBase from "pocketbase";
import { useAuth } from "../../Utils/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { SheetManager } from "react-native-actions-sheet";
import TruncateText from "../../Utils/TruncateText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

const ChatPage = () => {
  const { dbUrl, currentAuthCredentials, user, setAuthJWT } = useAuth();
  const pb = new PocketBase(dbUrl);
  const [messages, setMessages] = useState([]);
  let messageToSendToDB = new FormData();

  //Handle Attaching Files
  const handleAddAttachment = async () => {
    let result;
    //Show ActionSheet and present options of what to upload
    let resultChoice = await SheetManager.show("attachments-upload-sheet");
    console.log("choice:", resultChoice);

    switch (resultChoice) {
      case "image":
        //Start Image pick process
        console.log("picking image");
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [16, 9],
        });
        if (!result.canceled) {
          messageToSendToDB.append("images", {
            name: `images`,
            uri: result.assets[0].uri,
            type: "images/jpeg",
          });
          console.log(result);
        }

        break;
      case "file":
        //Start File pick Process
        console.log("picking file");
        result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true,
        });
        if (result.type === "success") {
          messageToSendToDB.append("documents", {
            name: `documents`,
            uri: result.uri,
            type: result.mimeType,
          });
          console.log(result);
        } else {
          return console.log("Failed to upload selected file");
        }

        break;
      case "undefined":
        return;
      default:
        console.log("ActionSheet Opened");
        break;
    }
  };

  const CustomAction = () => {
    return (
      <View>
        <AntDesign
          name="pluscircle"
          size={24}
          color="cyan"
          style={styles.addFileButton}
          onPress={handleAddAttachment}
        />
      </View>
    );
  };

  const customMessageImages = (props) => {
    const { currentMessage, position } = props;
    let isLeft;
    if (position === "right") {
      isLeft = false;
    } else {
      isLeft = true;
    }

    if (!props.currentMessage.image) {
      return null; // or handle the case where images are not defined
    }

    const imgs = props.currentMessage.image.split(",");

    return (
      <View
        style={
          isLeft
            ? bubbleStyles.left.imageAttachmentsContainer
            : bubbleStyles.right.imageAttachmentsContainer
        }
      >
        {imgs.map((img, index) => (
          <View
            key={index}
            style={
              isLeft
                ? bubbleStyles.left.imageAttachmentContainer
                : bubbleStyles.right.imageAttachmentContainer
            }
          >
            <TouchableOpacity
              onPress={() => {
                SheetManager.show("image-viewer-sheet", {
                  payload: { value: img.trim() },
                });
              }}
            >
              <Image
                key={index}
                source={{ uri: img.trim() }}
                style={
                  isLeft
                    ? bubbleStyles.left.imageAttachment
                    : bubbleStyles.right.imageAttachment
                }
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 0,
          padding: 0,
        }}
      />
    );
  };

  async function handleAttachmentPress(document) {
    const save = async (uri, filename, mimetype) => {
      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            filename,
            mimetype
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              });
            })
            .catch((e) => console.log(e));
        } else {
          return;
        }
      } else {
        shareAsync(uri);
      }
    };
    // Handle opening the document, for example, you can open a modal or use Linking to open the document
    const uri = FileSystem.documentDirectory + "downloads/";
    const url = `${dbUrl}/api/files/yrqnthkt7psdnbi/${document.itemId}/${document.name}`;
    console.log("downloadURL:", url);
    try {
      const downloadResult = await FileSystem.downloadAsync(url, uri);
      if (downloadResult.status === 200) {
        save(
          downloadResult.uri,
          document.name,
          downloadResult.headers["Content-Type"]
        );
      } else {
        console.error(
          "Failed to download file. Server returned status:",
          downloadResult.status
        );
      }
    } catch (error) {
      console.log("An error occurred with downloading this attachment", error);
    }

    // For simplicity, this example uses Linking to open the document
    console.log("Opening", document);
    return;
  }

  function renderMessage(props) {
    const { currentMessage } = props;

    try {
      // Assuming each attachment has a 'name' and 'itemId' property
      const documents = currentMessage.documents;

      const CustomBubble = (props) => {
        const { currentMessage, position } = props;
        const imgs = currentMessage.image.split(",");

        let hasDocs;
        let hasImages;

        if (
          currentMessage.documents !== undefined &&
          currentMessage.documents.length > 0
        ) {
          hasDocs = true;
        } else {
          hasDocs = false;
        }
        if (currentMessage.image === null || currentMessage.image === "") {
          hasImages = false;
        } else {
          hasImages = true;
        }

        let isLeft;
        if (position === "left") {
          isLeft = true;
        } else {
          isLeft = false;
        }

        return (
          <>
            <View
              style={
                isLeft
                  ? bubbleStyles.left.bubbleOuterContainer
                  : bubbleStyles.right.bubbleOuterContainer
              }
            >
              <View
                style={
                  isLeft
                    ? bubbleStyles.left.bubbleContainer
                    : bubbleStyles.right.bubbleContainer
                }
              >
                {hasImages ? (
                  <View
                    style={
                      isLeft
                        ? bubbleStyles.left.imageAttachmentsContainer
                        : bubbleStyles.right.imageAttachmentsContainer
                    }
                  >
                    {imgs.map((img, index) => (
                      <View
                        key={index}
                        style={
                          isLeft
                            ? bubbleStyles.left.imageAttachmentContainer
                            : bubbleStyles.right.imageAttachmentContainer
                        }
                      >
                        <TouchableOpacity
                          onPress={() => {
                            SheetManager.show("image-viewer-sheet", {
                              payload: { value: img.trim() },
                            });
                          }}
                        >
                          <Image
                            key={index}
                            source={{ uri: img.trim() }}
                            style={
                              isLeft
                                ? bubbleStyles.left.imageAttachment
                                : bubbleStyles.right.imageAttachment
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Document Wrapper */}
                {hasDocs ? (
                  <View
                    style={
                      isLeft
                        ? bubbleStyles.left.documentAttachmentsContainer
                        : bubbleStyles.right.documentAttachmentsContainer
                    }
                  >
                    {documents.map((document, index) => (
                      <View
                        key={index}
                        style={
                          isLeft
                            ? bubbleStyles.left.documentAttachment
                            : bubbleStyles.right.documentAttachment
                        }
                      >
                        <View
                          style={
                            isLeft
                              ? bubbleStyles.left.innerDocumentFileIconAndText
                              : bubbleStyles.right.innerDocumentFileIconAndText
                          }
                        >
                          <AntDesign
                            style={
                              isLeft
                                ? bubbleStyles.left.documentAttachmentIcon
                                : bubbleStyles.right.documentAttachmentIcon
                            }
                            name="file1"
                            size={15}
                            color="black"
                          />
                          <Text
                            style={
                              isLeft
                                ? bubbleStyles.left.documentAttachmentText
                                : bubbleStyles.right.documentAttachmentText
                            }
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {TruncateText(document.name, 30)}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleAttachmentPress(document)}
                        >
                          <MaterialCommunityIcons
                            style={
                              isLeft
                                ? bubbleStyles.left.documentDownloadIcon
                                : bubbleStyles.right.documentDownloadIcon
                            }
                            name="download-circle"
                            size={20}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Message Wrapper */}
                <View
                  style={
                    isLeft
                      ? bubbleStyles.left.bubbleMessageWrapper
                      : bubbleStyles.right.bubbleMessageWrapper
                  }
                >
                  <Text
                    style={
                      isLeft
                        ? bubbleStyles.left.bubbleMessage
                        : bubbleStyles.right.bubbleMessage
                    }
                  >
                    {currentMessage.text}
                  </Text>
                </View>
                {/* Footer Wrapper */}
                <View
                  style={
                    isLeft
                      ? bubbleStyles.left.bubbleFooterWrapper
                      : bubbleStyles.right.bubbleFooterWrapper
                  }
                >
                  <Text
                    style={
                      isLeft
                        ? bubbleStyles.left.bubbleFooterUsername
                        : bubbleStyles.right.bubbleFooterUsername
                    }
                  >
                    ~ {currentMessage.user.name} {"  "}
                  </Text>
                  <Text
                    style={
                      isLeft
                        ? bubbleStyles.left.bubbleFooterText
                        : bubbleStyles.right.bubbleFooterText
                    }
                  >
                    {"  "}
                    {currentMessage.createdAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </>
        );
      };

      // Render each attachment
      return <Message {...props} renderBubble={CustomBubble}></Message>;
    } catch (error) {
      console.error("Error in mapping document", error);
      return;
    }
  }

  useEffect(() => {
    async function fetchMessageHistory() {
      try {
        // Fetch message history from the backend
        const records = await pb.collection("messages").getList(1, 50, {
          sort: "-created",
        });
        let formattedMessages = [];

        for (const item of records.items) {
          //Fetch associated user that sent a message
          const userThatSentMessage = await pb
            .collection("users")
            .getOne(item.sender);
          const avatarImage = userThatSentMessage.avatar;
          const avatarURL = `${dbUrl}/api/files/${userThatSentMessage.collectionId}/${userThatSentMessage.id}/${avatarImage}`;
          function getAvatarImage() {
            let avatarToReturn;
            if (
              avatarImage !== undefined &&
              avatarImage !== null &&
              avatarImage !== ""
            ) {
              avatarToReturn = avatarURL;
            } else {
              avatarToReturn = undefined;
            }
            return avatarToReturn;
          }
          function getMessageImages() {
            let arrayOfImageLinks = [];
            const imageAttachments = item.images;

            for (const image of imageAttachments) {
              const imageURL = `${dbUrl}/api/files/${item.collectionId}/${item.id}/${image}`;
              arrayOfImageLinks.push(imageURL);
            }
            console.log("This is the array:", arrayOfImageLinks);
            if (
              imageAttachments !== "" &&
              imageAttachments !== null &&
              imageAttachments !== undefined
            ) {
              return arrayOfImageLinks.join(",");
            } else {
              return undefined;
            }
          }
          function getMessageDocuments() {
            const documentsArray = item.documents;

            if (
              documentsArray !== "" &&
              documentsArray !== null &&
              documentsArray !== undefined
            ) {
              // Map each document name to an object with name and item ID
              const documentsWithIds = documentsArray.map((documentName) => {
                return {
                  name: documentName,
                  itemId: item.id,
                  // You may want to add other properties as needed
                };
              });

              return documentsWithIds;
            } else {
              return undefined;
            }
          }
          const formattedChatMessage = {
            _id: item.id,
            text: item.content,
            createdAt: new Date(item.created),
            user: {
              _id: userThatSentMessage.id,
              name: userThatSentMessage.username, // Modify this accordingly
              avatar: getAvatarImage(),
            },
            image: getMessageImages(),
            documents: getMessageDocuments(),
          };
          formattedMessages.push(formattedChatMessage);
        }

        setMessages(formattedMessages);
      } catch (error) {
        console.log("Failed to fetch message history: ", error, error.data);
      }
    }

    fetchMessageHistory();
  }, []); // Empty dependency array for initial message fetching

  useEffect(() => {
    // Set up real-time updates
    async function subToRealtimeMessages() {
      const unsubscribe = pb
        .collection("messages")
        .subscribe("*", async (data) => {
          if (data.action === "create") {
            // Handle new message
            const userThatSentMessage = await pb
              .collection("users")
              .getOne(data.record.sender);
            const avatarImage = userThatSentMessage.avatar;
            const avatarURL = `${dbUrl}/api/files/${userThatSentMessage.collectionId}/${userThatSentMessage.id}/${avatarImage}`;
            function getNewAvatarImage() {
              let avatarToReturn;
              if (
                avatarImage !== undefined &&
                avatarImage !== null &&
                avatarImage !== ""
              ) {
                avatarToReturn = avatarURL;
              } else {
                avatarToReturn = undefined;
              }
              return avatarToReturn;
            }
            function getNewMessageImages() {
              let arrayOfImageLinks = [];
              const imageAttachments = data.record.images;

              for (const image of imageAttachments) {
                const imageURL = `${dbUrl}/api/files/${data.record.collectionId}/${data.record.id}/${image}`;
                arrayOfImageLinks.push(imageURL);
              }
              console.log("This is the array:", arrayOfImageLinks);
              if (
                imageAttachments !== "" &&
                imageAttachments !== null &&
                imageAttachments !== undefined
              ) {
                return arrayOfImageLinks.join(",");
              } else {
                return null;
              }
            }

            function getMessageDocuments() {
              const documentsArray = data.record.documents;

              if (
                documentsArray !== "" &&
                documentsArray !== null &&
                documentsArray !== undefined
              ) {
                // Map each document name to an object with name and item ID
                const documentsWithIds = documentsArray.map((documentName) => {
                  return {
                    name: documentName,
                    itemId: data.record.id,
                    // You may want to add other properties as needed
                  };
                });

                return documentsWithIds;
              } else {
                return undefined;
              }
            }

            const newMessage = {
              _id: data.record.id,
              text: data.record.content,
              createdAt: new Date(data.record.created),
              user: {
                _id: data.record.sender,
                name: userThatSentMessage.username, // Modify this accordingly
                avatar: getNewAvatarImage(),
              },
              image: getNewMessageImages(),
              documents: getMessageDocuments(),
            };
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, [newMessage])
            );
          } else if (data.action === "delete") {
            // Handle message deletion
            const messageIdToDelete = data.record.id;
            setMessages((previousMessages) =>
              previousMessages.filter(
                (message) => message._id !== messageIdToDelete
              )
            );
          }
        });
    }
    subToRealtimeMessages();
    return () => {
      // Unsubscribe when the component unmounts
      pb.collection("messages").unsubscribe("*");
    };
  }, []);
  // Function to send a new message
  const handleSend = async (newMessage) => {
    // Handle sending new messages here, append content and sender values to formData, besides attachments, if any.
    messageToSendToDB.append("content", newMessage[0].text);
    messageToSendToDB.append("sender", user.id);

    console.log(messageToSendToDB);

    try {
      // Update backend with the new message
      await pb.collection("messages").create(messageToSendToDB);
    } catch (error) {
      console.log("could not create new message", error, error.data);
    }
  };
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderMessage={renderMessage}
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
        renderMessageImage={(props) => customMessageImages(props)}
        showAvatarForEveryMessage={true}
        onSend={(newMessage) => handleSend(newMessage)}
        user={{
          _id: user.id, // Use the ID of the current user
          name: user.username, // Set the name of the current user
        }}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        renderActions={(props) => {
          return <CustomAction />;
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "lightblue", // Set the left bubble background color
                },
                left: { backgroundColor: "#D5D5D5" },
              }}
            />
          );
        }}
      />
    </View>
  );
};

const bubbleStyles = {
  left: StyleSheet.create({
    bubbleOuterContainer: {
      alignSelf: "flex-start",
      maxWidth: "80%",
    },
    bubbleContainer: {
      flex: 1,
      alignItems: "flex-start",
      padding: "3%",
      borderRadius: 16,
      borderBottomLeftRadius: 3,
      backgroundColor: "#e5e5e5",
    },
    imageAttachmentsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignItems: "center",
      alignSelf: "center",
      minWidth: "50%",
    },
    imageAttachmentContainer: {
      flex: 1,
      aspectRatio: 1,
      padding: 5,
      overflow: "hidden",
      minWidth: "50%",
    },
    imageAttachment: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      borderRadius: 16,
    },
    documentAttachmentsContainer: {
      flexDirection: "column",
    },
    documentAttachment: {
      backgroundColor: "lightblue",
      padding: 10,
      borderRadius: 16,
      flexDirection: "row",
      overflow: "hidden",
      alignItems: "center",
      marginVertical: 5,
    },
    documentAttachmentIcon: {
      color: "black",
    },
    documentAttachmentText: { fontSize: 10 },
    bubbleMessageWrapper: {
      paddingTop: 5,
    },
    innerDocumentFileIconAndText: {
      flexDirection: "row",
      alignItems: "center",
    },
    documentDownloadIcon: {
      marginLeft: 10,
    },
    bubbleMessage: {
      fontSize: 17,
      marginLeft: 5,
      flexWrap: "wrap",
    },
    bubbleFooterWrapper: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 3,
    },
    bubbleFooterText: {
      color: "gray",
      fontSize: 12,
    },
    bubbleFooterUsername: {
      color: "gray",
      fontSize: 12,
    },
  }),
  right: StyleSheet.create({
    bubbleOuterContainer: {
      alignSelf: "flex-end",
      maxWidth: "80%",
    },
    bubbleContainer: {
      flex: 1,
      alignItems: "flex-start",
      padding: "3%",
      borderRadius: 16,
      borderBottomRightRadius: 3,
      backgroundColor: "lightblue",
      minWidth: "20%",
    },
    imageAttachmentsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignItems: "center",
      alignSelf: "center",
      minWidth: "50%",
    },
    imageAttachmentContainer: {
      flex: 1,
      aspectRatio: 1,
      padding: 5,
      overflow: "hidden",
      minWidth: "50%",
    },
    imageAttachment: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      borderRadius: 16,
    },
    documentAttachmentsContainer: {
      flexDirection: "column",
    },
    documentAttachment: {
      backgroundColor: "#e5e5e5",
      padding: 10,
      borderRadius: 16,
      alignItems: "center",
      flexDirection: "row",
      overflow: "hidden",
      marginVertical: 5,
      justifyContent: "space-between",
    },
    documentAttachmentIcon: {
      color: "black",
    },
    innerDocumentFileIconAndText: {
      flexDirection: "row",
      alignItems: "center",
    },
    documentDownloadIcon: {
      marginLeft: 10,
      alignSelf: "flex-end",
    },
    documentAttachmentText: { fontSize: 10 },
    bubbleMessageWrapper: {
      paddingTop: 5,
    },
    bubbleMessage: {
      fontSize: 17,
      marginLeft: 5,
      alignSelf: "flex-end",
    },
    bubbleFooterWrapper: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 3,
    },
    bubbleFooterText: {
      color: "white",
      fontSize: 10,
      textAlign: "right",
      flex: 1,
    },
    bubbleFooterUsername: {
      color: "white",
      fontSize: 12,
      display: "none",
    },
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  addFileButton: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
  },
  buttonText: {
    color: "#D954E5",
    fontFamily: "Nimbus-Sans-Bold",
    textAlign: "left",
    verticalAlign: "middle",
    width: "100%",
  },
});

export default ChatPage;
