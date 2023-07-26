import { useMutation, useQuery } from '@apollo/client';
import { mutations, queries } from './graphql';
import { useState, useEffect } from 'react';
import { useCurrentUser } from 'modules/appContext';

import Rate from 'components/Rate';

const Rating = ({ productId }: { productId: string }) => {
  const { currentUser } = useCurrentUser();

  // const half = (n: any) => Number((Math.round(n * 2) / 2).toFixed(1));
  const [rating, setRating] = useState(0);
  const { data } = useQuery(queries.getProductReviews, {
    variables: {
      productIds: [productId],
      customerId: currentUser?.erxesCustomerId
    }
  });

  const [add] = useMutation(mutations.ReviewAdd);

  useEffect(() => {
    console.log('dataaaa', data);
    if (data && data.getProductReviews) {
      // const averageRating = half(data.productreview?.average);
      // const averageRating = data.productreview?.average;
      const averageRating = data.getProductReviews.review;
      setRating(averageRating);
      console.log('averageRateing....', averageRating);
    }
  }, [data]);

  const handleRate = (rate: number) => {
    setRating(rate);
    add({
      variables: {
        productId: productId,
        customerId: currentUser?.erxesCustomerId,
        review: rate
      },
      refetchQueries: [
        {
          query: queries.getProductReviews
        },
        'getPoductReviews'
      ]
    });
  };

  return (
    <div className="flex gap-3">
      <Rate value={rating} onChange={handleRate} />
      <span className="text-xs text-gray-400">
        {' '}
        Таны өгсөн үнэлгээ:{rating}{' '}
      </span>
    </div>
  );
};

export default Rating;