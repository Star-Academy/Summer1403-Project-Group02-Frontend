export const ERROR_MESSAGES_MAP = new Map<
  string,
  { label: string; message: string }
>([
  [
    'Unauthorized',
    {
      label: 'Authentication Error',
      message: 'You are not authorized to perform this action.',
    },
  ],
  [
    'InvalidInput',
    {
      label: 'Input Error',
      message: 'The input provided is invalid. Please check and try again.',
    },
  ],
  [
    'User Not Found',
    { label: 'User Error', message: 'The user was not found in the system.' },
  ],
  [
    'Access Denied',
    {
      label: 'Access Error',
      message: 'You do not have permission to access this resource.',
    },
  ],
  [
    'Wrong Password',
    {
      label: 'Authentication Error',
      message: 'The password you entered is incorrect.',
    },
  ],
  [
    'User Already Exists',
    {
      label: 'Registration Error',
      message: 'The user already exists in the system.',
    },
  ],
  [
    "This User Doesn't Have This Role",
    {
      label: 'Role Error',
      message: 'This user does not have the required role.',
    },
  ],
  [
    'Role Not Found',
    { label: 'Role Error', message: 'The specified role was not found.' },
  ],
  [
    'This Role Is Already Assigned To The User',
    {
      label: 'Role Assignment',
      message: 'This role is already assigned to the user.',
    },
  ],
  [
    'Can Not Delete Yourself',
    { label: 'Deletion Error', message: 'You cannot delete your own account.' },
  ],
]);
