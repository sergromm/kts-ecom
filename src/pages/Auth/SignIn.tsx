import { motion } from 'framer-motion';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { routerPaths } from 'config/routerPaths';
import userStore, { AuthBody } from 'store/user';
import styles from './Auth.module.scss';

export const SignIn: React.FC = () => {
  const [form, setForm] = React.useState({ email: 'sergichev@gmail.com', password: 'ktsshop' });
  const [valid, setValid] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.checkValidity();

    const data = new FormData(e.currentTarget as HTMLFormElement);
    const body = Object.fromEntries(data.entries()) as AuthBody;
    localStorage.removeItem('cartId');
    await userStore.signin(body);
    navigate(routerPaths.profile.root);
  };

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
        key={'input-1'}
        name="email"
        placeholder="E-mail"
        type="email"
        value={form.email}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, email: value }));
        }}
      />
      <Input
        key={'input-2'}
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        formNoValidate
        onChange={(value) => {
          setForm((prev) => ({ ...prev, password: value }));
        }}
      />
      <Button disabled={!valid} type="submit">
        Sign in
      </Button>
    </motion.form>
  );
};
