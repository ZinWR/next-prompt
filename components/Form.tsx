import { FC } from 'react';

interface FormProps {
  type: string;
  post: { prompt: string; tag: string; };
  setPost: () => void;
  submiting: boolean;
  handleSubmit: () => void;
};

const Form: FC<FormProps> = ({
  type,
  post,
  setPost,
  submiting,
  handleSubmit
}) => {
  return (
    <div>Form</div>
  );
};

export default Form;