import React, { useEffect, useRef, useState } from 'react';
import { VStack, Input, Button, Box, Text, Flex } from '@chakra-ui/react';
import { isUser } from '../Logics/ChatLogic';
import { IoSend } from 'react-icons/io5';
import axios from 'axios'

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [typing, setTyping] = useState(false);
  // const [istyping, setIsTyping] = useState(false);
  // const [receivedMessages, setReceivedMessages] = useState([]);
  const messageRef = useRef(null);

  const getMessage = async (msg) => {
    let str = msg;
    console.log("strstr", str);
    let data = {
      temperature: 0.5,
      messages: [
        {
          role: "user",
          content: str,
        },
      ],
      model: "openhermes-2-5-m7b-4k",
      stream: true,
      max_tokens: 1000,
    };

    const proxyUrl = "https://bnx-backend.onrender.com/api/chat/completions";

    try {
      const response = await axios.post(proxyUrl, data);
      const responseString = response.data;
      const cleanedResponse = responseString.replace(
        /(data: )|(\[DONE\]")/g,
        ""
      );
      const jsonObjects = cleanedResponse.split("\n\n");
      const filteredJsonObjects = jsonObjects.filter(
        (obj) => obj.trim() !== ""
      );
      const contentArray = filteredJsonObjects.map((obj) => {
        if (obj.trim() === "[DONE]") {
          return null;
        }
        try {
          const jsonObject = JSON.parse(obj);
          return jsonObject.choices[0].delta.content;
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return null;
        }
      });
      const validContentArray = contentArray.filter(
        (content) => content !== null
      );
      let contentString = validContentArray.join("");
      while (contentString.includes("<|im_end|")) {
        contentString = contentString.replace("<|im_end|", "");
      }
      console.log("contentString", contentString);
      return contentString;
    } catch (error) {
      console.error("errr", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
   
    let chatResponse = await getMessage(newMessage);
    const newMessages = [
      ...messages,
      {
        name: "You",
        timestamp: new Date().toLocaleString(),
        content: newMessage,
      },
      {
        name: "chatBNX",
        timestamp: new Date().toLocaleString(),
        content: chatResponse,
      },
    ];
    setMessages(newMessages);
    setNewMessage("");
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  });

  return (
    <Box h="87vh" className="p-4 bg-barbiePink w-[70%] justify-center items-center m-auto">
      <Box
        flex="1"
        p={4}
        bg="yellow"
        h="75vh"
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {},
          "&::-webkit-scrollbar-thumb": {},
        }}
      >
        <VStack align="stretch" spacing={4}>
          <Box flex="1" overflow="auto">
            {messages.map((message, index) => (
              <Flex
                key={index}
                direction="column"
                align={message.name === "You" ? "flex-end" : "flex-start"}
              >
                <Box
                  style={{
                    backgroundColor: isUser(message.name)
                      ? "#f9d0e7"
                      : "#bbe9f6",
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                  }}
                >
                  <Text fontSize="xs" mb={1} color="black">
                    {message.name}
                  </Text>
                  <Text fontWeight="600" mb={1}>
                    {message.content}
                  </Text>
                  <Text fontSize="xs" className="text-right">
                    {message.timestamp}
                  </Text>
                </Box>
                <div ref={messageRef} />
              </Flex>
            ))}
          </Box>
        </VStack>
      </Box>

      <Flex mt="2">
        <Input
          flex="1"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          bg="white"
          mt={1}
        />
        <Button
          ml={2}
          bg="#6360d2"
          color="white"
          onClick={handleSendMessage}
          rounded="full"
          h={12}
          w={12}
          _hover={{
            bg: "#ffd5e8",
            color: "#5c0830",
          }}
        >
          <IoSend size={22} />
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatBox;
