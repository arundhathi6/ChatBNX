import React, { useState, useEffect } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const TaskUpdate = () => {
  const { id } = useParams();
  const [user, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
//   let authData = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
//   let authToken = authData.token;
//   const userData = {
//     username: user.username,
//     email: user.email,
//     role: user.role,
//     dob: user.dob,
//   };
//   const submitHandler = async () => {
//     setLoading(true);
//     if (!name || !email || !dob) {
//       toast({
//         title: "Invalid Credentials",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${authToken}`,
//         },
//       };

//       const { data } = await axios.patch(
//         `https://prickly-hare-lingerie.cyclic.app/admin/users/${id}`,
//         {
//           username: name,
//           email: email,
//           dob: dob,
//         },
//         config
//       );
//       toast({
//         title: "successfully updated",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       setLoading(false);
//       navigate("/home");
//       return;
//     } catch (error) {
//       toast({
//         title: error.message,
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       setLoading(false);
//       return;
//     }
//   };
//   const fetchOneUser = () => {
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authToken}`,
//     };

//     let usersData = axios
//       .get(`https://prickly-hare-lingerie.cyclic.app/admin/users/${id}`, { headers })
//       .then((response) => {
//         let res = response.data;
//         setName(res.username);
//         setDob(res.dob);
//         setEmail(res.email);
//         setRole(res.role);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };
//   useEffect(() => {
//     {
//       id && fetchOneUser();
//     }
//   }, []);

  return (
    <Box className="md:w-[60%] justify-center items-center m-auto mt-[2%]">
      <VStack
        p={10}
        borderRadius="15px"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "right" }}>
          <Button
            onClick={() => {
              navigate("/task-manager");
            }}
            color={'white'}
            backgroundColor={'#fe71b5'}
          >
            Go Back
          </Button>
        </Box>
        <FormControl id="Username" isRequired>
          <FormLabel className="text-[#fa28a0]">Name</FormLabel>
          <Input
            placeholder="Enter your Name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl id="Role" isRequired>
          <FormLabel className="text-[#fa28a0]">Role</FormLabel>
          <Input placeholder="Enter your Email"
        //    value={role}
            />
        </FormControl>

        <FormControl id="DOB" isRequired>
          <FormLabel className="text-[#fa28a0]">DOB</FormLabel>
          <Input
            type="date"
            placeholder="Enter your Name"
            // value={dob}
            // onChange={(e) => setDob(e.target.value)}
          />
        </FormControl>

        <FormControl id="Email" isRequired>
          <FormLabel className="text-[#fa28a0]">Email</FormLabel>
          <Input
            placeholder="Enter your Email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <Button
          width="100%"
          marginTop={15}
        //   onClick={submitHandler}
          isLoading={loading}
          backgroundColor={"#f97da2"}
        color={"white"}
        _hover={{
          bg: "#b5d7fd",
          color: "#5c0830",
        }}
        >
          Update User
        </Button>
      </VStack>
    </Box>
  );
};

export default TaskUpdate;