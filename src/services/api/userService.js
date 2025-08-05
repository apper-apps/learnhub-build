import usersData from "@/services/mockData/users.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let users = [...usersData];

export const userService = {
  async getAll() {
    await delay(250);
    return [...users];
  },

  async getById(id) {
    await delay(200);
    const user = users.find(u => u.Id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return { ...user };
  },

  async create(userData) {
    await delay(300);
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.Id)) : 0;
    const newUser = {
      Id: maxId + 1,
      ...userData,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    return { ...newUser };
  },

  async update(id, userData) {
    await delay(250);
    const index = users.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    users[index] = { ...users[index], ...userData, updated_at: new Date().toISOString() };
    return { ...users[index] };
  },

  async delete(id) {
    await delay(200);
    const index = users.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    users.splice(index, 1);
    return true;
  }
};