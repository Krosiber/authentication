import {str,port,cleanEnv} from "envalid"
import "dotenv/config"
export const env = {
    ACCESS_TOKEN_SECRET: 'your-access-token-secret',
    REFRESH_TOKEN_SECRET: 'your-refresh-token-secret',
    PORT: 3000,
};
export default cleanEnv(process.env,{
    MONGODB:str(),
    PORT:port()
})