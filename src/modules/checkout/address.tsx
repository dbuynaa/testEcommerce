import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCurrentUser, useCurrentOrder } from 'modules/appContext';
import Form from 'ui/Form';
import FormItem from 'ui/FormItem';
import Map from 'components/checkout/address/map';

import Button from 'ui/Button';
import Ebarimt from 'modules/checkout/Ebarimt';
import type { AddressFormData } from 'modules/types';
import useHandleOrder from 'lib/useHandleOrder';

const AddressContainer = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { currentOrder, loadingCurrentOrder } = useCurrentOrder();
  const onCompleted = (data: any) =>
    router.push(`/profile/orders/${data?._id}`);
  const { handleOrder, loading } = useHandleOrder(onCompleted);
  const [latLong, setLatLong] = useState<any>();

  useEffect(() => {
    if (currentOrder) {
      setLatLong((currentOrder.deliveryInfo || {}).marker);
    }
  }, [currentOrder]);

  if (loadingCurrentOrder) return null;

  const { deliveryInfo, registerNumber } = currentOrder || {};

  const { firstName, lastName, phone, email, description, marker, ...rest } =
    (deliveryInfo || {}) as AddressFormData & {
      description: string;
      marker: {
        lat: string;
        lng: string;
      };
    };

  const formArgs = {
    defaultValues: {
      ...rest,
      firstName: firstName || currentUser?.firstName,
      lastName: lastName || currentUser?.lastName,
      phone: phone || currentUser?.phone,
      email: email || currentUser?.email,
      registerNumber: registerNumber || currentUser?.companyRegistrationNumber,
    },
  };

  const onSubmit = (data: AddressFormData) => {
    const { registerNumber, ...rest } = data;
    return handleOrder({
      registerNumber: registerNumber,
      deliveryInfo: {
        ...rest,
        marker: latLong,
        description: `Аймаг/Хот: ${data.province},  Сум/Дүүрэг: ${data.district}, Баг/Хороо: ${data.street}, Дэлгэрэнгүй: ${data.details} `,
      },
    });
  };

  return (
    <Form args={formArgs} handleSubmit={onSubmit}>
      <div className="row px-3 order-address">
        <div className="col-md-6 col-12 px-2">
          <FormItem
            label="Захиалагчийн нэр"
            placeholder="Бат-эрдэнэ"
            name="firstName"
          />
        </div>
        <div className="col-md-6 col-12 px-2">
          <FormItem
            label="Захиалагчийн Овог"
            placeholder="Хашбат"
            name="lastName"
          />
        </div>
        <div className="col-md-6 col-12 px-2">
          <FormItem
            label="Захиалагчийн утасны дугаар"
            placeholder="99999999"
            name="phone"
          />
        </div>
        <div className="col-md-6 col-12 px-2">
          <FormItem
            label="Захиалагчийн и-мэйл хаяг"
            placeholder="example@example.com"
            name="email"
          />
        </div>
        <Ebarimt />
        <div className="col-md-4 col-12 px-2">
          <FormItem
            label="Хот/Aймаг"
            placeholder="Улаанбаатар"
            name="province"
          />
        </div>
        <div className="col-md-4 col-12 px-2">
          <FormItem label="Дүүрэг/сум" placeholder="Баянгол" name="district" />
        </div>
        <div className="col-md-4 col-12 px-2">
          <FormItem label="Хороо/баг" placeholder="6-хороо" name="street" />
        </div>
        <div className="col-12 px-2">
          <FormItem
            label="Дэлгэрэнгүй хаяг"
            placeholder="Алтан өргөө цогцолбор, Наран ундраа төв"
            element="textarea"
            name="details"
          />
        </div>
        <div className="form-item col-12">
          <label className="ps-3 block">Газрын зураг</label>
          <Map latLong={latLong} setLatLong={setLatLong} />
        </div>
      </div>
    </Form>
  );
};

export default AddressContainer;
