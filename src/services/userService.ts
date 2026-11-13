import type {User} from '../types/user';

export async function getUsers(): Promise<User[]> {
  const response = await fetch('data/users.json');
  if (!response.ok) {
    throw new Error('Não foi possível buscar os usuários');
  }
  const users: User[] = await response.json();
  return users;
}


export async function getUserById(id: number): Promise<User | undefined> {
  const users = await getUsers();
  const user = users.find((user) => user.id === id);
  return user;
}

export async function editUserById<K extends keyof User>(
  id: number,
  field: K,
  value: User[K]): Promise<User> {
  const user = await getUserById(id);

  const updatedUser = {
    ...user,
    [field]: value,
  } as User;

  return updatedUser;

}

 
