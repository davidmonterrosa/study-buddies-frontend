import React, { useEffect, useState } from 'react'
import { getEventsByCommunityId, deleteCommunityEvent, getToken, getLoggedInUserData, currentUser, getCommunityById } from '@/utils/Services/DataServices';
import { Event } from '@/utils/Interfaces/UserInterfaces';
import { Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { toast } from 'sonner';

interface SessionsComponentProps {
  communityId: number;
  newSession?: Event;
  fetchAfterCreate?: boolean;
}

const SessionsComponent = ({ communityId, newSession, fetchAfterCreate }: SessionsComponentProps) => {
  const [sessions, setSessions] = useState<Event[]>([]);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [communityOwnerId, setCommunityOwnerId] = useState<number | null>(null);

  const fetchSessions = async () => {
    const result = await getEventsByCommunityId(communityId);
    setSessions(result);
  };

  useEffect(() => {
    fetchSessions();
  }, [communityId]);

  useEffect(() => {
    if (newSession && fetchAfterCreate) {
      fetchSessions();
    } else if (newSession) {
      setSessions((prev) => [newSession, ...prev]);
    }
  }, [newSession, fetchAfterCreate]);

  useEffect(() => {
    const fetchUserAndCommunity = async () => {
      const userData = await getLoggedInUserData(currentUser());
      if (userData && userData.user) setUserId(userData.user.id);
      const communityData = await getCommunityById(communityId);
      if (communityData && communityData.community) setCommunityOwnerId(communityData.community.communityOwnerID);
      else if (communityData && communityData.id) setCommunityOwnerId(communityData.communityOwnerID);
    };
    fetchUserAndCommunity();
  }, [communityId]);

  const handleDeleteSession = async (session: Event) => {
    const result = await deleteCommunityEvent(session.communityId, session.id, getToken());
    if (result.Success || result.success) {
      toast.success('Session deleted', { description: 'The session was deleted successfully.' });
      fetchSessions();
    } else {
      toast.error('Error', { description: result.Message || result.message || 'Failed to delete session.' });
    }
    setPendingDeleteId(null);
  };

  const getValidUrl = (url: string) =>
    url && !/^https?:\/\//i.test(url) ? `https://${url}` : url;

  // Helper to format date and time in 12-hour format with AM/PM
  const formatSessionTime = (session: Event) => {
    const dateObj = new Date(session.eventDate);
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${mm}/${dd}/${yyyy} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <section className="flex flex-col overflow-hidden mt-4">
      <div className="flex-1 md:px-4 overflow-y-auto space-y-3">
        {Array.isArray(sessions) && sessions.length === 0 && (
          <div className="text-center text-gray-500">No sessions yet.</div>
        )}
        {Array.isArray(sessions) ? (
          sessions.map((session) => (
            <div className="flex items-start gap-2" key={session.id}>
              <div className="bg-linear-to-b from-[#473FCB]  text-white to-[#231E6D] dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] px-3 py-3 rounded-lg w-full text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col space-x-2">
                    <p className="font-semibold text-[18px]">{session.eventName}</p>
                    <p className="font-semibold text-sm">{formatSessionTime(session)}</p>
                  </div>
                  <a
                    href={getValidUrl(session.eventUrl) || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto"
                  >
                    <button
                      className="bg-[#818CF8] hover:from-[#7e6ae6] hover:to-[#6F58DA] hover:brightness-110 font-bold cursor-pointer rounded-[10px] px-3 py-1 flex items-center justify-center"
                      disabled={!session.eventUrl}
                      title={session.eventUrl ? 'Join Session' : 'No link provided'}
                    >
                      Join
                    </button>
                  </a>
                  {/* Only show delete if user is owner */}
                  {(userId && communityOwnerId && userId === communityOwnerId) && (
                    <>
                      <button
                        className="ml-2 p-1 rounded hover:bg-red-100 dark:hover:bg-[#3D3179]"
                        onClick={() => setPendingDeleteId(session.id)}
                        title="Delete Session"
                      >
                        <Trash className="text-red-500" size={20} />
                      </button>
                      {pendingDeleteId === session.id && (
                        <AlertDialog open={true}>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-bold text-red-500">Are you sure you want to delete this session?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setPendingDeleteId(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteSession(session)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-red-500">Error loading sessions.</div>
        )}
      </div>
    </section>
  )
}

export default SessionsComponent