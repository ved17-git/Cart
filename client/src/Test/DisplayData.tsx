import { useQuery } from "@tanstack/react-query";
import {getDataInApiCallComponent} from './ApiCall' 

function DisplayData() {


    const {data}=useQuery(getDataInApiCallComponent())
    console.log(data);
    
  return (
    <>
      <div>DisplayData</div>
    </>
  );
}

export default DisplayData;
