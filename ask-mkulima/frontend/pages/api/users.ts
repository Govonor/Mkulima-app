import type { NextApiRequest, NextApiResponse } from 'next';

// User data structure with admin support
interface User {
  id: number;
  username: string;
  email: string;
  password: string; // In a real application, hash this
  role: 'farmer' | 'business' | 'admin'; // Added 'admin' role
}

// Mocked database of users, including an admin user
const users: User[] = [
  {
    id: 1,
    username: 'farmer1',
    email: 'farmer1@example.com',
    password: 'password123', // Remember to hash passwords in a real app
    role: 'farmer',
  },
  {
    id: 2,
    username: 'business1',
    email: 'business1@example.com',
    password: 'password123',
    role: 'business',
  },
  {
    id: 3,
    username: 'admin1',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, use hashed password
    role: 'admin',
  },
];

// Function to simulate user authentication
const authenticateUser = (email: string, password: string): User | null => {
  return users.find(
    (user) => user.email === email && user.password === password
  ) || null;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, action } = req.body; // action: 'register' or 'login'

    if (action === 'login') {
      const user = authenticateUser(email, password);
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else if (action === 'register') {
      const { username, role } = req.body;

      // Only allow admins to register new admins if needed
      if (role === 'admin') {
        const currentUser = authenticateUser(email, password);
        if (currentUser && currentUser.role === 'admin') {
          const existingUser = users.find((user) => user.email === email);
          if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
          } else {
            const newUser: User = {
              id: users.length + 1,
              username,
              email,
              password,
              role,
            };
            users.push(newUser);
            res.status(201).json({ message: 'Admin registered successfully', user: newUser });
          }
        } else {
          res.status(403).json({ message: 'Only admins can register new admins' });
        }
      } else {
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
          res.status(400).json({ message: 'User already exists' });
        } else {
          const newUser: User = {
            id: users.length + 1,
            username,
            email,
            password,
            role,
          };
          users.push(newUser);
          res.status(201).json({ message: 'Registration successful', user: newUser });
        }
      }
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
