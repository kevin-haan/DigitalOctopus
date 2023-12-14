function Card({ data }) {
  return (
    <div className="glowing-outline card w-80 h-80 m-3 shadow-xl rounded-lg flex">
      <div className="m-auto">{data.id}</div>
    </div>
  );
}

export default Card;
