export const dummyUsers = [
  {
    id: '1',
    userName: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Organizador',
    picture: 'https://i.pravatar.cc/300?img=1'
  },
  {
    id: '2',
    userName: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Participante',
    picture: 'https://i.pravatar.cc/300?img=5'
  },
  {
    id: '3',
    userName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'Speaker',
    picture: 'https://i.pravatar.cc/300?img=8'
  }
];

// get a random user from the dummy data
export const getRandomUser = () => {
  const randomIndex = Math.floor(Math.random() * dummyUsers.length);
  return dummyUsers[randomIndex];
};

// get a specific user by ID
export const getUserById = (id) => {
  return dummyUsers.find(user => user.id === id) || dummyUsers[0];
};

// default dummy user
export const defaultUser = dummyUsers[0]; 