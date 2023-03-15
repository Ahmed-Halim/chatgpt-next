'use client';
import NewChat from './NewChat';
import { useSession, signOut } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../service/firebase/firebase';
import ChatRow from './ChatRow';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function SideBar() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session]);
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createAt', 'asc')
      )
  );

  return (
    <div className="flex h-full min-h-0 flex-col text-xs">
      <div className="flex h-full w-full flex-1 items-start border-white/20">
        <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
          <NewChat />
          <div className="flex-1 flex-col overflow-y-auto border-b border-white/10">
            {loading ? (
              <div className="animate-pulse text-center text-white">
                <p>Loading..</p>
              </div>
            ) : (
              <>
                {chats?.docs?.map((doc) => {
                  return <ChatRow key={doc?.id} id={doc?.id} />;
                })}
              </>
            )}
          </div>
        </nav>
      </div>
      {session && (
        <div className="mb-2 flex w-full items-center justify-between gap-2 p-2 text-white">
          <Image
            width={32}
            height={32}
            src={session.user?.image!}
            alt="image"
            className=" rounded-full"
          />
          <div>
            <div className="w-40 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-bold">
              {session.user?.email}
            </div>
            <div className="mt-1 text-[9px]">
              Remining Credit:{' '}
              <span className="font-bold text-teal-500">4697</span>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
          >
            <svg
              className="h-6 w-6 flex-shrink-0"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Logout">
                <g>
                  <path d="M20.968,18.448a2.577,2.577,0,0,1-2.73,2.5c-2.153.012-4.306,0-6.459,0a.5.5,0,0,1,0-1c2.2,0,4.4.032,6.6,0,1.107-.016,1.589-.848,1.589-1.838V5.647A1.546,1.546,0,0,0,19,4.175a3.023,3.023,0,0,0-1.061-.095H11.779a.5.5,0,0,1,0-1c2.224,0,4.465-.085,6.687,0a2.567,2.567,0,0,1,2.5,2.67Z"></path>
                  <path d="M3.176,11.663a.455.455,0,0,0-.138.311c0,.015,0,.028-.006.043s0,.027.006.041a.457.457,0,0,0,.138.312l3.669,3.669a.5.5,0,0,0,.707-.707L4.737,12.516H15.479a.5.5,0,0,0,0-1H4.737L7.552,8.7a.5.5,0,0,0-.707-.707Z"></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default SideBar;
