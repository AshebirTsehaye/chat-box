'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Paperclip, Smile, RefreshCcw, AtSign, } from 'lucide-react'

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
      <div className="w-full max-w-4xl relative">
        <div className="flex items-center justify-center min-h-[600px] pt-8">
          <Card className="w-full max-w-4xl shadow-none border-none">
            <CardContent className="p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`text-sm p-3 rounded-md ${
                    msg.sender === 'Vanilla AI' ? 'bg-[#eaf1fb] text-gray-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                    <span>{msg.sender} {msg.type === 'suggested' && <span className="text-gray-400">Suggested</span>}</span>
                    {msg.type === 'suggested' && (
                      <button
                        onClick={regenerateSuggestion}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs"
                      >
                        <RefreshCcw size={14} /> Regenerate
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

              <div className="border rounded-md px-4 py-2 space-y-2 bg-white shadow-sm">
                <Input
                  className="text-sm border-none focus:ring-0 focus:outline-none"
                  placeholder="Typing"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                />

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <img src="/chatbox-icon.png" alt="custom icon" width={24} height={24} className="pr-1"/>
                    <img src="/star-icon.png" alt="custom icon" width={24} height={24} className="pr-1"/>
                    <Paperclip size={18} className="pr-1"/>
                    <Smile size={18} className="pr-1"/>
                    <AtSign size={18} className="pr-1"/>
                    <img src="/square-pen-icon.png" alt="custom icon" width={24} height={24} className="pr-1"/>
                    <div className="w-px h-5 bg-gray-300 mx-3 pr-1"></div>
                    <div className="flex items-center space-x-1 text-xs">
                      <img src="/double-start-icon.png" alt="custom icon" width={26} height={26} />
                      <span>Quick reply with AI</span>
                    </div>
                  </div>

                  <Button
                    onClick={sendMessage}
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <Image src="/send-icon.png" alt="send" width={36} height={36} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
