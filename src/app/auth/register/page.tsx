'use client';
import { useMutation } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from 'ui/Button';
import { useForm } from 'react-hook-form';
import FormItem from 'ui/FormItem';
import { mutations, queries } from 'modules/auth/graphql';
import { toast } from 'react-toastify';

type FormData = {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const [createUser, { loading }] = useMutation(mutations.createUser, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
    onCompleted() {
      toast.success('Таны имэйл рүү баталгаажуулах холбоос илгээлээ.');
      return from ? router.push(from) : router.push('/');
    },
    onError(error, clientOptions?) {
      return toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) =>
    createUser({
      variables: { ...data, clientPortalId: process.env.NEXT_PUBLIC_CP_ID },
    })
  );

  return (
    <form onSubmit={onSubmit}>
      <h5 className="text-blue pb-3 text-center">Бүртгүүлэх</h5>
      <FormItem
        label="Нэр"
        placeholder="Нэр"
        errorMsgs={{
          required: 'Заавал оруулана уу',
        }}
        errors={errors}
        {...register('firstName', {
          required: true,
        })}
      />
      <FormItem
        label="Овог"
        placeholder="Овог"
        errorMsgs={{
          required: 'Заавал оруулана уу',
        }}
        errors={errors}
        {...register('lastName', {
          required: true,
        })}
      />
      <FormItem
        label="Имэйл"
        placeholder="example@example.com"
        errorMsgs={{
          required: 'Заавал оруулана уу',
          pattern: 'Зөв имэйл оруулана уу',
        }}
        errors={errors}
        {...register('email', {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
      />
      <FormItem
        label="Утас"
        placeholder="Утасны дугаар"
        errorMsgs={{
          required: 'Заавал оруулана уу',
          pattern: 'Зөв утасны дугаар оруулана уу',
        }}
        errors={errors}
        {...register('phone', {
          required: true,
          pattern: /\d{8}/,
        })}
      />
      <FormItem
        label="Нууц үг"
        placeholder="Нууц үг"
        type="password"
        labelClassName="mt-2"
        errorMsgs={{
          required: 'Заавал оруулана уу',
          pattern:
            'Дор хаяж нэг тоо, нэг том жижиг үсэг, дор хаяж 8 ба түүнээс дээш тэмдэгт агуулсан байх ёстой',
        }}
        errors={errors}
        {...register('password', {
          required: true,
        })}
      />

      <Button className="p-3 mt-3" type="submit" loading={loading}>
        Бүртгүүлэх
      </Button>

      <small className="text-center py-3 block text-blue">Эсвэл</small>

      <Button
        variant="slim"
        className="p-3"
        Component={Link}
        href="/auth/login"
      >
        Нэвтрэх
      </Button>
    </form>
  );
};

export default Signup;
