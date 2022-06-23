import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function NodeAddition(props: any) {
  const currState = useSelector((state: any) => state);
  // const onNodeSubmit = (e: any) => {
  //   e.preventDefault();
  //   const submitData = {
  //     title: e.target[0].value,
  //     content: e.target[1].value,
  //   };
  //   console.log(submitData);
  //   axios
  //     .post(`http://localhost:8000/api/timeline_events/create/`, submitData)
  //     .then(() => {
  //       console.log("done");
  //     });
  // };
  useEffect(() => {
    console.log(currState);
  }, []);
  return (
    <div>
      {/* <div>
  <form onSubmit={onNodeSubmit}>
    <input name="title"></input>
    <input name="content"></input>
    <input type="submit" value="Submit"></input>
  </form>
</div> */}
      <div>node addition</div>
    </div>
  );
}
