'use client';

import { PlusIcon } from '@heroicons/react/24/solid';
import { db } from '../../service/firebase/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { openState } from '@/recoil/atom/AtomSlideOver';

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();
  const openStateChange = useSetRecoilState(openState);

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats'),
      {
        message: [],
        userId: session?.user?.email!,
        createAt: serverTimestamp()
      }
    );
    openStateChange(false);
    router.push(`/chat/${doc.id}`);
  };

  return (
    <a
      onClick={createNewChat}
      className="mb-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md bg-teal-500 py-2 px-3 text-xs text-white transition-colors duration-200 hover:bg-teal-600"
    >
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </a>
  );
}

export default NewChat;
