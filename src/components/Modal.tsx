import React from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    success: boolean;
    imageUrl?: string;
    blockExplorerLink?: string;
    errorMessage?: string;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 shadow-lg">
        {content.success ? (
          <>
            <h2 className="text-lg flex items-center justify-center font-bold text-[#AF3BC9]">
              Transaction Successful!
            </h2>
            {content.imageUrl && (
              <div className="flex items-center justify-center">
                <Image
                  src={content.imageUrl}
                  alt="Success"
                  className="my-3 flex items-center justify-center"
                  width={150}
                  height={150}
                />
              </div>
            )}
            <p className="flex items-center justify-center">
              View your transaction on the block explorer:{" "}
              <a
                href={content.blockExplorerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Transaction
              </a>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg text-[#AF3BC9] flex items-center justify-center font-bold">
              Transaction Failed
            </h2>
            <p>{content.errorMessage}</p>
          </>
        )}
        <div className="flex items-center justify-center">
          <button
            onClick={onClose}
            className="mt-4 bg-[#AF3BC9] text-white rounded-md px-4 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
