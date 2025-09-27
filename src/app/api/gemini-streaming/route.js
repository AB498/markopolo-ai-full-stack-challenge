import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { prompt } = await request.json();
        const apiKey = "AIzaSyCWNitg9VDgrumBz2dA1HXJsQ8G76ALBpA";
        const model = "gemini-2.0-flash";

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    const res = await fetch(
                        `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                contents: [{ role: "user", parts: [{ text: prompt }] }],
                                generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
                            })
                        }
                    );

                    if (!res.ok) throw new Error(await res.text());

                    const reader = res.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = "";

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) { controller.close(); break; }
                        buffer += decoder.decode(value, { stream: true });

                        let startPos = buffer.startsWith('[') ? 1 : 0;

                        while (startPos < buffer.length) {
                            let endPos = -1;
                            for (let i = startPos; i < buffer.length - 1; i++) {
                                if (buffer[i] === '}') {
                                    let j = i + 1;
                                    while (j < buffer.length && /\s/.test(buffer[j])) j++;
                                    if (j < buffer.length && (buffer[j] === ',' || buffer[j] === ']')) {
                                        try {
                                            if (JSON.parse(buffer.substring(startPos, i + 1))) endPos = i;
                                        } catch {}
                                        if (endPos !== -1) break;
                                    }
                                }
                            }

                            if (endPos !== -1) {
                                let jsonStr = buffer.substring(startPos, endPos + 1);
                                try {
                                    const token = JSON.parse(jsonStr)?.candidates?.[0]?.content?.parts?.[0]?.text;
                                    if (token) controller.enqueue(encoder.encode(token));
                                } catch {}

                                let j = endPos + 1;
                                while (j < buffer.length && /[\s,]/.test(buffer[j])) j++;
                                startPos = j;
                            } else {
                                buffer = buffer.substring(startPos);
                                break;
                            }
                        }
                    }
                } catch (error) {
                    controller.error(error);
                }
            }
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Transfer-Encoding': 'chunked',
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
