import conf from "../conf/conf";
import { ID, Databases, Client, Storage, Query } from "appwrite";

export class Service{
    client  = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client); 
        this.bucket = new Storage(this.client);

    }   


    // Posts functions
    async createPost({title, slug, content, featuredImage, status, userID}){
        try{
            return await this.databases.createDocument(
            conf.appwriteDatabaseID, 
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userID,

            }
            )
        }
        catch(error){
            console.log("Create post error", error);
            
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }

            )
        }
        catch(error){
            console.log("Update post error" , error);
        }
    }

    async deletePost(slug){
        try{
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        }
        catch(error){
            console.log("Delete post error" , error);
            return false;        
        }
        
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        }
        catch(error){
            console.log("getPost error" , error);
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){
        try{
         
        return await this.databases.listDocuments(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            queries,

        )
        }
        catch(error){
            console.log("getPosts error" , error);
            return false;
        }
    }

    // Upload functions

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("uploadFile errors", error);
        }
    }

    async deleteFile(fileID){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketID,
            fileID  
        )
        }
        catch(error){
            console.log("deleteFile error" , error);
        }
    }

    // Get file Preview section

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }
}


const service = new Service();
export default service