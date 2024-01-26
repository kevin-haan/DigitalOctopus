import Card from "../../components/Home/Card";
import ContentBlock from "../../components/common/ContentBlock";

function Home() {
  const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];
  return (
    <div className="">
      {/* h-[calc(100vh-5rem)] */}
      <ContentBlock className="w-screen h-screen">
        <div className="grid grid-cols-2 gap-3 m-auto w-full h-full">
          <div className=" h-full flex">
            <h1 className="text-6xl m-auto text-left mt">
              <div className="font-bold w-full mb-5 bg-gradient-to-r from-purple-600 to-orange-400 inline-block text-transparent bg-clip-text">
                Your App
              </div>
              <div className="">in Minutes</div>
            </h1>
          </div>
          <div className="bg-designer flex">
            <div className="mx-auto my-auto "></div>
          </div>
        </div>
      </ContentBlock>
      <ContentBlock className="h-96">
        <div className="grid grid-cols-3 h-full gap-20 sm:mx-40 sm:my-40">
          <div className="shadow-xl rounded-xl p-5 w-full h-full m-auto">
            hallo
          </div>
          <div className="shadow-xl rounded-xl p-5 w-full h-full m-auto">
            hallo
          </div>
          <div className="shadow-xl rounded-xl p-5 w-full h-full m-auto">
            hallo
          </div>
        </div>
      </ContentBlock>
      <ContentBlock className="bg-white"></ContentBlock>
    </div>
  );
}

export default Home;
