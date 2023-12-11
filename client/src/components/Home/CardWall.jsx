function CardWall () {

    const items = [];
    for (let i =1 ; i <=20; i++) {
        items.push('Item ' + i)
    }

    return (
    <div className="flex w-8">
        {items.map((item, index) => (
            <div className="bg-white" key={index}>{item}</div>
        ))}
      </div>
    )
}

export default CardWall;
