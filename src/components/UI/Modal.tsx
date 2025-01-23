import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface IModalProps {
    title: string;
    subtitle: string;
    success: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const Modal = ({ title, subtitle, success, children, onClose }: IModalProps): React.JSX.Element => {

    return (
        <AnimatePresence>
            <motion.div
                key="modal"
                initial={{ opacity: 0, x: 500 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 500 }}
                transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 30,
                    duration: 0.6,
                }}
                className={`fixed bottom-0 flex flex-col justify-center items-center md:top-24 md:right-5 right-0 h-[30%] md:h-[19%] z-50 rounded-md shadow-lg w-full md:w-[50%] lg:w-[40%] xl:w-[30%] ${success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-2 right-2 text-lg ${success ? 'text-green-800' : 'text-red-800'} hover:text-gray-600`}
                >
                    <IoClose size={30} />
                </button>

                <h2 className="text-lg font-semibold text-center sm:text-xl">{title}</h2>
                <p className="px-5 text-sm text-center mt-2 md:mt-1">{subtitle}</p>
                <div className="px-5 mt-3 md:mt-1 text-center">{children}</div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Modal;
