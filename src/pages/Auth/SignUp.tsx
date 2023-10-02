import { Button } from 'components/Button';
import { Input } from 'components/Input';

export const SignUp: React.FC = () => {
  return (
    <>
      <Input placeholder="E-mail" value="" onChange={() => {}} />
      <Input placeholder="Password" value="" onChange={() => {}} />
      <Input placeholder="Confirm password" value="" onChange={() => {}} />
      <Button>Sign up</Button>
    </>
  );
};
