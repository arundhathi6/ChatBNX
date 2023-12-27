import React, { useEffect, useRef, useState } from 'react';
import { VStack, Input, Button, Box, Text, Flex, CircularProgress } from '@chakra-ui/react';
import { isUser } from './Logics/ChatLogic';
import { IoSend } from 'react-icons/io5';
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messageRef = useRef(null);
  const [loading,setLoading]=useState(false)

  const getMessage = async (msg) => {
    const newMessages = [
      ...messages,
      {
        name: 'You',
        timestamp: new Date().toLocaleString(),
        content: newMessage,
      }
    ];
    setMessages(newMessages);
    setNewMessage('');
    setLoading(true)
    let str = msg;
    let data = {
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content: str,
        },
      ],
      model: 'openhermes-2-5-m7b-4k',
      stream: true,
      max_tokens: 1000,
    };

    const proxyUrl = 'https://bnx-backend.onrender.com/api/chat/completions';

    try {
      const response = await axios.post(proxyUrl, data);
      const responseString = response.data;
      const cleanedResponse = responseString.replace(
        /(data: )|(\[DONE\]")/g,
        ''
      );
      const jsonObjects = cleanedResponse.split('\n\n');
      const filteredJsonObjects = jsonObjects.filter(
        (obj) => obj.trim() !== ''
      );
      const contentArray = filteredJsonObjects.map((obj) => {
        if (obj.trim() === '[DONE]') {
          return null;
        }
        try {
          const jsonObject = JSON.parse(obj);
          return jsonObject.choices[0].delta.content;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return null;
        }
      });
      const validContentArray = contentArray.filter(
        (content) => content !== null
      );
      let contentString = validContentArray.join('');
      while (contentString.includes('<|im_end|')) {
        contentString = contentString.replace('<|im_end|', '');
      }
      // console.log("contentString", contentString);
      setLoading(false)
      return contentString;
    } catch (error) {
      setLoading(false)
      console.error('errr', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    let chatResponse = await getMessage(newMessage);
    const newMessages = [
      ...messages,
      {
        name: 'You',
        timestamp: new Date().toLocaleString(),
        content: newMessage,
      },
      {
        name: 'chatBNX',
        timestamp: new Date().toLocaleString(),
        content: chatResponse,
      },
    ];
    setMessages(newMessages);
    setNewMessage('');
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSendMessage()
    }
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  });

  return (
    <Box
      rounded={20}
      className="p-4 bg-[#f290bc] w-[100%] justify-center items-center m-auto "
    >
      <Box
        flex="1"
        p={10}
        bg="#feeef2"
        rounded={20}
        h="75vh"
        overflowY="scroll"
        css={{
          '&::-webkit-scrollbar': { height: '3px', width: '2px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'transperent' },
        }}
      >
        <VStack align="stretch" spacing={4}>
          <Box flex="1" overflow="auto">
            {messages.map((message, index) => (
              <Flex
                key={index}
                direction="column"
                align={message.name === 'You' ? 'flex-end' : 'flex-start'}
              >
                <Box
                  className={`${
                    isUser(message.name) ? 'bg-[#ed6381]' : 'bg-[#f5b8b6]'
                  }
                  ${
                    isUser(message.name) ? 'text-white' : 'text-black'
                  } rounded-2xl p-2 md:p-4 max-w-3/4 mt-2`}
                >
                  <Text
                    fontSize="xs"
                    mb={1}
                    color={isUser(message.name) ? 'white' : 'black'}
                  >
                    {message.name}
                  </Text>
                  <Text
                    fontWeight="600"
                    mb={1}
                    color={isUser(message.name) ? 'white' : 'black'}
                  >
                    {message.content}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={isUser(message.name) ? 'white' : 'black'}
                    className="text-right"
                  >
                    {message.timestamp}
                  </Text>
                </Box>
                
                <div ref={messageRef} />
              </Flex>
            ))}
          </Box>
        </VStack>
        {loading?<Flex>
          <Text className='text-[#e2358d] font-semibold'>Please wait, processing your request...</Text>
          <Box className="flex items-center justify-center">
         <CircularProgress size='20px' isIndeterminate color="#f24291" />
       </Box>
          </Flex>
         :null}
      </Box>
      <Flex mt="2">
        <Input
          flex="1"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => handleEnter(e)}
          bg="white"
          mt={1}
        />
        <Button
          ml={2}
          bg="#9f3b8b"
          color="white"
          onClick={handleSendMessage}
          rounded="full"
          h={12}
          w={12}
          _hover={{
            bg: '#ffdce5',
            color: '#5c0830',
          }}
        >
          <IoSend size={22} />
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatApp;
