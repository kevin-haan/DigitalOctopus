import Card from "../components/Home/Card";

function Home() {
    const cards = [
        {id: 1},
        {id: 2},
        {id: 3},
    ]
    return (
        <div className="container">
            <h1 className="text-xl text-center">What do you need today?</h1>
            <div className="flex">
                {cards.map((card) => (
                 <Card key={card.id} data={card}></Card>
          ))}
          </div>
        </div>
    );
}

export default Home;