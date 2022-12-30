import { Client, Account } from "appwrite";

const client = new Client();

const account = new Account(client);

client
  .setEndpoint("http://localhost:80/v1") // Your API Endpoint
  .setProject("63ab226ca399822bb845"); // Your project ID

export default account;
