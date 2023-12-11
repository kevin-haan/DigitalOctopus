function Card({ data }) {
  return (
    <div className="card w-80 h-40 m-3 bg-gray-300 shadow-xl rounded-lg">
      {data.id}
    </div>
  );
}

export default Card;
