
import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite";


export class AuthServices {
    Client = new Client();
    account;
    
    constructor(){
        this.Client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.Client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                return this.login({email, password})
            }
        } catch (error) {
            return {
                status: false,
                error: error.message
            };
        }
    }

    async login(email, password){
        try {
            const session = await this.account.createEmailSession(email, password);
            return session;
        } catch (error) {
            return {
                status: false,
                error: error.message
            };
        }
    }
       
 async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null; 
    }
}

 async logout(){
    try{
        return await this.account.deleteSessions();
    }
    catch(error){
        console.error("Error in logout user:", error);
        throw error;
    }
 }

}

 

const authServices = new AuthServices

export default authServices;