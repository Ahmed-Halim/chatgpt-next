import { DocumentData } from 'firebase/firestore';
import ConvertToMarkdown from '@/components/markdown';

type MessageProps = {
  message: DocumentData;
};

function Message({ message }: MessageProps) {
  const isChatGPT = message.user.name === 'ChatGPT';

  return (
    <div
      className={` w-full  rounded-xl text-gray-800 dark:bg-gray-800 dark:text-gray-100  ${
        isChatGPT && 'bg-neutral-100'
      }`}
    >
      <div className="flex gap-4 p-4 text-base">
        <div className="relative flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-sm text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="avatar"
            src={message.user.avatar}
            className="h-7 w-7 rounded-full"
          />
        </div>

        <div className="flex flex-grow flex-col gap-4">
          <ConvertToMarkdown content={message.text} />
        </div>
      </div>
    </div>
  );
}

export default Message;
