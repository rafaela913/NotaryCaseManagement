import React from 'react';
import { useForm } from 'react-hook-form';

const Form = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="clientName">Client Name:</label>
        <input id="clientName" {...register('clientName')} required />
      </div>
      <div>
        <label htmlFor="contractDate">Contract Date:</label>
        <input id="contractDate" type="date" {...register('contractDate')} required />
      </div>
      <div>
        <label htmlFor="fileName">File Name:</label>
        <input id="fileName" {...register('fileName')} required />
      </div>
      <button type="submit">Generate PDF</button>
    </form>
  );
};

export default Form;
