import redis from "redis";
import { promisify } from "util";

const client = redis.createClient();

client.on("error", console.error);

export default client;
export const getAsync = promisify(client.get).bind(client);
export const set = client.set.bind(client);