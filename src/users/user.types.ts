export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
};

export type ChangeUserRole = {
  id: string;
  newRole: string;
};
