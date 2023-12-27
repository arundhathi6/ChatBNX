import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Heading,
  Text,
  Stack,
  Icon,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import PageNotFound from "./pages/PageNotFound";

const WeatherApp = () => {
  const [loading, setLoading] = useState(false);
  const [weatherLocation, setWeatherLocation] = useState("Mysore");
  const [sevenDayaWeather, setSevenDaysWeather] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});
  let bgColors = [
    "#eb1d65",
    "#af3949",
    "#d91961",
    "#f97da2",
    "#c73f74",
    "#dc85bc",
    "#b83f8c",
    "#992057",
  ];

  const getWeatherData = async (city) => {
    setLoading(true);
    try {
      const APIKEY = "36aa255c414811e61b3607211da11411";
      let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
      let res = await axios.get(Url);
      let dayData = res.data;
      let sevenDaysUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${dayData.coord.lat}&lon=${dayData.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${APIKEY}&units=metric`;

      let response = await axios.get(sevenDaysUrl);
      let SevenDaysData = response.data;

      let weatherObj = {
        country: dayData.sys.country,
        sunrise: `${new Date(dayData.sys.sunrise * 1000).getHours()}:${new Date(
          dayData.sys.sunrise * 1000
        ).getMinutes()}`,
        sunset: `${new Date(dayData.sys.sunset * 1000).getHours()}:${new Date(
          dayData.sys.sunset * 1000
        ).getMinutes()}`,
        description: dayData.weather[0].description,
        lat: dayData.coord.lat,
        lon: dayData.coord.lon,
        location: dayData.name,
        temp: `${(dayData.main.temp / 10).toFixed()}°C`,
        tempMax: `${(dayData.main.temp_max / 10).toFixed()}°C`,
        tempMin: `${(dayData.main.temp_min / 10).toFixed()}°C`,
        humidity: `${dayData.main.humidity}%`,
        pressure: `${dayData.main.pressure}mb`,
        windSpeed: `${dayData.wind.speed}km/h`,
        imgURL: `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@4x.png`,
      };
      setWeatherInfo(weatherObj);
      setSevenDaysWeather(SevenDaysData.daily);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setWeatherInfo({});
      setSevenDaysWeather([]);
      console.error("Error", err);
    }
  };

  const handleWeatherCall = () => {
    getWeatherData(weatherLocation);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleWeatherCall();
    }
  };

  useEffect(() => {
    getWeatherData(weatherLocation);
  }, []);

  return (
    <>
      <Box align="center" justify="center">
        <Flex maxWidth="400px">
          <Input
            style={{ backgroundColor: "white", border: "1px solid black" }}
            placeholder="Enter city name"
            variant="filled"
            value={weatherLocation}
            onChange={(e) => setWeatherLocation(e.target.value)}
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
            onClick={handleWeatherCall}
          >
            <Icon as={FiSearch} />
          </Button>
        </Flex>
      </Box>

      {!loading && sevenDayaWeather.length ? (
        <Box className="p-6 justify-center items-center m-auto ">
          <Box align="center" justify="center">
            <Box
              p={8}
              borderWidth={1}
              borderRadius={8}
              boxShadow="lg"
              backgroundColor="#f290bc"
              color={"white"}
              className="mt-6 md:w-[70%] sm:w-auto lg:w-[60%]"
            >
              <Stack spacing={4}>
                <Box className="justify-between md:flex-row sm:flex-row lg:flex">
                  <Box className="w-auto">
                    <Box
                      borderRadius={8}
                      boxShadow="lg"
                      p={4}
                      backgroundColor={"#02a4d3"}
                      gap={20}
                      className="md:flex-row  max-[768px]:w-60 lg:w-80 sm:flex-col-reverse md:mb-2"
                    >
                      <Box>
                        <Heading
                          fontSize="3xl"
                          fontWeight={600}
                          textAlign="left"
                        >
                          {weatherInfo.location}
                        </Heading>
                        <Flex gap={5} textAlign="left" width="auto">
                          <Text fontSize="md" fontWeight={600} lineHeight="2">
                            {weatherInfo.description}
                          </Text>
                          <Text
                            fontSize="md"
                            fontWeight={600}
                            lineHeight="2"
                          >{`${weatherInfo.tempMin}~${weatherInfo.tempMax}`}</Text>
                        </Flex>
                        <Heading
                          fontSize="5xl"
                          fontWeight={600}
                          textAlign="left"
                        >
                          {weatherInfo.temp}
                        </Heading>
                      </Box>

                      <Box>
                        <Image
                          className=""
                          backgroundColor={"#89cff0"}
                          boxShadow="lg"
                          rounded={20}
                          boxSize="150px"
                          objectFit="cover"
                          src={weatherInfo.imgURL}
                          alt="weatherImgICon"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    borderRadius={8}
                    display="grid"
                    gridTemplateRows="repeat(2, 1fr)"
                    gridTemplateColumns="repeat(2, 1fr)"
                    gap={2}
                    mt={8}
                  >
                    <Box bg="#ff3d9a" p={4} textAlign="center" borderRadius={8}>
                      <Text>Feels-like</Text>
                      <Text>{weatherInfo.temp}</Text>
                    </Box>
                    <Box bg="#ff54a8" p={4} textAlign="center" borderRadius={8}>
                      <Text>Humidity</Text>
                      <Text>{weatherInfo.humidity}</Text>
                    </Box>
                    <Box bg="#fe71b5" p={4} textAlign="center" borderRadius={8}>
                      <Text>Wind</Text>
                      <Text>{weatherInfo.windSpeed}</Text>
                    </Box>
                    <Box bg="#e5239d" p={4} textAlign="center" borderRadius={8}>
                      <Text>Sunrise</Text>
                      <Text>{weatherInfo.sunrise}</Text>
                    </Box>
                    <Box bg="#e740aa" p={4} textAlign="center" borderRadius={8}>
                      <Text>Sunset</Text>
                      <Text>{weatherInfo.sunset}</Text>
                    </Box>
                    <Box bg="#ec5db7" p={4} textAlign="center" borderRadius={8}>
                      <Text>Pressure</Text>
                      <Text>{weatherInfo.pressure}</Text>
                    </Box>
                  </Box>
                </Box>

                <Box
                  borderRadius={8}
                  display="grid"
                  gap={2}
                  className="mt-4 sm:grid-cols-4 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-8"
                >
                  {sevenDayaWeather?.map((el, i) => {
                    let days = new Date(el.dt * 1000).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    );
                    return (
                      <Box
                        key={i}
                        backgroundColor={`${bgColors[i]}`}
                        p={3}
                        borderRadius={8}
                      >
                        <Box>
                          <Text>{days}</Text>
                          <Image
                            src={`https://openweathermap.org/img/wn/${el.weather[0].icon}.png`}
                            alt="weatherImgICon"
                          />
                          <Text fontSize="xs">{el.weather[0].description}</Text>
                          <Text fontSize="md">{`${el.temp.day}°C`}</Text>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default WeatherApp;
