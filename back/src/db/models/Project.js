import { ProjectModel } from "../schemas/project";

class Project {
    static async create({ newProject }) {
      const createdNewProject = await ProjectModel.create(newProject);
      return createdNewProject;
    }
  
    static async findByTitle({ project_title }) {
      const project = await ProjectModel.findOne({ title: project_title });//this one looks for title everywhere
      return project;
    }
  
    static async findByOrgnaization({ project_organization }) {
      const project = await ProjectModel.findOne({ organization: project_organization }); // this one gonna look for p_o in the field of organization
      return project;
    }
  
    static async findAll() {
      const users = await ProjectModel.find({});
      return users;
    }
  
    static async update({ project_title, fieldToUpdate, newValue }) {
      const filter = { title: project_title };
      const update = { [fieldToUpdate]: newValue };
      const option = { returnOriginal: false };
  
      const updatedProject = await ProjectModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedProject;
    }
  }




export {ProjectModel};