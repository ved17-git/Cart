import { queryOptions } from "@tanstack/react-query";
import axios from "axios";



export function getDataInApiCallComponent() {
  return queryOptions({
    queryKey: ["mockApi"],
    queryFn: getData, 
  });
}

const getData = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log(response.data);
    return response.data;
  };

function ApiCall() {



  return <> <div>test</div></>;
}

export default ApiCall;
