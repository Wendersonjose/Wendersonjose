// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
  theme,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full backdrop-blur-sm">
      <motion.div
        className={`relative max-w-2xl w-full max-h-[90vh] overflow-hidden border shadow-sm rounded-2xl ${
          theme === "dark"
            ? "bg-gradient-to-l from-midnight to-navy border-white/10"
            : "bg-gradient-to-l from-gray-200 to-white border-gray-300"
        }`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Botão de Fechar */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Imagem do Projeto */}
        <img src={image} alt={title} className="w-full rounded-t-2xl" />

        {/* Conteúdo com scroll */}
        <div className="p-5 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
          <h5 className="mb-2 text-2xl font-bold">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>

          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-3 font-normal text-neutral-400">
              {subDesc}
            </p>
          ))}

          <div className="flex items-center justify-between mt-4">
            {/* Tags */}
            <div className="flex gap-3">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="p-1 rounded-full bg-white/10 hover:bg-black/30 transition duration-300"
                  title={tag.name}
                >
                  <img src={tag.path} alt={tag.name} className="size-10" />
                </div>
              ))}
            </div>

            {/* Link para o Projeto */}
            <a
              href={href?.frontend || href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation"
            >
              Ver Projeto
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
