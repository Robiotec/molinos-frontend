import {useContext} from "react";
import CurrentsContext from "@/modules/mills/context/CurrentsProvider";

const useCurrents = () => {
  return useContext(CurrentsContext);
}

export default useCurrents;