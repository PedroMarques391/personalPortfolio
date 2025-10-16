import { motion } from "motion/react";

const ProjectsNotFound = (): React.JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-10 text-gray-400 w-full h-72 gap-5 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4"
    >
      <motion.span
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
        className="text-lg md:text-xl font-medium text-gray-500 "
      >
        Nada por aqui
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="text-gray-400"
      >
        Novos projetos surgem com o tempo
      </motion.p>

      <motion.button
        onClick={() => window.location.reload()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.85 }}
        className="uppercase bg-gray-light rounded-md w-fit border border-transparent text-gray-dark p-2 transition duration-300"
      >
        reflesh
      </motion.button>
    </motion.div>
  );
};

export default ProjectsNotFound;
