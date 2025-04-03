"use client";
import { Drawer } from "flowbite-react";

interface NotificationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsSidebar: React.FC<NotificationsSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer open={isOpen} onClose={onClose} position="right">
      {/* Notifications content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p>No new notifications</p>
      </div>
    </Drawer>
  );
};

export default NotificationsSidebar;
