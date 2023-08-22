/* eslint-disable react-hooks/exhaustive-deps */

import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { mutations, queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';
import { useEffect } from 'react';

export interface State {
  currentUser: any;
}

const CurrentUser = ({ children }: any) => {
  const { currentUser, setCurrentUser, setLoadingCurrentUser } =
    useCurrentUser();

  const router = useRouter();
  const { pathname, query } = router;
  const { from, token } = query;

  useQuery(queries.getConfigId, {
    skip: !token,
    fetchPolicy: 'cache-first',
    onCompleted(data) {
      const configId = data?.clientPortalGetConfigByDomain?._id;
      loginWithSocialPay({
        variables: {
          clientPortalId: configId,
          token,
        },
        onCompleted(data) {
          if (data.clientPortalLoginWithSocialPay) {
            router.push('/profile');
          }
        },
      });
    },
  });

  const [loginWithSocialPay] = useMutation(mutations.socialPayLogin);

  useQuery(queries.currentUser, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const { clientPortalCurrentUser } = data || {};
      setCurrentUser(clientPortalCurrentUser);
      setLoadingCurrentUser(false);
    },
  });

  useEffect(() => {
    if (currentUser && router.pathname?.includes('/auth')) {
      from ? router.push(from + ' ') : router.push('/');
    }
  }, [currentUser]);

  return <>{children}</>;
};

export default CurrentUser;
