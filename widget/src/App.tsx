import React from "react";
import ReactMarkdown from "react-markdown";
import useQueryParams from "./hooks/useQueryParams";
import { ModeSwitcher } from "./components/ModeSwitcher";
// import useChatId from "./hooks/useChatId";
import { useForm } from "@mantine/form";

type Message = {
  isBot: boolean;
  message: string;
};

// human and bot
type History = [string, string][];

function App() {
  const divRef = React.useRef<HTMLDivElement>(null);
  // const chatid = useChatId();

  const params = useQueryParams();

  const form = useForm({
    initialValues: {
      message: "",
      isBot: false,
    },
  });

  React.useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const [messages, setMessages] = React.useState<Message[]>([
    {
      isBot: true,
      message: "Hi, I'm here to help. What can I do for you today?",
    },
  ]);

  const [history, setHistory] = React.useState<History>([]);

  return (
    <ModeSwitcher mode={params?.mode}>
      <div className="relative flex">
        <div
          className="grow flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out"
          style={{
            height: params?.mode === "iframe" ? "100vh" : "95vh",
          }}
        >
          <div>
            <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://em-content.zobj.net/thumbs/120/openmoji/338/high-voltage_26a1.png"
                    alt="dialoqbase"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grow px-4 sm:px-6 md:px-5 py-6">
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={
                    message.isBot
                      ? "flex w-full mt-2 space-x-3 max-w-xs"
                      : "flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                  }
                >
                  <div>
                    <div
                      className={
                        message.isBot
                          ? "bg-gray-300 p-3 rounded-r-lg rounded-bl-lg"
                          : "bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg"
                      }
                    >
                      <p className="text-sm">
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={divRef} />
          </div>

          <div className="sticky bottom-0">
            <div className="bg-gray-300 p-4">
              <form
                onSubmit={form.onSubmit(async (value) => {
                  setMessages([
                    ...messages,
                    { message: value.message, isBot: false },
                    {
                      message:
                        "Hi, I'm here to help. What can I do for you today?",
                      isBot: true,
                    },
                  ]);
                  form.reset();
                  // await sendToBotAsync(value.message)
                })}
              >
                <div className="flex-grow space-y-6">
                  <div className="flex">
                    <span className="mr-3">
                      <button
                        // disabled={isSending || isSaving}
                        onClick={() => {
                          setHistory([]);
                          setMessages([
                            {
                              message:
                                "Hi, I'm PageAssist. How can I help you?",
                              isBot: true,
                            },
                          ]);
                        }}
                        className="inline-flex items-center rounded-md border border-gray-700 bg-white px-3 h-10 text-sm font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="h-5 w-5 text-gray-600"
                        >
                          <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"></path>
                          <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"></path>
                          <path d="M14.5 17.5 4.5 15"></path>
                        </svg>
                      </button>
                    </span>
                    <div className="flex-grow">
                      <input
                        // disabled={isSending || isSaving}
                        className="flex items-center h-10 w-full rounded px-3 text-sm"
                        type="text"
                        required
                        placeholder="Type your message…"
                        {...form.getInputProps("message")}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ModeSwitcher>
  );
}

export default App;
