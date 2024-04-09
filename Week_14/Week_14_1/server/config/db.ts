let LOCAL = false

let HostName, URI;

if(LOCAL){
    URI = "mongodb://localhost/contacts";
    HostName = "localhost"
}else{
    URI = "mongodb+srv://ramiyan2185:ravi1967@cluster0.lwt5o6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    HostName = "MongoDB Atlas"
}

export { HostName, URI }
export const SessionSecret = "INFT2202SessionSecret";