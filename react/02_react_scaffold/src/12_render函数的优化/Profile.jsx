import { memo } from "react";
// memo是高阶组件，接收一个组件，返回一个新组件

const Profile = memo(function Profile(props) {
  console.log("函数式组件");
  return <div>{props.message}</div>;
});

export default Profile;
