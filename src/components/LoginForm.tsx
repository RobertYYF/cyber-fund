import React from 'react'
import {Button} from "@/components/Button";

function LoginForm({ onSubmit }: AuthFormProps) {
  const [formData, setFormData] = React.useState<AuthFormData>({ username: '', password: '' });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form className="mt-10 grid grid-cols-1 gap-y-8" onSubmit={handleSubmit} >
        <div className="flex flex-col">
          <span className="py-2">Username</span>
          <input
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            type="text" name="username" value={formData.username} onChange={handleInputChange} />
        </div>
          <div className="flex flex-col">
          <span className="py-2">Password</span>
          <input
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            type="text" name="password" value={formData.password} onChange={handleInputChange} />
        </div>

        <Button type="submit" variant="solid" color="blue" className="w-full">
          <span>
            Sign in <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
    </form>
  );
}

export default LoginForm;