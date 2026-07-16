import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

const Flashcard = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  
  useEffect(() => {
    setFlipped(false);
  }, [card]);

  return (
    <div className="mt-10">

      <div
        className="relative w-full h-80 cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped(!flipped)}
      >

        <div
          className="relative w-full h-full duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >

          
          <div
            className="absolute w-full h-full bg-white rounded-3xl shadow-xl border flex flex-col justify-center items-center px-10"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="absolute top-6 right-6 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
              QUESTION
            </span>

            <h2 className="text-3xl font-bold text-center text-slate-800">
              {card.question}
            </h2>

            <p className="mt-8 text-slate-400 flex items-center gap-2">
              <RotateCcw size={18} />
              Click to Flip
            </p>
          </div>

          
          <div
            className="absolute w-full h-full bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl text-white flex flex-col justify-center items-center px-10"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <span className="absolute top-6 right-6 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
              ANSWER
            </span>

            <h2 className="text-2xl font-bold text-center">
              {card.answer}
            </h2>

            <p className="mt-8 opacity-80 flex items-center gap-2">
              <RotateCcw size={18} />
              Click to Flip Back
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Flashcard;