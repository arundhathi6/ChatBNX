import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Flex, Icon, Button, Select, Box, CircularProgress } from "@chakra-ui/react";
import NewsCard from "./pages/NewsCard";
import { FiSearch } from "react-icons/fi";
import PageNotFound from '../components/pages/PageNotFound';

const NewsApp = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("iqoo 12");
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("");
  const NEWS_API_KEY = 'fedbde83a7b342578df3a660abe80c87';

  const getNewsData = async (query) => {
    setLoading(true);
    try {
      let response;
      if (category == "") {
       response = await axios.get(
          `https://api.bing.microsoft.com/v7.0/news/search?q=${query}&count=10`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key':NEWS_API_KEY,
            },
          }
        );
      }
       else {
        response = await axios.get(
          `https://api.bing.microsoft.com/v7.0/news/search?q=${query}&count=10&category=${category}`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key':NEWS_API_KEY,
            },
          }
        );
      }
    
      setLoading(false);
      setNewsData(response.data.value);
    } catch (error) {
      setLoading(false);
      setNewsData([]);
      console.error("Error fetching news data:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    getNewsData(query);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSearch()
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <Box>
        <Box className="justify-center m-5">
          <Select onChange={handleCategoryChange} maxWidth="200px">
            <option value="">Select Category</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </Select>
          <Flex maxWidth="400px" className="m-auto mt-14 md:mt-5">
            <Input
              style={{ backgroundColor: "white", border: "1px solid black" }}
              placeholder="Enter search query"
              variant="filled"
              value={query}
              onChange={handleInputChange}
              onKeyPress={(e) => handleEnter(e)}
              flex="1"
              mr={2}
            />
            <Button
              color="white"
              backgroundColor="#fa5397"
              px={8}
              _hover={{
                bg: "#f491b0",
                color: "#5c0830",
              }}
              onClick={handleSearch}
            >
              <Icon as={FiSearch} />
            </Button>
          </Flex>
        </Box>
        {newsData.length || loading ? <Box>
          {!loading ? <Box className="flex flex-wrap w-full justify-center overflow-scroll h-[80vh] no-scrollbar">
            {newsData.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </Box> : <Box className="flex items-center justify-center mt-[10%]">
            <CircularProgress size='120px' isIndeterminate color="#f24291" />
          </Box>}
        </Box> : <PageNotFound />}
      </Box>
    </>
  );
};

export default NewsApp;
