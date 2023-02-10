import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
const Course = ({ id, name, parts }) => {
  return (
    <>
      <Header course={name}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </>
  );
};

export default Course;
