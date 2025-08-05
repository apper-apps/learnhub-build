import { userService } from "./userService";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(email, password) {
    await delay(300);
    
    const users = await userService.getAll();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    // Don't return password to client
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async signup(email, password, name) {
    await delay(400);
    
    const users = await userService.getAll();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      throw new Error("An account with this email already exists");
    }
    
    const newUser = {
      name,
      email,
      password,
      role: "free",
      is_admin: false,
      created_at: new Date().toISOString(),
      profile: {}
    };
    
    const createdUser = await userService.create(newUser);
    
    // Don't return password to client
    const { password: _, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  },

  async logout() {
    await delay(200);
    return true;
  }
};