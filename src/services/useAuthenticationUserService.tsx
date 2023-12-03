import { useMutation } from "@tanstack/react-query";
import api from "./api";
import axios from "axios";


//https://developers.google.com/youtube/v3/guides/auth/installed-apps?hl=pt-br 
//referencia
export async function authenticationUser() {
  await axios.get("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.channel-memberships.creator&client_id:129472962547-kiqeddbdh2kb7knnf39qfmejo2k1hlab.apps.googleusercontent.com&redirect_uri=kiqeddbdh2kb7knnf39qfmejo2k1hlab.apps.googleusercontent.com.129472962547:/oauth2redirect")
}

