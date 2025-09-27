# Next.js Streaming Demo

This demo showcases three different types of streaming in a Next.js application:

1. **Server-Side Streaming**: Demonstrates how to implement streaming responses from Next.js API routes using ReadableStream
2. **Client-Side Real-time Response**: Shows how to handle real-time data on the client-side using JavaScript intervals
3. **Gemini API Streaming**: Illustrates how to connect to and stream responses from the Gemini API

## Features

### Server-Side Streaming
- Uses Next.js API routes with ReadableStream
- Simulates processing data in chunks
- Demonstrates how to send incremental updates to the client

### Client-Side Real-time Handling
- Uses JavaScript intervals to simulate real-time data arrival
- Shows how to update the UI incrementally
- Demonstrates client-side streaming without server dependency

### Gemini API Streaming
- **Now connects to the real Gemini API** for authentic streaming responses
- Demonstrates parsing of streaming responses from Google's API
- Includes error handling and proper stream closure

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000/streaming-demo` to see the demo

## Implementation Details

### Server-Side Streaming Implementation

The server-side streaming is implemented using Next.js API routes that return a `ReadableStream`. This allows the server to send data chunks as they become available, rather than waiting for the entire response to be ready.

Key components:
- `/src/app/api/streaming-demo/route.js` - Server-side streaming API route
- `/src/app/streaming-demo/page.js` - Client-side component that consumes the stream

### Client-Side Real-time Handling

The client-side implementation uses JavaScript intervals to simulate real-time data arrival. This approach is useful for scenarios where data is generated on the client-side or received through other means.

### Gemini API Streaming

The Gemini API streaming implementation now connects to Google's actual Gemini API and streams responses in real-time. The implementation:

1. Uses the same API key as the main application
2. Connects to `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent`
3. Processes the streaming response chunk by chunk
4. Extracts text content from the response and sends it to the client

Example of the actual Gemini API connection:

```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent?key=${apiKey}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  }
);
```

## Benefits of Streaming

1. **Improved perceived performance** - Users see results immediately
2. **Better user experience** - No need to wait for complete responses
3. **Efficient resource usage** - Data is processed as it arrives
4. **Real-time updates** - Perfect for chat, feeds, and live data

## File Structure

```
/src/app/streaming-demo/
  page.js                  # Main demo page component
/src/app/api/
  /streaming-demo/
    route.js               # Server-side streaming API route
  /gemini-streaming/
    route.js               # Gemini API streaming route
```