

import clsx from 'clsx';
import Check from 'icons/Check';
import { usePathname } from 'next/navigation';

function OrderSteps() {
  const steps = {
    cart: 'Taны сагс',
    address: 'Хүргэлтийн Хаяг',
    payment: 'Төлбөр төлөх',
    end: 'Дуусгах',
  };
  const pathname = usePathname();

  const current = pathname?.replace('/checkout/', '') || '';

  const keys = Object.keys(steps);

  return (
    <>
      <div className="flex justify-between items-center order-steps container c-md pt-4 pb-3">
        {keys.map((step, idx) => (
          <div
            className={clsx(
              'order-steps-step text-center block',
              {
                checked: idx < keys.indexOf(current),
              },
              {
                current: step === current,
              }
            )}
            key={idx}
          >
            <div className="px-2">
              <div className="flex items-center justify-center circle">
                <p className="sbt">{idx + 1}</p>
                <Check />
              </div>
            </div>
            <small className="mt-1 block text-mid-gray">
              {steps[step as keyof typeof steps]}
            </small>
          </div>
        ))}
      </div>
      <h6 className=" row">
        <b className="col-8 p-3">{steps[current as keyof typeof steps]}</b>
        <b className="col-4 p-3">Хураангуй</b>
      </h6>
    </>
  );
}

export default OrderSteps;
