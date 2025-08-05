import programsData from "@/services/mockData/programs.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let programs = [...programsData];

export const programService = {
  async getAll() {
    await delay(300);
    return [...programs];
  },

  async getById(id) {
    await delay(200);
    const program = programs.find(p => p.Id === id);
    if (!program) {
      throw new Error("Program not found");
    }
    return { ...program };
  },

  async getBySlug(slug) {
    await delay(200);
    const program = programs.find(p => p.slug === slug);
    if (!program) {
      throw new Error("Program not found");
    }
    return { ...program };
  },

  async create(programData) {
    await delay(400);
    const maxId = programs.length > 0 ? Math.max(...programs.map(p => p.Id)) : 0;
    const newProgram = {
      Id: maxId + 1,
      ...programData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    programs.push(newProgram);
    return { ...newProgram };
  },

  async update(id, programData) {
    await delay(300);
    const index = programs.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Program not found");
    }
    programs[index] = { 
      ...programs[index], 
      ...programData, 
      updated_at: new Date().toISOString() 
    };
    return { ...programs[index] };
  },

  async delete(id) {
    await delay(250);
    const index = programs.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Program not found");
    }
    programs.splice(index, 1);
    return true;
  }
};