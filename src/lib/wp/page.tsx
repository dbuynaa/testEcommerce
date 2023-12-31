import { LOGIN, FOOTER, TERMS_OF_USE, ABOUT } from './queries/page';
import { getApolloClient } from './client';
import { getGqlQuery } from './utils';
import type { DocumentNode } from 'graphql';
import { mapPostData } from './posts';

export const getPage = async (
  query: DocumentNode
): Promise<{ page?: WpPage }> => {
  const apolloClient = getApolloClient();
  const data = await apolloClient.query({
    ...getGqlQuery(query),
  });

  const page = data?.data.pageBy;

  return { page: mapPostData(page) };
};

export async function getLogin() {
  return await getPage(LOGIN);
}

export async function getFooter() {
  return await getPage(FOOTER);
}

export async function getTermsOfUse() {
  return await getPage(TERMS_OF_USE);
}

export async function getAbout() {
  return getPage(ABOUT);
}

export type WpPage = {
  featuredImage?: { sourceUrl: string };
  contact?: { mail: string; map: string; phone: string };
  title?: string;
  slug?: string;
  content?: string;
};
