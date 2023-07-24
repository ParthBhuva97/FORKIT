import React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
const Playarea = () => {
  const constraintsRef = useRef(null);
  const languages = ["JavaScript", "React", "PHP", "Ruby","Node.js","Python","C","C++","C#","Angular"];

  return (
    <div className="w-full flex justify-center rounded-lg h-96 bg-[#A09CDD] bg-opacity-30 py-3">
      <motion.div ref={constraintsRef} className="flex flex-wrap gap-5 w-[90%]">
        {languages.map((language, index) => {
          return (
            <motion.div
              drag
              dragConstraints={constraintsRef}
              className="bg-[#0E101D] text-white w-fit h-fit font-outfit px-5 py-3 rounded-full hover:cursor-pointer"
            >
              {language}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Playarea;
