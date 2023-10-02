import { Button } from 'components/Button';
import { Input } from 'components/Input';

export const SignIn: React.FC = () => {
  return (
    <>
      <Input placeholder="E-mail" value="" onChange={() => {}} />
      <Input placeholder="Password" value="" onChange={() => {}} />
      <Button>Sign in</Button>
    </>
  );
};
