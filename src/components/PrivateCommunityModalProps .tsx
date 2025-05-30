// components/PrivateCommunityModal.tsx
import React from "react";

interface PrivateCommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
    //onRequestAccess: () => void;
}

const PrivateCommunityModal: React.FC<PrivateCommunityModalProps> = ({
    isOpen,
    onClose,
    // onRequestAccess,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-11/12 max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white text-2xl"
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Private Community
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    This community is private. You need to request access to join. Please contact the community administrator for more information.
                </p>
                <div className="flex justify-end gap-3">
                    {/*
                    <button
                        onClick={onRequestAccess}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Request Access
                    </button>
                    */}
                </div>
            </div>
        </div>
    );
};

export default PrivateCommunityModal;
