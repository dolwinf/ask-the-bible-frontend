import { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, Send, Menu, Plus, Trash2 } from "lucide-react";
import ReactMarkDown from "react-markdown";

const ChatUI = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hasInitialized = useRef(false);
  const [isMobileMenuActivated, setIsMobileMenuActivated] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (event) => {
      setIsMobileMenuActivated(event.matches);
    };

    setIsMobileMenuActivated(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (!hasInitialized.current) {
      handleNewChat();
      hasInitialized.current = true;
    }
  }, []);

  const getCurrentConversation = useCallback(() => {
    return (
      conversations.find((conv) => conv.id === currentConversationId) || { messages: [] }
    );
  }, [conversations, currentConversationId]);

  const streamResponse = useCallback(
    async (newMessageId) => {
      setIsStreaming(true);
      try {
        const response = await fetch("http://localhost:8000/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: inputMessage }),
        });

        if (!response.body) {
          throw new Error("ReadableStream not supported");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulatedText += decoder.decode(value, { stream: true });

          setConversations((prevConversations) => {
            return prevConversations.map((conv) => {
              if (conv.id === currentConversationId) {
                const updatedMessages = conv.messages.map((msg) =>
                  msg.id === newMessageId ? { ...msg, content: accumulatedText } : msg
                );
                return { ...conv, messages: updatedMessages };
              }
              return conv;
            });
          });
        }
      } catch (error) {
        console.error("Error streaming response:", error);
      } finally {
        setIsStreaming(false);
        updateConversationTitle();
      }
    },
    [currentConversationId, inputMessage]
  );

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() !== "") {
      const newMessageId = Date.now();
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conv) =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  { id: newMessageId, type: "user", content: inputMessage },
                  { id: newMessageId + 1, type: "assistant", content: "" },
                ],
              }
            : conv
        );
        return updatedConversations;
      });
      setInputMessage("");
      streamResponse(newMessageId + 1);
    }
  }, [inputMessage, currentConversationId, streamResponse]);

  const handleNewChat = useCallback(() => {
    const newConversationId = Date.now();

    setConversations((prevConversations) => {
      const newConversation = {
        id: newConversationId,
        title: "New Chat",
        messages: [],
      };
      return [...prevConversations, newConversation];
    });

    setCurrentConversationId(newConversationId);
    setInputMessage("");
  }, []);

  const updateConversationTitle = useCallback(() => {
    setConversations((prevConversations) => {
      return prevConversations.map((conv) => {
        if (conv.id === currentConversationId && conv.messages.length > 0) {
          const firstMessage = conv.messages[0].content;
          const newTitle =
            firstMessage.slice(0, 30) + (firstMessage.length > 30 ? "..." : "");
          return { ...conv, title: newTitle };
        }
        return conv;
      });
    });
  }, [currentConversationId]);

  const switchConversation = useCallback((id) => {
    setCurrentConversationId(id);
  }, []);

  const deleteConversation = useCallback(
    (id, event) => {
      event.stopPropagation();

      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.filter((conv) => conv.id !== id);

        if (id === currentConversationId) {
          if (updatedConversations.length > 0) {
            setCurrentConversationId(updatedConversations[0].id);
          } else {
            setCurrentConversationId(null);
          }
        }

        return updatedConversations;
      });
    },
    [currentConversationId]
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 flex-shrink-0 ${
          isSidebarOpen ? "" : "hidden"
        } md:block`}
      >
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <Plus size={16} className="mr-2" />
            New Chat
          </button>
        </div>
        <div className="overflow-y-auto h-full">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center justify-between ${
                chat.id === currentConversationId ? "bg-gray-700" : ""
              }`}
              onClick={() => switchConversation(chat.id)}
            >
              <div className="flex items-center overflow-hidden">
                <MessageSquare className="flex-shrink-0 mr-2" size={16} />
                <span className="truncate">{chat.title}</span>
              </div>
              <button
                onClick={(e) => deleteConversation(chat.id, e)}
                className="text-gray-400 hover:text-red-500 focus:outline-none"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {getCurrentConversation().messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                  message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <ReactMarkDown>{message.content}</ReactMarkDown>
              </div>
            </div>
          ))}
          {isStreaming && <div className="text-gray-500">generating respone...</div>}
        </div>

        {/* Input area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={conversations.length === 0}
              placeholder={
                conversations.length === 0
                  ? isMobileMenuActivated
                    ? "Click the menu icon and + New Chat to start a conversation"
                    : "Click on + New Chat from the left pane to start a conversation"
                  : "Ask your question here..."
              }
            />
            <button
              onClick={handleSendMessage}
              disabled={isStreaming}
              className="bg-blue-500 text-white rounded-r-lg p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full"
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default ChatUI;
