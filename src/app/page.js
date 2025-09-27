'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Globe, Grid3X3, User, Plus, Sparkles, Image as ImageIcon, MapPin, Paperclip, Mic } from "lucide-react";

export default function CampaignChat() {
  // Available data sources and channels
  const dataSources = [
    'GTM', 'Facebook Pixel', 'Google Ads Tag', 'Facebook Page', 
    'Website', 'Shopify', 'CRMs', 'Twitter Page', 'Review Sites', 
    'Ad Managers (Meta, Google, Tiktok, etc.)'
  ];
  
  const channels = [
    'Email', 'SMS', 'Push', 'WhatsApp', 'Voice', 'Messenger', 'Ads'
  ];

  // State management
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPanelHovered, setIsPanelHovered] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Toggle data source selection
  const toggleSource = (source) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else if (selectedSources.length < 3) {
      setSelectedSources([...selectedSources, source]);
    }
  };

  // Toggle channel selection
  const toggleChannel = (channel) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else if (selectedChannels.length < 4) {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  // Simulate streaming response
  const streamResponse = async (userMessage) => {
    setIsStreaming(true);
    
    // Add user message
    const userMsg = { id: Date.now(), role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    
    // Add initial assistant message
    const assistantMsgId = Date.now() + 1;
    const assistantMsg = { id: assistantMsgId, role: 'assistant', content: '', isStreaming: true };
    setMessages(prev => [...prev, assistantMsg]);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate campaign payload
    const campaignPayload = {
      campaign: {
        name: `Campaign for ${userMessage}`,
        objective: "Maximize engagement and conversions",
        audience: {
          segments: ["Returning customers", "High-value prospects"],
          targeting: {
            location: "US, CA, NY, TX",
            demographics: "Age 25-45, Interests in tech products",
            behavior: "Recent website visitors, cart abandoners"
          }
        },
        channels: selectedChannels,
        dataSources: selectedSources,
        message: {
          subject: "Special Offer Just For You!",
          body: "We've noticed you're interested in our products. Here's an exclusive offer just for you.",
          cta: "Claim Your Discount Now"
        },
        timing: {
          optimalSendTime: "2025-09-28T14:30:00Z",
          frequency: "Once per week",
          timezone: "America/New_York"
        },
        budget: {
          total: 5000,
          allocation: selectedChannels.reduce((acc, channel, index) => {
            acc[channel] = Math.floor(5000 / selectedChannels.length);
            return acc;
          }, {})
        }
      }
    };
    
    // Stream the response word by word
    const responseText = `Based on your connected data sources (${selectedSources.join(', ')}) and selected channels (${selectedChannels.join(', ')}), here's your optimized campaign:\n\n\`\`\`json\n${JSON.stringify(campaignPayload, null, 2)}\n\`\`\``;
    
    // Split response into words for streaming effect
    const words = responseText.split(' ');
    let currentContent = '';
    
    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? ' ' : '') + words[i];
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMsgId 
          ? { ...msg, content: currentContent }
          : msg
      ));
      
      // Random delay for realistic streaming
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    }
    
    // Mark streaming as complete
    setMessages(prev => prev.map(msg => 
      msg.id === assistantMsgId 
        ? { ...msg, isStreaming: false }
        : msg
    ));
    
    setIsStreaming(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && selectedSources.length > 0 && selectedChannels.length > 0 && !isStreaming) {
      streamResponse(inputValue);
      setInputValue('');
    }
  };

  const actionButtons = [
    { icon: Search, label: "Search", variant: "primary" },
    { icon: ImageIcon, label: "Image" },
    { icon: MapPin, label: "Location" },
    { icon: Globe, label: "Web" },
    { icon: Paperclip, label: "Attach" },
    { icon: Mic, label: "Voice" },
    { icon: Sparkles, label: "AI", variant: "accent" },
  ];

  const navItems = [
    { icon: Sparkles, label: "Campaigns", isActive: true },
    { icon: Globe, label: "Discover" },
    { icon: Grid3X3, label: "Spaces" },
  ];

  // Determine if panel should be visible
  const isPanelVisible = isSidebarHovered || isPanelHovered;

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
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
          <button className="w-10 h-10 p-0 rounded-full hover:bg-[var(--nav-hover)] text-[var(--sidebar-foreground)] flex items-center justify-center transition-colors">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-10 h-10 p-0 flex flex-col items-center justify-center gap-1 rounded-full transition-colors ${
                  item.isActive 
                    ? "text-[var(--sidebar-primary)] bg-[var(--sidebar-accent)]" 
                    : "text-[var(--sidebar-foreground)] hover:bg-[var(--nav-hover)]"
                }`}
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
        className={`fixed top-0 left-16 h-full w-80 bg-[var(--sidebar-background)] border-r border-[var(--sidebar-border)] z-10 transition-all duration-300 ease-in-out ${
          isPanelVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseEnter={() => setIsPanelHovered(true)}
        onMouseLeave={() => setIsPanelHovered(false)}
      >
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-[var(--sidebar-primary)]">Configuration</h2>
          
          <div className="flex-1 overflow-y-auto">
            {/* Data Sources */}
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-[var(--foreground)]">Data Sources (Select up to 3)</h3>
              <div className="space-y-2">
                {dataSources.map(source => (
                  <button
                    key={source}
                    onClick={() => toggleSource(source)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedSources.includes(source)
                        ? 'bg-[var(--button-primary)]/20 text-[var(--button-primary)] border border-[var(--button-primary)]/50'
                        : 'bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--nav-hover)] border border-[var(--card-border)]'
                    }`}
                    disabled={!selectedSources.includes(source) && selectedSources.length >= 3}
                  >
                    {source}
                  </button>
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
                  <button
                    key={channel}
                    onClick={() => toggleChannel(channel)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedChannels.includes(channel)
                        ? 'bg-[var(--button-primary)]/20 text-[var(--button-primary)] border border-[var(--button-primary)]/50'
                        : 'bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--nav-hover)] border border-[var(--card-border)]'
                    }`}
                    disabled={!selectedChannels.includes(channel) && selectedChannels.length >= 4}
                  >
                    {channel}
                  </button>
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[var(--background)] border-b border-[var(--search-border)] p-4">
          <h1 className="text-2xl font-light text-[var(--foreground)]">Campaign Optimizer</h1>
        </header>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[var(--sidebar-foreground)]">
                <div className="text-center max-w-md">
                  <h3 className="text-lg font-medium mb-2">Welcome to Campaign Optimizer</h3>
                  <p className="mb-4">Select data sources and channels, then describe your campaign goal to get started.</p>
                  <div className="text-sm">
                    <p className="font-medium">Example prompt:</p>
                    <p className="italic">"Create a campaign to re-engage users who added items to cart but didn't purchase"</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`p-4 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-[var(--message-user-bg)] ml-10 border border-[var(--card-border)]' 
                        : 'bg-[var(--message-assistant-bg)] mr-10 border border-[var(--card-border)]'
                    }`}
                  >
                    <div className="font-medium mb-1">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </div>
                    <div className="whitespace-pre-wrap text-[var(--foreground)]">
                      {message.content}
                      {message.isStreaming && (
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
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="relative bg-[var(--input-background)] border border-[var(--input-border)] rounded-xl p-4 focus-within:border-[var(--input-focus)] transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about campaign optimization..."
                  className="w-full bg-transparent border-none text-lg placeholder:text-[var(--sidebar-foreground)] focus:ring-0 focus:ring-offset-0 p-0 text-[var(--foreground)] font-sans"
                  disabled={isStreaming || selectedSources.length === 0 || selectedChannels.length === 0}
                />
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--input-border)]">
                  {actionButtons.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        type="button"
                        className={`h-8 w-8 p-0 rounded-full flex items-center justify-center transition-colors ${
                          action.variant === "primary" 
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
                    disabled={!inputValue.trim() || isStreaming || selectedSources.length === 0 || selectedChannels.length === 0}
                  >
                    {isStreaming ? 'Streaming...' : 'Generate'}
                  </button>
                </div>
              </div>
            </form>
            
            {(selectedSources.length === 0 || selectedChannels.length === 0) && (
              <p className="text-sm text-red-400 mt-2 text-center">
                Please select at least one data source and one channel to continue.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}