import { response } from "../utils/response";

export async function handler(){
  return response(200, {
    message: "Go Serverless v4! Your function executed successfully!",
  })
}
