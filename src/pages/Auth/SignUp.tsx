import { motion } from 'framer-motion';
import * as React from 'react';
import { toast } from 'sonner';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import styles from './Auth.module.scss';

export const SignUp: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const body = Object.fromEntries(data.entries());
    console.log(body);
  };

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
      <Input key={'input-1'} placeholder="E-mail" value="" onChange={() => {}} />
      <Input key={'input-2'} placeholder="Password" value="" onChange={() => {}} />
      <Input key={'input-3'} placeholder="Confirm password" value="" onChange={() => {}} />
      <Button key={'submit'}>Sign up</Button>
    </motion.form>
  );
};
