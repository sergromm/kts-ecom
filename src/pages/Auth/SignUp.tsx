import { AnimatePresence, motion } from 'framer-motion';
import { runInAction } from 'mobx';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { routerPaths } from 'config/routerPaths';
import cartStore from 'store/cart';
import userStore from 'store/user';
import styles from './Auth.module.scss';
const MotionInput = motion(Input);

export const SignUp: React.FC = () => {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    confirm: '',
    firstName: '',
    lastName: '',
  });
  const navigate = useNavigate();
  const [valid, setValid] = React.useState(false);
  const [showNameFields, setShowNameFields] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
      confirm: string;
      firstName: string;
      lastName: string;
    };

    if (data.password !== data.confirm) {
      toast.error('Password mismatch.');
      return;
    }

    if (data.firstName === '') {
      toast.error('First name is required.');
      return;
    }

    const body = {
      email: data.email,
      password: data.password,
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: '',
        cartId: '',
      },
    };

    runInAction(() => {
      body.data.cartId = cartStore.cartId;
      (async () => {
        await userStore.signup(body);
        navigate(routerPaths.profile.root);
      })();
    });
  };

  React.useEffect(() => {
    if (form.email && form.password && form.confirm) {
      setShowNameFields(true);
    }
  }, [form.confirm, form.email, form.password]);
  return (
    <motion.form
      animate={{ opacity: 1 }}
      className={styles.form}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key={'form'}
      transition={{ type: 'tween', duration: 0.4 }}
      onChange={(e) => setValid(e.currentTarget.checkValidity())}
      onInvalid={() => toast.error('Ivalid credentials format')}
      onSubmit={handleSubmit}
    >
      <Input
        name="email"
        placeholder="E-mail"
        type="email"
        value={form.email}
        required
        onChange={(value) => {
          setForm((prev) => ({ ...prev, email: value }));
        }}
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        required
        onChange={(value) => {
          setForm((prev) => ({ ...prev, password: value }));
        }}
      />
      <Input
        name="confirm"
        placeholder="Confirm password"
        type="password"
        value={form.confirm}
        required
        onChange={(value) => {
          setForm((prev) => ({ ...prev, confirm: value }));
        }}
      />
      <AnimatePresence mode="sync">
        {showNameFields && (
          <>
            <MotionInput
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={'firstName'}
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              required
              onChange={(value) => {
                setForm((prev) => ({ ...prev, firstName: value }));
              }}
            />
            <MotionInput
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={'lastName'}
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={(value) => {
                setForm((prev) => ({ ...prev, lastName: value }));
              }}
            />
          </>
        )}
      </AnimatePresence>
      <Button disabled={!valid} type="submit">
        Sign up
      </Button>
    </motion.form>
  );
};
