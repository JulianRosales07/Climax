import { userService } from '../services/userService';

const initializeAdminUser = async () => {
  try {
    const adminUser = {
      employeeId: '1193051330',
      name: 'Administrador',
      email: 'admin@climax.com',
      role: 'admin' as const,
      active: true,
    };

    // Check if admin already exists
    const users = await userService.getAll();
    const existingAdmin = users.find(u => u.employeeId === adminUser.employeeId);

    if (!existingAdmin) {
      await userService.add(adminUser);
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
};

export { initializeAdminUser };