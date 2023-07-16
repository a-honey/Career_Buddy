const { ProjectModel }=require("../schemas/project");



class Project {

  //CRUD:create
  //create and return new project document in database
  //새로운 project 정보를 추가하고 반환한다.
    static async create({ newProject }) {
      const createdNewProject = await ProjectModel.create(newProject);
      return createdNewProject;
    }
  
  //CRUD:READ
  //find and return new document that has corresponding project_title
  //project_title을 이용해서 상응하는 document를 찾고 반환한다.
    static async findByTitle({ project_title }) {
      const project_document = await ProjectModel.findOne({ title: project_title });//this one looks for title everywhere
      return project_document;
    }
  //CRUD:READ
  //find and return new document of corresponding project_organization
  //project_organization을 이용해서 상응하는 document를 찾고 반환한다.
    static async findByOrgnaization({ project_organization }) {
      const project_document = await ProjectModel.findOne({ organization: project_organization }); // this one gonna look for p_o in the field of organization
      return project_document;
    }

  // CRUD: READ
  // find corresponding Project doucment using userId
  // document의 userId로 해당 Project document를 찾아주는 기능을 구현합니다.
  static async findProjectByUserId({user_Id}){
    const project_document= await ProjectModel.findOne({userId:user_Id});
    return project_document;
  }
  

  //CRUD:READ
  // find and return all documents of ProjectModel
  // 전체 dcoument를 찾고 반환한다.
    static async findAll() {
      const users = await ProjectModel.find({});
      return users;
    }
  
  //CRUD:UPDATE  
  //find document you want to update with project_title
  //and update it with new data inserted from frontend
  //project_title을 이용해 원하는 document를 찾고
  //frontend로부터 입력받은 새로운 데이터로 갱신한다.
    static async update({ project_title}, {updateobject }) {
      const filter = { title: project_title };
      const update = {$set:updateobject};//이것자체가 object
      const option = { returnOriginal: false };
  //returnOriginal option to false, 
  //the method will return the updated document 
  //after the modification is applied
      const updatedProject = await ProjectModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedProject;
    }

// CRUD: DELETE
  // delete project document of corresponding title
  // Project 정보를 삭제하는 기능을 구현합니다.
  static async delete({ project_title }) {
    return ProjectModel.findOneAndDelete({ title:project_title});
  }

  }




module.exports =  Project ;