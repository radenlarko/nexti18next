import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, NextPage } from "next";

const About: NextPage<SSRConfig> = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("about");
  return (
    <Box maxW="5xl" mx="auto" p={8}>
      <Text fontSize="2xl" textTransform="uppercase" letterSpacing="10px">
        {`[${locale}]`} {t("title")}
      </Text>
      <Button as={Link} href="/" locale={locale} mt={2}>
        {t("button")}
      </Button>
    </Box>
  );
};

export default About;

export const getStaticProps: GetStaticProps<SSRConfig> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["about"])),
    },
  };
};
