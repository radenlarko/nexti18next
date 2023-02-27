import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const About = () => {
  const { locale } = useRouter();
  return (
    <Box>
      <Box maxW="5xl" mx="auto">
        <Text fontSize="2xl" textTransform="uppercase" letterSpacing="10px">
          {`[${locale}]`} About Page
        </Text>
        <Button as={Link} href="/" locale={locale} mt={2}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default About;
