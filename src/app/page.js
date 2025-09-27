'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Search, Globe, Grid3X3, User, Plus, Sparkles, Image as ImageIcon, MapPin, Paperclip, Mic, ChevronDown, ChevronUp, Trash2, Edit3, HomeIcon, Settings, Megaphone } from "lucide-react";
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.min.css';
import { mockData } from './mockData';

export default function CampaignChat() {
  // Available data sources and channels
  const dataSources = [
    'GTM', 'Facebook Pixel', 'Google Ads Tag', 'Facebook Page',
    'Website', 'Shopify', 'CRMs', 'Twitter Page', 'Review Sites',
  ];

  const channels = [
    'Email', 'SMS', 'Push', 'WhatsApp', 'Voice', 'Messenger', 'Ads'
  ];

  // State management
  const [chatHistories, setChatHistories] = useState([]); // Store all chat histories
  const [currentChatId, setCurrentChatId] = useState(null); // ID of currently active chat
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPanelHovered, setIsPanelHovered] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [expandedSource, setExpandedSource] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingChatName, setEditingChatName] = useState('');
  const messagesEndRef = useRef(null);
  const [activeNavPanel, setActiveNavPanel] = useState('home'); // Track which nav panel is active
  const [activeAction, setActiveAction] = useState(0); // Track which action button is active (0 = first button)

  // Load chat histories from localStorage on component mount
  useEffect(() => {
    const savedChatHistories = localStorage.getItem('campaignChatHistories');
    if (savedChatHistories) {
      const parsedHistories = JSON.parse(savedChatHistories);
      // Sort chats by lastUsed timestamp (newest first)
      const sortedChats = parsedHistories.sort((a, b) => {
        const timeA = a.lastUsed || a.createdAt;
        const timeB = b.lastUsed || b.createdAt;
        return new Date(timeB) - new Date(timeA);
      });
      setChatHistories(sortedChats);

      // If there are chat histories, set the first one as current
      if (sortedChats.length > 0 && !currentChatId) {
        setCurrentChatId(sortedChats[0].id);
      }
    } else {
      // Initialize with an empty chat history
      const newChat = {
        id: Date.now().toString(),
        name: 'New Chat',
        sources: [],
        channels: [],
        messages: [],
        createdAt: new Date().toISOString(),
        lastUsed: new Date().toISOString()
      };
      setChatHistories([newChat]);
      setCurrentChatId(newChat.id);
    }

    // Load selections from localStorage if no current chat
    if (!currentChatId) {
      const savedSources = localStorage.getItem('selectedSources');
      if (savedSources) {
        setSelectedSources(JSON.parse(savedSources));
      }

      const savedChannels = localStorage.getItem('selectedChannels');
      if (savedChannels) {
        setSelectedChannels(JSON.parse(savedChannels));
      }
    }
  }, []); // Only run on mount

  // Sort chat histories and save to localStorage whenever they change
  useEffect(() => {
    if (chatHistories.length > 0) {
      // Sort chats by lastUsed timestamp (newest first)
      const sortedChats = [...chatHistories].sort((a, b) => {
        const timeA = a.lastUsed || a.createdAt;
        const timeB = b.lastUsed || b.createdAt;
        return new Date(timeB) - new Date(timeA);
      });

      // Save to localStorage only if order changed
      localStorage.setItem('campaignChatHistories', JSON.stringify(sortedChats));
    }
  }, [chatHistories]);

  // Update current chat when currentChatId changes
  useEffect(() => {
    if (currentChatId) {
      const currentChat = chatHistories.find(chat => chat.id === currentChatId);
      if (currentChat) {
        setSelectedSources(currentChat.sources || []);
        setSelectedChannels(currentChat.channels || []);
        setMessages(currentChat.messages || []);
      }
    }
  }, [currentChatId, chatHistories]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      hljs.highlightAll();
    }
  }); // Only run when messages change

  // Update lastUsed timestamp for the current chat
  useEffect(() => {
    if (currentChatId) {
      // Update lastUsed timestamp for the current chat
      setChatHistories(prev => {
        const updated = prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, lastUsed: new Date().toISOString() }
            : chat
        );
        // Save to localStorage
        localStorage.setItem('campaignChatHistories', JSON.stringify(updated));
        return updated;
      });
    }
  }, [currentChatId]);

  // Toggle data source selection
  const toggleSource = (source) => {
    let newSources;
    if (selectedSources.includes(source)) {
      newSources = selectedSources.filter(s => s !== source);
    } else if (selectedSources.length < 3) {
      newSources = [...selectedSources, source];
    } else {
      newSources = selectedSources;
    }

    // Update selected sources in state
    setSelectedSources(newSources);

    // Update selected sources in current chat history
    if (currentChatId) {
      setChatHistories(prev => prev.map(chat =>
        chat.id === currentChatId
          ? { ...chat, sources: newSources, lastUsed: new Date().toISOString() }
          : chat
      ));
    }
  };

  // Toggle channel selection
  const toggleChannel = (channel) => {
    let newChannels;
    if (selectedChannels.includes(channel)) {
      newChannels = selectedChannels.filter(c => c !== channel);
    } else if (selectedChannels.length < 4) {
      newChannels = [...selectedChannels, channel];
    } else {
      newChannels = selectedChannels;
    }

    // Update selected channels in state
    setSelectedChannels(newChannels);

    // Update selected channels in current chat history
    if (currentChatId) {
      setChatHistories(prev => prev.map(chat =>
        chat.id === currentChatId
          ? { ...chat, channels: newChannels, lastUsed: new Date().toISOString() }
          : chat
      ));
    }
  };

  // Toggle source accordion
  const toggleSourceAccordion = (source) => {
    setExpandedSource(expandedSource === source ? null : source);
  };

  // Open modal with mock data
  const openDataModal = (source) => {
    setModalData({
      source,
      ...mockData[source]
    });
  };

  // Close modal
  const closeDataModal = () => {
    setModalData(null);
  };

  // Format timestamp to readable date
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Call Gemini API with streaming
  const callGeminiAPIStream = async (userMessage) => {
    const systemPrompt = `You are a marketing campaign expert AI assistant. Your purpose is to help users create JSON payloads for executable marketing campaigns based on user data from various sources.
    
    The user will provide a campaign goal, and you should generate a structured JSON campaign payload that includes:
    1. Campaign name and objective
    2. Audience segmentation based on the selected data sources
    3. Channel allocation based on selected channels
    4. Message content (subject, body, CTA)
    5. Timing and scheduling information
    6. Budget allocation
    
    Selected data sources: ${selectedSources.join(', ') || 'None selected'}
    Selected channels: ${selectedChannels.join(', ') || 'None selected'}
    
    You can be conversational in your response, but you MUST include the JSON payload wrapped in triple backticks with json language identifier like this:
    \`\`\`json
    {
      "campaign": {
        "name": "Campaign Name",
        "objective": "Campaign Objective",
        // ... rest of the JSON structure
      }
    }
    \`\`\`
    
    Example response format:
    I'll help you create a campaign for that. Here's the JSON payload you can use:
    
    \`\`\`json
    {
      "campaign": {
        "name": "Campaign Name",
        "objective": "Campaign Objective",
        "audience": {
          "segments": ["Segment 1", "Segment 2"],
          "targeting": {
            "location": "Target locations",
            "demographics": "Demographic targeting",
            "behavior": "Behavioral targeting"
          }
        },
        "channels": ["Selected channels"],
        "dataSources": ["Selected data sources"],
        "message": {
          "subject": "Message subject",
          "body": "Message body",
          "cta": "Call to action"
        },
        "timing": {
          "optimalSendTime": "ISO timestamp",
          "frequency": "Send frequency",
          "timezone": "Timezone"
        },
        "budget": {
          "total": 0,
          "allocation": {
            "Channel": 0
          }
        }
      }
    }
    \`\`\`
    
    Make sure to always include the JSON payload in the code block as shown above.`;

    const fullPrompt = `System: ${systemPrompt}\n\nUser: ${userMessage}`;

    try {
      const response = await fetch('/api/gemini-streaming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return response.body.getReader();
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  // Generate response using streaming Gemini API
  const generateResponseStream = async (userMessage) => {
    setIsGenerating(true);

    // Add user message
    const userMsg = { id: Date.now(), role: 'user', content: userMessage };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    // Update messages in current chat history and lastUsed timestamp
    if (currentChatId) {
      setChatHistories(prev => {
        return prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: newMessages, lastUsed: new Date().toISOString() }
            : chat
        );
      });
    }

    // Add initial assistant message
    const assistantMsgId = Date.now() + 1;
    const assistantMsg = { id: assistantMsgId, role: 'assistant', content: '', isGenerating: true };

    // Update messages with the initial assistant message
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, assistantMsg];

      // Update messages in current chat history
      if (currentChatId) {
        setChatHistories(prev => {
          return prev.map(chat =>
            chat.id === currentChatId
              ? { ...chat, messages: updatedMessages, lastUsed: new Date().toISOString() }
              : chat
          );
        });
      }

      return updatedMessages;
    });

    try {
      const reader = await callGeminiAPIStream(userMessage);
      const decoder = new TextDecoder();

      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent = accumulatedContent + chunk;

        // Update assistant message with the accumulated content
        setMessages(prevMessages => {
          const updatedMessages = prevMessages.map(msg =>
            msg.id === assistantMsgId
              ? { ...msg, content: accumulatedContent }
              : msg
          );

          // Update messages in current chat history
          if (currentChatId) {
            setChatHistories(prev => {
              return prev.map(chat =>
                chat.id === currentChatId
                  ? { ...chat, messages: updatedMessages, lastUsed: new Date().toISOString() }
                  : chat
              );
            });
          }

          return updatedMessages;
        });
      }

      // Final update to mark as not generating
      setMessages(prevMessages => {
        const finalMessages = prevMessages.map(msg =>
          msg.id === assistantMsgId
            ? { ...msg, content: accumulatedContent, isGenerating: false }
            : msg
        );

        // Update messages in current chat history
        if (currentChatId) {
          setChatHistories(prev => {
            return prev.map(chat =>
              chat.id === currentChatId
                ? { ...chat, messages: finalMessages, lastUsed: new Date().toISOString() }
                : chat
            );
          });
        }

        return finalMessages;
      });
    } catch (error) {
      // Handle error case
      setMessages(prevMessages => {
        const errorMessages = prevMessages.map(msg =>
          msg.id === assistantMsgId
            ? { ...msg, content: `Error: ${error.message}. Please try again.`, isGenerating: false }
            : msg
        );

        // Update messages in current chat history
        if (currentChatId) {
          setChatHistories(prev => {
            return prev.map(chat =>
              chat.id === currentChatId
                ? { ...chat, messages: errorMessages, lastUsed: new Date().toISOString() }
                : chat
            );
          });
        }

        return errorMessages;
      });
    }

    setIsGenerating(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && selectedSources.length > 0 && selectedChannels.length > 0 && !isGenerating) {
      generateResponseStream(inputValue);
      setInputValue('');
    }
  };

  // Clear current chat history
  const clearCurrentChat = () => {
    setMessages([]);

    // Update messages in current chat history and lastUsed timestamp
    if (currentChatId) {
      setChatHistories(prev => {
        return prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [], lastUsed: new Date().toISOString() }
            : chat
        );
      });
    }
  };

  // Create a new chat
  const createNewChat = () => {
    // Don't allow new chat creation if current chat has no messages
    if (messages.length === 0) {
      return;
    }

    const newChat = {
      id: Date.now().toString(),
      name: 'New Chat',
      sources: [],
      channels: [],
      messages: [],
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };

    // Add new chat to the beginning of the list
    setChatHistories(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setSelectedSources([]);
    setSelectedChannels([]);
    setMessages([]);
  };

  // Switch to a different chat
  const switchToChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  // Delete a chat
  const deleteChat = (chatId, e) => {
    e.stopPropagation();

    if (chatHistories.length <= 1) {
      // If this is the last chat, clear it instead of deleting
      clearCurrentChat();
      return;
    }

    const updatedChats = chatHistories.filter(chat => chat.id !== chatId);
    setChatHistories(updatedChats);

    // If we deleted the current chat, switch to the first available chat
    if (chatId === currentChatId && updatedChats.length > 0) {
      setCurrentChatId(updatedChats[0].id);
    }
  };

  // Start editing a chat name
  const startEditingChatName = (chatId, currentName, e) => {
    e.stopPropagation();
    setEditingChatId(chatId);
    setEditingChatName(currentName);
  };

  // Save edited chat name
  const saveEditedChatName = (chatId) => {
    if (editingChatName.trim()) {
      setChatHistories(prev => {
        return prev.map(chat =>
          chat.id === chatId
            ? { ...chat, name: editingChatName.trim() }
            : chat
        );
      });
    }
    setEditingChatId(null);
    setEditingChatName('');
  };

  // Handle Enter key in chat name editing
  const handleEditKeyDown = (chatId, e) => {
    if (e.key === 'Enter') {
      saveEditedChatName(chatId);
    }
  };

  // Format last used time to readable format
  const formatLastUsed = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} mins ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const actionButtons = [
    { icon: Search, label: "Search" },
    { icon: Globe, label: "Web" },
    { icon: Paperclip, label: "Attach" },
    { icon: Mic, label: "Voice" },
    { icon: Sparkles, label: "AI", variant: "accent" },
  ];

  const navItems = [
    { icon: HomeIcon, label: "Home", id: "home" },
    { icon: Settings, label: "Configurations", id: "configurations" },
    { icon: Megaphone, label: "Campaigns", id: "campaigns" }
  ];

  // Determine if panel should be visible
  const isPanelVisible = isSidebarHovered || isPanelHovered;

  // Get current chat name for display
  const currentChatName = chatHistories.find(chat => chat.id === currentChatId)?.name || 'New Chat';

  // Render panel content based on active nav item
  const renderPanelContent = () => {
    switch (activeNavPanel) {
      case 'home':
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--sidebar-primary)]">Chat History</h2>
              <button
                className="md:hidden text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                onClick={() => setIsPanelHovered(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Chat History Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[var(--foreground)]">Recent Chats</h3>
                  <button
                    onClick={createNewChat}
                    className={`text-xs hover:underline ${messages.length === 0 ? 'text-[var(--sidebar-foreground)] cursor-not-allowed' : 'text-[var(--button-primary)]'}`}
                    disabled={messages.length === 0}
                    title={messages.length === 0 ? "Add a message to current chat before creating a new one" : ""}
                  >
                    New Chat
                  </button>
                </div>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {chatHistories.map(chat => (
                    <div
                      key={chat.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm cursor-pointer ${chat.id === currentChatId
                        ? 'bg-[var(--button-primary)]/20 border border-[var(--button-primary)]/50'
                        : 'bg-[var(--card-background)] border border-[var(--card-border)] hover:bg-[var(--nav-hover)]'
                        }`}
                      onClick={() => switchToChat(chat.id)}
                    >
                      {editingChatId === chat.id ? (
                        <input
                          type="text"
                          value={editingChatName}
                          onChange={(e) => setEditingChatName(e.target.value)}
                          onBlur={() => saveEditedChatName(chat.id)}
                          onKeyDown={(e) => handleEditKeyDown(chat.id, e)}
                          autoFocus
                          className="bg-transparent border-b border-[var(--input-border)] focus:outline-none w-full"
                        />
                      ) : (
                        <div className="flex flex-col">
                          <span
                            className="text-[var(--foreground)] truncate max-w-[180px]"
                            onDoubleClick={(e) => startEditingChatName(chat.id, chat.name, e)}
                          >
                            {chat.name}
                          </span>
                          <span className="text-xs text-[var(--sidebar-foreground)]">
                            {formatLastUsed(chat.lastUsed || chat.createdAt)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <button
                          onClick={(e) => startEditingChatName(chat.id, chat.name, e)}
                          className="p-1 text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => deleteChat(chat.id, e)}
                          className="p-1 text-[var(--sidebar-foreground)] hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="pt-4 border-t border-[var(--sidebar-border)]">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Campaigns
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Help & Support
                  </a>
                </li>
              </ul>
            </div>
          </>
        );
      case 'configurations':
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--sidebar-primary)]">Configuration</h2>
              <button
                className="md:hidden text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                onClick={() => setIsPanelHovered(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Data Sources */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-[var(--foreground)]">Data Sources (Select up to 3)</h3>
                <div className="space-y-2">
                  {dataSources.map(source => (
                    <div
                      key={source}
                      className={`rounded-md text-sm ${selectedSources.includes(source)
                        ? 'bg-[var(--button-primary)]/20 border border-[var(--button-primary)]/50'
                        : 'bg-[var(--card-background)] border border-[var(--card-border)]'
                        }`}
                    >
                      <div
                        className="flex items-center justify-between px-3 py-2 cursor-pointer"
                        onClick={() => toggleSourceAccordion(source)}
                      >
                        <span className="text-[var(--foreground)]">{source}</span>
                        <div className="flex items-center">
                          {expandedSource === source ? (
                            <ChevronUp className="h-4 w-4 text-[var(--foreground)]" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[var(--foreground)]" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSource(source);
                            }}
                            className={`ml-2 px-2 py-1 rounded text-xs ${selectedSources.includes(source)
                              ? 'bg-[var(--button-primary)] text-white'
                              : selectedSources.length >= 3 && !selectedSources.includes(source)
                                ? 'bg-[var(--nav-hover)] text-[var(--sidebar-foreground)] opacity-50 cursor-not-allowed'
                                : 'bg-[var(--nav-hover)] text-[var(--foreground)]'
                              }`}
                            disabled={!selectedSources.includes(source) && selectedSources.length >= 3}
                          >
                            {selectedSources.includes(source) ? 'Connected' : 'Connect'}
                          </button>
                        </div>
                      </div>

                      {expandedSource === source && (
                        <div className="px-3 pb-2">
                          <button
                            onClick={() => openDataModal(source)}
                            className="text-xs text-[var(--button-primary)] hover:underline"
                          >
                            See Data
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--sidebar-foreground)] mt-1">
                  Selected: {selectedSources.length}/3
                </p>
              </div>

              {/* Channels */}
              <div>
                <h3 className="font-medium mb-2 text-[var(--foreground)]">Channels (Select up to 4)</h3>
                <div className="space-y-2">
                  {channels.map(channel => (
                    <div
                      key={channel}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm ${selectedChannels.includes(channel)
                        ? 'bg-[var(--button-primary)]/20 border border-[var(--button-primary)]/50'
                        : 'bg-[var(--card-background)] border border-[var(--card-border)]'
                        }`}
                    >
                      <span className="text-[var(--foreground)]">{channel}</span>
                      <button
                        onClick={() => toggleChannel(channel)}
                        className={`px-2 py-1 rounded text-xs ${selectedChannels.includes(channel)
                          ? 'bg-[var(--button-primary)] text-white'
                          : selectedChannels.length >= 4 && !selectedChannels.includes(channel)
                            ? 'bg-[var(--nav-hover)] text-[var(--sidebar-foreground)] opacity-50 cursor-not-allowed'
                            : 'bg-[var(--nav-hover)] text-[var(--foreground)]'
                          }`}
                        disabled={!selectedChannels.includes(channel) && selectedChannels.length >= 4}
                      >
                        {selectedChannels.includes(channel) ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--sidebar-foreground)] mt-1">
                  Selected: {selectedChannels.length}/4
                </p>
              </div>
            </div>

          </>
        );
      case 'campaigns':
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--sidebar-primary)]">Campaigns</h2>
              <button
                className="md:hidden text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                onClick={() => setIsPanelHovered(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="text-center py-10">
                <Megaphone className="h-12 w-12 text-[var(--sidebar-foreground)] mx-auto mb-4" />
                <h3 className="text-xl font-medium text-[var(--foreground)] mb-2">Campaigns Feature</h3>
                <p className="text-[var(--sidebar-foreground)]">This feature is not yet implemented.</p>
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--sidebar-primary)]">Configuration</h2>
              <button
                className="md:hidden text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                onClick={() => setIsPanelHovered(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Chat History Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[var(--foreground)]">Chat History</h3>
                  <button
                    onClick={createNewChat}
                    className="text-xs text-[var(--button-primary)] hover:underline"
                  >
                    New Chat
                  </button>
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {chatHistories.map(chat => (
                    <div
                      key={chat.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm cursor-pointer ${chat.id === currentChatId
                        ? 'bg-[var(--button-primary)]/20 border border-[var(--button-primary)]/50'
                        : 'bg-[var(--card-background)] border border-[var(--card-border)] hover:bg-[var(--nav-hover)]'
                        }`}
                      onClick={() => switchToChat(chat.id)}
                    >
                      {editingChatId === chat.id ? (
                        <input
                          type="text"
                          value={editingChatName}
                          onChange={(e) => setEditingChatName(e.target.value)}
                          onBlur={() => saveEditedChatName(chat.id)}
                          onKeyDown={(e) => handleEditKeyDown(chat.id, e)}
                          autoFocus
                          className="bg-transparent border-b border-[var(--input-border)] focus:outline-none w-full"
                        />
                      ) : (
                        <div className="flex items-center">
                          <span
                            className="text-[var(--foreground)] truncate max-w-[180px]"
                            onDoubleClick={(e) => startEditingChatName(chat.id, chat.name, e)}
                          >
                            {chat.name}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <button
                          onClick={(e) => startEditingChatName(chat.id, chat.name, e)}
                          className="p-1 text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => deleteChat(chat.id, e)}
                          className="p-1 text-[var(--sidebar-foreground)] hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Sources */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-[var(--foreground)]">Data Sources (Select up to 3)</h3>
                <div className="space-y-2">
                  {dataSources.map(source => (
                    <div
                      key={source}
                      className={`rounded-md text-sm ${selectedSources.includes(source)
                        ? 'bg-[var(--button-primary)]/20 border border-[var(--button-primary)]/50'
                        : 'bg-[var(--card-background)] border border-[var(--card-border)]'
                        }`}
                    >
                      <div
                        className="flex items-center justify-between px-3 py-2 cursor-pointer"
                        onClick={() => toggleSourceAccordion(source)}
                      >
                        <span className="text-[var(--foreground)]">{source}</span>
                        <div className="flex items-center">
                          {expandedSource === source ? (
                            <ChevronUp className="h-4 w-4 text-[var(--foreground)]" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[var(--foreground)]" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSource(source);
                            }}
                            className={`ml-2 px-2 py-1 rounded text-xs ${selectedSources.includes(source)
                              ? 'bg-[var(--button-primary)] text-white'
                              : selectedSources.length >= 3 && !selectedSources.includes(source)
                                ? 'bg-[var(--nav-hover)] text-[var(--sidebar-foreground)] opacity-50 cursor-not-allowed'
                                : 'bg-[var(--nav-hover)] text-[var(--foreground)]'
                              }`}
                            disabled={!selectedSources.includes(source) && selectedSources.length >= 3}
                          >
                            {selectedSources.includes(source) ? 'Connected' : 'Connect'}
                          </button>
                        </div>
                      </div>

                      {expandedSource === source && (
                        <div className="px-3 pb-2">
                          <button
                            onClick={() => openDataModal(source)}
                            className="text-xs text-[var(--button-primary)] hover:underline"
                          >
                            See Data
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--sidebar-foreground)] mt-1">
                  Selected: {selectedSources.length}/3
                </p>
              </div>

              {/* Channels */}
              <div>
                <h3 className="font-medium mb-2 text-[var(--foreground)]">Channels (Select up to 4)</h3>
                <div className="space-y-2">
                  {channels.map(channel => (
                    <div
                      key={channel}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm ${selectedChannels.includes(channel)
                        ? 'bg-[var(--button-primary)]/20 border border-[var(--button-primary)]/50'
                        : 'bg-[var(--card-background)] border border-[var(--card-border)]'
                        }`}
                    >
                      <span className="text-[var(--foreground)]">{channel}</span>
                      <button
                        onClick={() => toggleChannel(channel)}
                        className={`px-2 py-1 rounded text-xs ${selectedChannels.includes(channel)
                          ? 'bg-[var(--button-primary)] text-white'
                          : selectedChannels.length >= 4 && !selectedChannels.includes(channel)
                            ? 'bg-[var(--nav-hover)] text-[var(--sidebar-foreground)] opacity-50 cursor-not-allowed'
                            : 'bg-[var(--nav-hover)] text-[var(--foreground)]'
                          }`}
                        disabled={!selectedChannels.includes(channel) && selectedChannels.length >= 4}
                      >
                        {selectedChannels.includes(channel) ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--sidebar-foreground)] mt-1">
                  Selected: {selectedChannels.length}/4
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="pt-4 border-t border-[var(--sidebar-border)]">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Campaigns
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="/streaming-demo" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Streaming Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)]">
                    Help & Support
                  </a>
                </li>
              </ul>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      {/* Sidebar */}
      <div
        className="flex flex-col h-screen w-16 bg-[var(--sidebar-background)] border-r border-[var(--sidebar-border)] relative z-20"
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-[var(--sidebar-border)]">
          <Sparkles className="h-6 w-6 text-[var(--sidebar-primary)]" />
        </div>

        {/* Add button */}
        <div className="p-3">
          <button
            className={`w-10 h-10 p-0 rounded-full hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)] flex items-center justify-center transition-colors ${messages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={createNewChat}
            disabled={messages.length === 0}
            title={messages.length === 0 ? "Add a message to current chat before creating a new one" : "Create new chat"}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`w-10 h-10 p-0 flex flex-col items-center justify-center gap-1 rounded-full transition-colors ${activeNavPanel === item.id
                  ? "text-[var(--sidebar-primary)] bg-[var(--sidebar-accent)]"
                  : "text-[var(--sidebar-foreground)] hover:bg-[var(--nav-hover)]"
                  }`}
                onClick={() => setActiveNavPanel(item.id)}
                onMouseEnter={() => setActiveNavPanel(item.id)}
              >
                <item.icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </nav>

        {/* User */}
        <div className="p-3 border-t border-[var(--sidebar-border)]">
          <button className="w-10 h-10 p-0 rounded-full hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)] flex items-center justify-center transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Sidebar Panel - Slides in from left when sidebar is hovered */}
      <div
        className={`fixed top-0 left-16 h-full w-80 bg-[var(--sidebar-background)] border-r border-[var(--sidebar-border)] z-10 transition-all duration-300 ease-in-out ${isPanelVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        onMouseEnter={() => setIsPanelHovered(true)}
        onMouseLeave={() => setIsPanelHovered(false)}
      >
        <div className="p-4 h-full flex flex-col">
          {renderPanelContent()}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-auto">
        {/* Header */}
        <header className="bg-[var(--background)] border-b border-[var(--search-border)] p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[var(--foreground)] line-clamp-1">Campaign Optimizer - {currentChatName}</h1>
          {messages.length > 0 && (
            <button
              onClick={clearCurrentChat}
              className="text-sm text-[var(--button-primary)] hover:underline line-clamp-1"
            >
              Clear Chat
            </button>
          )}
        </header>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col h-full overflow-auto">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 h-full overflow-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[var(--sidebar-foreground)] text-center">
                <h3 className="leading-relaxed text-4xl font-medium mb-2">Campaign Optimizer</h3>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${message.role === 'user'
                      ? 'bg-[var(--message-user-bg)] ml-10 border border-[var(--card-border)]'
                      : 'bg-[var(--message-assistant-bg)] sm:mr-10 border border-[var(--card-border)]'
                      }`}
                  >
                    <div className="font-medium mb-1">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </div>
                    <div className="whitespace-pre-wrap text-[var(--foreground)]">
                      {message.role === 'assistant' ? (
                        <div
                          className="markdown-content overflow-x-hidden"
                          dangerouslySetInnerHTML={{ __html: marked(message.content) }}
                        />
                      ) : (
                        <>{message.content}</>
                      )}
                      {message.isGenerating && (
                        <span className="inline-block w-2 h-4 bg-[var(--foreground)] ml-1 animate-pulse"></span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-[var(--search-border)] p-4">
            {(selectedSources.length === 0 || selectedChannels.length === 0) && (
              <p className="text-sm text-red-400 mb-2 text-center max-w-3xl mx-auto">
                Please select at least one data source and one channel to continue.
              </p>
            )}
            {/* Show some exmaple prompt sentences horizontally scrollable as rounded chip like buttons */}
            {!messages.length ? <div className="flex overflow-x-auto gap-2 py-0 mb-4 hide-scrollbar horizontal-scroll max-w-3xl mx-auto">
              {[
                "Create a campaign to re-engage users who added items to cart but didn't purchase",
                "Target users who viewed product pages but didn't add to cart",
                "Generate a campaign for users who haven't purchased in 30 days",
                "Create an upsell campaign for recent purchasers",
                "Build a campaign targeting high-value customers"
              ].map((prompt, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setInputValue(prompt);
                    // Focus the input field after setting the value
                    setTimeout(() => {
                      const inputElement = document.querySelector('input[type="text"]');
                      if (inputElement) {
                        inputElement.focus();
                      }
                    }, 0);
                  }}
                  className="flex-shrink-0 px-4 py-2 bg-[var(--card-background)] border border-[var(--card-border)] rounded-full text-sm hover:bg-[var(--button-primary)] hover:text-white transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div> : null}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="relative bg-[var(--input-background)] border border-[var(--input-border)] rounded-xl p-4 focus-within:border-[var(--input-focus)] transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about campaign optimization..."
                  className="w-full bg-transparent border-none text-lg placeholder:text-[var(--sidebar-foreground)] focus:ring-0 focus:ring-offset-0 focus:outline-none p-0 text-[var(--foreground)] font-sans"
                  disabled={isGenerating || selectedSources.length === 0 || selectedChannels.length === 0}
                />

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--input-border)]">
                  {actionButtons.map((action, index) => {
                    const Icon = action.icon;
                    const isActive = activeAction === index;
                    return (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => setActiveAction(index)}
                        className={`h-8 w-8 p-0 rounded-full flex items-center justify-center transition-colors ${isActive
                          ? "bg-[var(--button-primary)] text-white ring-2 ring-[var(--button-primary)] ring-opacity-50"
                          : action.variant === "primary"
                            ? "bg-[var(--button-primary)] text-white hover:bg-[var(--button-primary-hover)]"
                            : action.variant === "accent"
                              ? "text-[var(--button-primary)] hover:bg-[var(--button-primary)]/20"
                              : "text-[var(--sidebar-foreground)] hover:bg-[var(--nav-hover)]"
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    );
                  })}

                  <button
                    type="submit"
                    className="ml-auto h-8 px-3 py-1 rounded-full bg-[var(--button-primary)] text-white text-sm hover:bg-[var(--button-primary-hover)] disabled:opacity-50 flex items-center transition-colors"
                    disabled={!inputValue.trim() || isGenerating || selectedSources.length === 0 || selectedChannels.length === 0}
                  >
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Data Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-[var(--card-border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{modalData.title}</h3>
              <button
                onClick={closeDataModal}
                className="text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="overflow-x-auto horizontal-scroll">
                <table className="min-w-full divide-y divide-[var(--card-border)]">
                  <thead className="bg-[var(--sidebar-accent)]">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[var(--foreground)] uppercase tracking-wider">User ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[var(--foreground)] uppercase tracking-wider">Event Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[var(--foreground)] uppercase tracking-wider">Properties</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[var(--foreground)] uppercase tracking-wider">Contact</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[var(--foreground)] uppercase tracking-wider">Timestamp</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[var(--foreground)] uppercase tracking-wider">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--card-border)]">
                    {modalData.data.map((event, index) => (
                      <tr key={index} className="hover:bg-[var(--nav-hover)]">
                        <td className="px-4 py-2 text-sm text-[var(--foreground)]">{event.userId}</td>
                        <td className="px-4 py-2 text-sm text-[var(--foreground)]">{event.eventType}</td>
                        <td className="px-4 py-2 text-sm text-[var(--foreground)]">
                          {Object.entries(event.properties).map(([key, value]) => (
                            <div key={key}>{key}: {JSON.stringify(value)}</div>
                          ))}
                        </td>
                        <td className="px-4 py-2 text-sm text-[var(--foreground)]">
                          <div>Email: {event.contact.email}</div>
                          <div>Phone: {event.contact.phone}</div>
                        </td>
                        <td className="px-4 py-2 text-sm text-[var(--foreground)]">{formatTimestamp(event.timestamp)}</td>
                        <td className="px-4 py-2 text-sm text-[var(--foreground)]">{event.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-[var(--card-border)]">
              <button
                onClick={closeDataModal}
                className="px-4 py-2 bg-[var(--button-primary)] text-white rounded-md hover:bg-[var(--button-primary-hover)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
