
import React from 'react';
import { UserStatus } from '@/lib/userStatus';
import { useOnlineUsers } from '@/contexts/OnlineUsersContext';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CircleCheck, CircleDashed, CircleDot, CircleX, Clock } from 'lucide-react';
import { AvatarWithStatus } from '@/components/ui/avatar-with-status';

interface UserStatusSelectorProps {
  triggerClassName?: string;
}

const UserStatusSelector: React.FC<UserStatusSelectorProps> = ({ triggerClassName }) => {
  const { user } = useAuth();
  const { onlineUsers, updateUserStatus } = useOnlineUsers();
  
  if (!user) return null;
  
  const currentStatus = onlineUsers[user.id] || 'offline';
  
  const statusIcons = {
    online: <CircleDot className="h-4 w-4 text-green-500" />,
    away: <Clock className="h-4 w-4 text-yellow-500" />,
    busy: <CircleX className="h-4 w-4 text-red-500" />,
    invisible: <CircleDashed className="h-4 w-4 text-gray-400" />,
    offline: <CircleDashed className="h-4 w-4 text-gray-400" />
  };
  
  const statusLabels = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    invisible: 'Invisible',
    offline: 'Offline'
  };
  
  const handleStatusChange = (status: UserStatus) => {
    updateUserStatus(status);
  };
  
  // Get initials for avatar fallback
  const getInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>
        <AvatarWithStatus
          src={user.avatarUrl}
          fallback={getInitials()}
          status={currentStatus}
          size="md"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="p-2 font-medium border-b border-border">
          Set your status
        </div>
        <DropdownMenuItem 
          onClick={() => handleStatusChange('online')}
          className="gap-2 cursor-pointer"
        >
          {statusIcons.online} {statusLabels.online}
          {currentStatus === 'online' && <CircleCheck className="ml-auto h-4 w-4 opacity-70" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleStatusChange('away')}
          className="gap-2 cursor-pointer"
        >
          {statusIcons.away} {statusLabels.away}
          {currentStatus === 'away' && <CircleCheck className="ml-auto h-4 w-4 opacity-70" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleStatusChange('busy')}
          className="gap-2 cursor-pointer"
        >
          {statusIcons.busy} {statusLabels.busy}
          {currentStatus === 'busy' && <CircleCheck className="ml-auto h-4 w-4 opacity-70" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleStatusChange('invisible')}
          className="gap-2 cursor-pointer"
        >
          {statusIcons.invisible} {statusLabels.invisible}
          {currentStatus === 'invisible' && <CircleCheck className="ml-auto h-4 w-4 opacity-70" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserStatusSelector;
