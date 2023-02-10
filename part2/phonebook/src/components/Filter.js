const Filter = ({ filterByName }) => {
  return (
    <>
      <form action="">
        <div>
          filter shown with
          <input type="text" onChange={filterByName} />
        </div>
      </form>
      ;
    </>
  );
};
export default Filter;
