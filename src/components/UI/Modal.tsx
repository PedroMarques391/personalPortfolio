import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface IModalProps {
    title: string;
    subtitle: string;
    success: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const Modal = ({ title, subtitle, success, children, onClose }: IModalProps): React.JSX.Element => {
    const modalVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`absolute top-10 right-0 md:-right-36 p-5 rounded-md shadow-lg transition-all w-full sm:w-[80%] md:w-[40%] lg:w-[30%] xl:w-[25%] ${success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
            <button
                onClick={onClose}
                className={`absolute top-2 right-2 text-lg ${success ? 'text-green-800' : 'text-red-800'} hover:text-gray-600`}
            >
                <IoClose size={30} />
            </button>

            <h2 className="text-lg font-semibold text-center sm:text-xl">{title}</h2>
            <p className="text-sm sm:text-base mt-2">{subtitle}</p>
            <div className="mt-3">{children}</div>
        </motion.div>
    );
};

export default Modal;
