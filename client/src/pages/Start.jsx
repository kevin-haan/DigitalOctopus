import Card from "../components/Home/Card";

function Home() {
  const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 w-full">
      <div className="mt-60 flex flex-col">
        <h1 className="text-6xl text-center text-white">Welcome!</h1>
        <div className="flex mx-auto">
          {/* {cards.map((card) => (
            <Card key={card.id} data={card}></Card>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
