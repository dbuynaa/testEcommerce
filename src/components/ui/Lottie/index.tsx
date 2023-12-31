/* eslint-disable react-hooks/exhaustive-deps */


import { useRef, useEffect, useState, ReactNode } from 'react';
import type { LottiePlayer } from 'lottie-web';

interface IProps {
  animationData?: any;
  autoplay?: boolean;
  loop?: boolean;
  path?: string;
  className?: string;
  fallBack?: ReactNode;
  size?: string | number
}

const LottieView = ({
  animationData,
  autoplay = true,
  loop = true,
  path,
  className,
  fallBack,
  size
}: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default));
  }, []);
  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop,
        autoplay,
        animationData,
        path,
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  if (lottie === null) return <div className={className}>{fallBack}</div>;

  return <div ref={ref} className={className} style={{height: size, width: size}}></div>;
};

export default LottieView;
