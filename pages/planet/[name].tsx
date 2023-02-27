import { Box, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";

interface Props extends SSRConfig {
  name: string;
}

interface IParams extends ParsedUrlQuery {
  name: string;
}

const PlanetName: NextPage<Props> = ({ name }) => {
  const { locale } = useRouter();
  const { t } = useTranslation(name);
  return (
    <Box maxW="5xl" mx="auto" p={8}>
      <Text fontSize="2xl">
        {`[${locale}]`} {t("name")}
      </Text>
      <Text mt={2}>{t("description")}</Text>
    </Box>
  );
};

export default PlanetName;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = locales?.reduce((acc: any[], curr) => {
    return [
      ...acc,
      ...["mercury", "venus", "earth"].map((val) => ({
        params: {
          name: val,
        },
        locale: curr,
      })),
    ];
  }, []);

  if (paths) {
    return {
      paths,
      fallback: false,
    };
  }

  return {
    paths: [{ params: { name: "no-name" }, locale: "en" }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  locale,
}) => {
  const { name } = params as IParams;
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", [name])),
      name,
    },
  };
};
