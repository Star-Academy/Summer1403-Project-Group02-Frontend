export const SUCCESS_MESSAGES_MAP = new Map<
  string,
  { label: string; message: string }
>([
  [
    'Login Successfully',
    { label: 'Login Successful', message: 'You have logged in successfully.' },
  ],
  [
    'Role Removed Successfully',
    { label: 'Role Update', message: 'The role was removed successfully.' },
  ],
  [
    'Role Added Successfully',
    { label: 'Role Update', message: 'The role was added successfully.' },
  ],
  [
    'User Created Successfully',
    {
      label: 'Registration Success',
      message: 'The user was created successfully.',
    },
  ],
  [
    'Password Changed Successfully',
    {
      label: 'Password Update',
      message: 'Your password was changed successfully.',
    },
  ],
  [
    'Logout Successfully',
    { label: 'Logout Success', message: 'You have logged out successfully.' },
  ],
  [
    'Your Profile Info Changed Successfully',
    {
      label: 'Profile Update',
      message: 'Your profile information was updated successfully.',
    },
  ],
  [
    'User Deleted Successfully',
    { label: 'User Deletion', message: 'The user was deleted successfully.' },
  ],
  [
    'User Retrieved Successfully',
    {
      label: 'User Retrieval',
      message: 'User details were retrieved successfully.',
    },
  ],
  [
    'Users Retrieved Successfully',
    {
      label: 'Users Retrieval',
      message: 'All users were retrieved successfully.',
    },
  ],
  [
    'Roles Retrieved Successfully',
    {
      label: 'Roles Retrieval',
      message: 'All roles were retrieved successfully.',
    },
  ],
]);
