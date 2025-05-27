'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Paperclip, Smile, RefreshCcw, AtSign } from 'lucide-react'

interface Message {
  id: number
  sender: string
  text: string
  type?: string
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Vanilla AI',
      type: 'suggested',
      text:
        "Oh no! Sad to hear that, but of course we can give a refund. Can you please provide your order number if you have one? Or email that you’ve used to make this purchase.",
    },
  ])
  const [inputMessage, setInputMessage] = useState('')

  const sendMessage = () => {
    if (!inputMessage.trim()) return
    setMessages((prev: Message[]) => [...prev, { id: Date.now(), sender: 'You', text: inputMessage }])
    setInputMessage('')
  }

  const replyWithSuggested = () => {
    const suggested = messages.find((m) => m.type === 'suggested')
    if (suggested) {
      setMessages((prev: Message[]) => [...prev, { id: Date.now(), sender: 'You', text: suggested.text }])
    }
  }

  const regenerateSuggestion = () => {
    const newSuggestion: Message = {
      id: Date.now(),
      sender: 'Vanilla AI',
      type: 'suggested',
      text:
        "Thanks for reaching out. We're happy to assist with a refund. Could you share your order number or the email used to make the purchase?",
    }
    setMessages((prev: Message[]) => prev.map((msg) => (msg.type === 'suggested' ? newSuggestion : msg)))
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto relative">
        <div className="flex items-center justify-center min-h-[600px] pt-8">
          <Card className="w-full max-w-3xl border-none shadow-none">
            <CardContent className="p-0 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`text-sm p-3 rounded-md ${
                    msg.sender === 'Vanilla AI' ? 'bg-[#eaf1fb] text-gray-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                     <span className="text-black font-semibold">
                      {msg.sender}{' '}
                      {msg.type === 'suggested' && <span className="text-gray-400 font-normal ml-1">Suggested</span>}
                    </span>
                    {msg.type === 'suggested' && (
                    <button
                      onClick={regenerateSuggestion}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#E8F0FE] rounded-md text-black font-medium hover:bg-[#d9e7fd]"
                      >
                      <RefreshCcw size={16} className="text-black" />
                      Regenerate
                    </button>
                    )}
                  </div>
                  <p className="mt-1">{msg.text}</p>
                  {msg.type === 'suggested' && (
                    <button
                      onClick={replyWithSuggested}
                      className="underline text-sm block mt-1 hover:text-blue-800"
                    >
                      Reply with this message
                    </button>
                  )}
                </div>
              ))}

              {/* Message Input Area */}
<div className="relative rounded-2xl bg-white px-4 pt-3 pb-4 shadow-[0px_8px_24px_rgba(0,0,0,0.09)] border-[1.5px] border-[#D1D5DC]">
    <input
      type="text"
      value={inputMessage}
      onChange={(e) => setInputMessage(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
      className="w-full text-[14px] text-black font-medium leading-[20px] py-[6px] px-[12px] placeholder:text-black/70 caret-black pr-14 bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 active:border-0"
    />


  <div className="absolute bottom-0 right-0 rounded-md pr-1 pb-1 flex items-center justify-center">
    <button onClick={sendMessage} className="w-9 h-9 flex items-center justify-center">
      <Image src="/send-icon.png" alt="send" width={48} height={48} />
    </button>
  </div>

  <div className="mt-5 flex items-center space-x-2 text-gray-700 text-sm">
    <Image src="/chatbox-icon.png" alt="icon" width={20} height={20} />
    <Image src="/star-icon.png" alt="icon" width={24} height={24} />
    <Image src="/file-icon.png" alt="icon" width={24} height={24} />
    <Image src="/emoji-icon.png" alt="icon" width={24} height={24} />
    <AtSign size={18} />
    <Image src="/square-pen-icon.png" alt="icon" width={20} height={20} />
    <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
    <div className="flex items-center space-x-1 text-xs">
      <Image src="/double-star-icon.png" alt="icon" width={26} height={26} />
      <span className="text-black font-medium">Quick reply with AI</span>
    </div>
  </div>
</div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
