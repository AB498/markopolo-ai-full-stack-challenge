'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Globe, Grid3X3, User, Plus, Sparkles, Image as ImageIcon, MapPin, Paperclip, Mic, ChevronDown, ChevronUp } from "lucide-react";

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

  // Mock data for each source - updated to use the specified JSON format
  const mockData = {
    'GTM': {
      title: 'Google Tag Manager Data',
      data: [
        {
          "userId": "u_101",
          "eventType": "page_view",
          "properties": { "url": "/products/electronics", "category": "Electronics" },
          "contact": {
            "email": "user101@example.com",
            "phone": "+1234567890",
            "pushToken": "tok_gtm_101"
          },
          "timestamp": 1695800000000,
          "source": "GTM"
        },
        {
          "userId": "u_102",
          "eventType": "click",
          "properties": { "element": "Add to Cart Button", "product": "Wireless Headphones" },
          "contact": {
            "email": "user102@example.com",
            "phone": "+1234567891",
            "pushToken": "tok_gtm_102"
          },
          "timestamp": 1695800100000,
          "source": "GTM"
        }
      ]
    },
    'Facebook Pixel': {
      title: 'Facebook Pixel Data',
      data: [
        {
          "userId": "u_201",
          "eventType": "ViewContent",
          "properties": { "content_name": "Phone Case", "content_category": "Accessories" },
          "contact": {
            "email": "fbuser201@example.com",
            "phone": "+1234567892",
            "pushToken": "tok_fb_201"
          },
          "timestamp": 1695800200000,
          "source": "Facebook Pixel"
        },
        {
          "userId": "u_202",
          "eventType": "AddToCart",
          "properties": { "content_name": "Bluetooth Speaker", "value": 89.99 },
          "contact": {
            "email": "fbuser202@example.com",
            "phone": "+1234567893",
            "pushToken": "tok_fb_202"
          },
          "timestamp": 1695800300000,
          "source": "Facebook Pixel"
        }
      ]
    },
    'Google Ads Tag': {
      title: 'Google Ads Conversion Data',
      data: [
        {
          "userId": "u_301",
          "eventType": "purchase",
          "properties": { "conversion_name": "Purchase", "value": 120.50, "currency": "USD" },
          "contact": {
            "email": "adsuser301@example.com",
            "phone": "+1234567894",
            "pushToken": "tok_ads_301"
          },
          "timestamp": 1695800400000,
          "source": "Google Ads Tag"
        }
      ]
    },
    'Facebook Page': {
      title: 'Facebook Page Insights',
      data: [
        {
          "userId": "u_401",
          "eventType": "page_engagement",
          "properties": { "action": "like", "post_id": "p_123" },
          "contact": {
            "email": "pageuser401@example.com",
            "phone": "+1234567895",
            "pushToken": "tok_page_401"
          },
          "timestamp": 1695800500000,
          "source": "Facebook Page"
        }
      ]
    },
    'Website': {
      title: 'Website Analytics',
      data: [
        {
          "userId": "u_501",
          "eventType": "session_start",
          "properties": { "page": "/home", "referrer": "google.com" },
          "contact": {
            "email": "webuser501@example.com",
            "phone": "+1234567896",
            "pushToken": "tok_web_501"
          },
          "timestamp": 1695800600000,
          "source": "Website"
        },
        {
          "userId": "u_502",
          "eventType": "bounce",
          "properties": { "page": "/products", "time_on_page": 15 },
          "contact": {
            "email": "webuser502@example.com",
            "phone": "+1234567897",
            "pushToken": "tok_web_502"
          },
          "timestamp": 1695800700000,
          "source": "Website"
        }
      ]
    },
    'Shopify': {
      title: 'Shopify Store Data',
      data: [
        {
          "userId": "u_101",
          "eventType": "cart_abandon",
          "properties": { "item": "Shoes", "value": 75 },
          "contact": {
            "email": "jane@example.com",
            "phone": "+8801XXXX",
            "pushToken": "tok_abc"
          },
          "timestamp": 1695800000000,
          "source": "Shopify"
        },
        {
          "userId": "u_602",
          "eventType": "purchase",
          "properties": { "item": "Watch", "value": 199.99 },
          "contact": {
            "email": "shopifyuser602@example.com",
            "phone": "+1234567899",
            "pushToken": "tok_shop_602"
          },
          "timestamp": 1695800900000,
          "source": "Shopify"
        }
      ]
    },
    'CRMs': {
      title: 'CRM Customer Data',
      data: [
        {
          "userId": "u_701",
          "eventType": "lead_create",
          "properties": { "source": "web_form", "interest": "Product Demo" },
          "contact": {
            "email": "crmuser701@example.com",
            "phone": "+1234567800",
            "pushToken": "tok_crm_701"
          },
          "timestamp": 1695801000000,
          "source": "CRMs"
        }
      ]
    },
    'Twitter Page': {
      title: 'Twitter Analytics',
      data: [
        {
          "userId": "u_801",
          "eventType": "tweet_engagement",
          "properties": { "action": "retweet", "tweet_id": "t_456" },
          "contact": {
            "email": "twitteruser801@example.com",
            "phone": "+1234567801",
            "pushToken": "tok_tw_801"
          },
          "timestamp": 1695801100000,
          "source": "Twitter Page"
        }
      ]
    },
    'Review Sites': {
      title: 'Review Site Data',
      data: [
        {
          "userId": "u_901",
          "eventType": "review_submit",
          "properties": { "rating": 5, "platform": "Trustpilot" },
          "contact": {
            "email": "reviewuser901@example.com",
            "phone": "+1234567802",
            "pushToken": "tok_rev_901"
          },
          "timestamp": 1695801200000,
          "source": "Review Sites"
        }
      ]
    },
    'Ad Managers (Meta, Google, Tiktok, etc.)': {
      title: 'Ad Manager Performance',
      data: [
        {
          "userId": "u_1001",
          "eventType": "ad_click",
          "properties": { "campaign": "Summer Sale", "platform": "Meta" },
          "contact": {
            "email": "aduser1001@example.com",
            "phone": "+1234567803",
            "pushToken": "tok_ad_1001"
          },
          "timestamp": 1695801300000,
          "source": "Ad Managers"
        }
      ]
    }
  };

  // State management
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPanelHovered, setIsPanelHovered] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [expandedSource, setExpandedSource] = useState(null);
  const [modalData, setModalData] = useState(null);
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
                  <div 
                    key={source}
                    className={`rounded-md text-sm ${
                      selectedSources.includes(source)
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
                          className={`ml-2 px-2 py-1 rounded text-xs ${
                            selectedSources.includes(source)
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
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                      selectedChannels.includes(channel)
                        ? 'bg-[var(--button-primary)]/20 border border-[var(--button-primary)]/50'
                      : 'bg-[var(--card-background)] border border-[var(--card-border)]'
                    }`}
                  >
                    <span className="text-[var(--foreground)]">{channel}</span>
                    <button
                      onClick={() => toggleChannel(channel)}
                      className={`px-2 py-1 rounded text-xs ${
                        selectedChannels.includes(channel)
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
              <div className="overflow-x-auto">
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