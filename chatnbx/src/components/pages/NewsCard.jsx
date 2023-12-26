import React from 'react';
import {Flex, Image, Box } from '@chakra-ui/react'
const NewsCard = ({ article }) => {
    return (
        <>
            <Box className="max-w-sm rounded overflow-hidden shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-2/3 xl:w-2/6 md:ml-6 mb-6 md:mr-6 m-4">
                <Image className="w-full" src={article.urlToImage} alt="" />
                <Box className="px-6 py-4">
                    <Box className="font-bold text-xl mb-2  min-h-46 line-clamp-3">{article.title}</Box>
                    <Flex className="justify-between my-4">
                    <p className='text-sm text-gray-700'>Source: {article.source.name}</p>
                        <p className='text-sm text-gray-700'> {new Date(article.publishedAt).toDateString()}</p>
                    </Flex>
                    <p>{article.description}</p>
                    <a className='underline' href={article.url} target="_blank" rel="noopener noreferrer">
                        Read more
                    </a>
                </Box>
                <Box className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </Box>

            </Box>
        </>
    );
};

export default NewsCard;
