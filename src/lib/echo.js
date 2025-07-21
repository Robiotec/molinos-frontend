import Echo from "laravel-echo";
import {pusherClient} from "@/lib/pusher";

const options = {
  broadcaster: "pusher",
  client: pusherClient,
};

const echo = new Echo(options);

export default echo;