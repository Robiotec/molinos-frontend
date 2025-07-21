import {getCookie} from "@/lib/cookiesServerSide";
import axios from "@/lib/axios";
import Mills from "@/common/endpoints/Mills";

const fetchAllMills = async () => {
  try {
    const token = getCookie('token');
    const response = await axios(token.value).get(Mills.MILLS_COLLECTION);
    return response.data.data;
  } catch (e) { return null }
}

const MillsService = {
  fetchAllMills,
}

export default MillsService;