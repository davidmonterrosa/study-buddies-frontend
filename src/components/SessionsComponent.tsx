import React, { useEffect, useState } from 'react'
import { getEventsByCommunityId } from '@/utils/Services/DataServices';
import { Event } from '@/utils/Interfaces/UserInterfaces';

interface SessionsComponentProps {
  communityId: number;
  newSession?: Event;
  fetchAfterCreate?: boolean;
}

const SessionsComponent = ({ communityId, newSession, fetchAfterCreate }: SessionsComponentProps) => {
  const [sessions, setSessions] = useState<Event[]>([]);

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

  const getValidUrl = (url: string) =>
    url && !/^https?:\/\//i.test(url) ? `https://${url}` : url;

  return (
    <section className="flex flex-col overflow-hidden mt-4">
      <div className="flex-1 md:px-4 overflow-y-auto space-y-3">
        {sessions.length === 0 && (
          <div className="text-center text-gray-500">No sessions yet.</div>
        )}
        {sessions.map((session) => (
          <div className="flex items-start gap-2" key={session.id}>
            <div className="bg-linear-to-b from-[#473FCB] text-white to-[#231E6D] dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] px-3 py-3 rounded-lg w-full text-sm">
              <div className="flex items-center gap-2">
                <div className="flex flex-col space-x-2">
                  <p className="font-semibold text-[18px]">{session.eventName}</p>
                  <p className="font-semibold text-sm">{session.eventDate}</p>
                  <p className="text-xs text-gray-200 mt-1">
                    Created by: {session.eventOrganizers && session.eventOrganizers.length > 0
                      ? `${session.eventOrganizers[0].firstName || ''} ${session.eventOrganizers[0].lastName || ''}`.trim() || 'Unknown'
                      : 'Unknown'}
                  </p>
                </div>
                <a
                  href={getValidUrl(session.eventUrl) || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto"
                >
                  <button
                    className="bg-[#818CF8] cursor-pointer rounded-[10px] px-3 py-1 flex items-center justify-center"
                    disabled={!session.eventUrl}
                    title={session.eventUrl ? 'Join Session' : 'No link provided'}
                  >
                    Join
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SessionsComponent