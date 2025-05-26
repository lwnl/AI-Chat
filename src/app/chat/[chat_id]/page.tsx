"use client";

import { useChat } from "@ai-sdk/react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <div className="flex flex-col justify-between flex-1 w-2/3 gap-8 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? "User: " : "AI: "}
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
