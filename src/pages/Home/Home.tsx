import { Box, Flex } from "@chakra-ui/react";

export function Home() {
    return (
        <>
            <Box h={"100vh"} w={"100vw"}>
                <Flex flex={"1"} bg={"gray.300"}>
                    <Box w={"100%"} h={"auto"}>
                        Welcome to our financial system!
                        Acessed through a single page application.

                    </Box>
                </Flex>
            </Box>
        </>
    );
}