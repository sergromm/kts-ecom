import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { toast } from 'sonner';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import styles from './Auth.module.scss';

const MotionInput = motion(Input);

export const SignUp: React.FC = () => {
  const [form, setForm] = React.useState({
    email: 'sergichev@gmail.com',
    password: 'ktsshop',
    confirm: '',
    firstName: '',
    lastName: '',
  });
  const [showNameFields, setShowNameFields] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const body = Object.fromEntries(data.entries());
    console.log(body);
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
      onInvalid={() => toast.error('Ivalid credentials format')}
      onSubmit={handleSubmit}
    >
      <Input
        name="email"
        placeholder="E-mail"
        value={form.password}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, email: value }));
        }}
      />
      <Input
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, password: value }));
        }}
      />
      <Input
        name="confirm"
        placeholder="Confirm password"
        value={form.confirm}
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
      <Button type="submit">Sign up</Button>
    </motion.form>
  );
};
