import { Container, Stack, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import UserGrid from "./components/UserGrid";

const App = () => {
  return (
    <Stack minW={"100vh"}>
      <NavBar />
      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          <Text
            as={"span"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            My Besties
          </Text>
          🚀
        </Text>
        <UserGrid />
      </Container>
    </Stack>
  );
};

export default App;
