import { Client, Account } from "appwrite";

const client = new Client();

const account = new Account(client);

client
  .setEndpoint("http://143.110.180.23/v1") // Your API Endpoint
  .setProject("63b13d2f62aea3711e06"); // Your project ID

export default account;
