'use client';

import { getRooms } from '@/api';
import { Button } from '@/components/button/Button';
import { useWebSocket } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
  const [message, setMessage] = useState('');

  const { joinRoom, isConnected, sendMessage, setUsername } = useWebSocket();

  return (
    <div
      className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center
        justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20"
    >
      <main
        className="row-start-2 flex flex-col items-center gap-[32px]
          sm:items-start"
      >
        {!isConnected ? (
          <>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="border-1 border-amber-200"
            />
            {data?.map(({ id, name }) => (
              <Button
                key={id}
                buttonType="click"
                onClick={() => joinRoom(id)}
              >
                {name}
              </Button>
            ))}
          </>
        ) : (
          <>
            <input onChange={(e) => setMessage(e.target.value)} />
            <Button
              buttonType="click"
              onClick={() => sendMessage(message)}
            >
              Send
            </Button>
          </>
        )}
      </main>
      <footer
        className="row-start-3 flex flex-wrap items-center justify-center
          gap-[24px]"
      ></footer>
    </div>
  );
}
