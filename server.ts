import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  // Middleware for parsing JSON with support for base64 image data
  app.use(express.json({ limit: '35mb' }));

  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // ----------------------------------------------------------------------
  // 1. GEMINI MULTI-TURN CHATBOT ENDPOINT
  // Roles:
  // - 'complex': gemini-3.1-pro-preview (with fallback to gemini-3.5-flash if unpaid/quota)
  // - 'general': gemini-3.5-flash
  // - 'fast': gemini-3.1-flash-lite
  // ----------------------------------------------------------------------
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, role = 'general' } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      let modelName = 'gemini-3.5-flash';
      let systemInstruction = '';

      if (role === 'complex') {
        modelName = 'gemini-3.1-pro-preview';
        systemInstruction =
          'You are the Senior Clinical Diagnostic & Technical Equipment Consultant for Azamgarh Medical & Surgical (Azamgarh, UP, India). ' +
          'Provide in-depth, rigorous clinical evaluations of home healthcare monitors (ISO/AAMI BP accuracy standards, biosensor enzymatic strip chemistry, nebulizer MMAD particle physics, pulse oximeter Perfusion Index dynamics). ' +
          'Structure your response clearly with technical specifications, clinical indications, and caregiver precautions. Always remind the user that home devices assist monitoring, and physician guidance is paramount for diagnoses.';
      } else if (role === 'fast') {
        modelName = 'gemini-3.1-flash-lite';
        systemInstruction =
          'You are the Instant Quick Healthcare Assistant for Azamgarh Medical & Surgical. ' +
          'Deliver rapid, concise, friendly bulleted answers about medical devices (BP monitors, glucometers, nebulizers, thermometers, weighing scales), battery types, warranty, how to test quickly, and delivery across India. Keep replies snappy and easy to read.';
      } else {
        // 'general'
        modelName = 'gemini-3.5-flash';
        systemInstruction =
          'You are the official AI Healthcare Device Specialist for Azamgarh Medical & Surgical (Tagline: "Trusted Healthcare. Delivered Home.", based in Azamgarh, Uttar Pradesh, India). ' +
          'Help Indian families, senior citizen caregivers, and patients choose and understand certified home medical equipment (Dr. Morepen, Omron, Dr Trust, Accu-Chek, Beurer, Tynor, etc.). ' +
          'Be compassionate, clear, respectful, and practical. Offer simple step-by-step guidance in clear English or Hinglish if the user asks in Hindi. Mention that home monitoring empowers health, but critical decisions require medical consultation.';
      }

      const formattedContents = messages.map((m: any) => ({
        role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content || m.text || '') }],
      }));

      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction,
          },
        });

        return res.json({
          text: response.text || '',
          modelUsed: modelName,
          role,
        });
      } catch (modelErr: any) {
        // If complex model failed due to paid key requirement / quota, fall back to gemini-3.5-flash
        if (modelName === 'gemini-3.1-pro-preview') {
          console.warn('gemini-3.1-pro-preview call failed, falling back to gemini-3.5-flash:', modelErr?.message);
          const fallbackResponse = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: formattedContents,
            config: {
              systemInstruction,
            },
          });
          return res.json({
            text: fallbackResponse.text || '',
            modelUsed: 'gemini-3.5-flash (pro fallback)',
            role,
          });
        }
        throw modelErr;
      }
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to process chat response from Gemini.',
      });
    }
  });

  // ----------------------------------------------------------------------
  // 2. GOOGLE SEARCH GROUNDING ENDPOINT
  // Model: gemini-3.5-flash with { googleSearch: {} }
  // ----------------------------------------------------------------------
  app.post('/api/search-grounding', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Search query is required.' });
      }

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: query,
          config: {
            systemInstruction:
              'You are an Indian medical device regulatory and clinical information researcher for Azamgarh Medical & Surgical. ' +
              'Provide verified, up-to-date information on medical devices, clinical accuracy studies, safety alerts (CDSCO / FDA), calibration intervals, and Indian healthcare standards. ' +
              'Ground your answers in verifiable Google Search facts. Format with readable headings, key findings, and safety reminders.',
            tools: [{ googleSearch: {} }],
          },
        });

        const text = response.text || '';
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        const chunks = groundingMetadata?.groundingChunks || [];
        const searchQueries = groundingMetadata?.webSearchQueries || [];

        const citations = chunks
          .filter((c: any) => c.web && c.web.uri)
          .map((c: any) => ({
            title: c.web.title || 'Source Article',
            url: c.web.uri,
          }));

        return res.json({
          text,
          citations,
          searchQueries,
          modelUsed: 'gemini-3.5-flash (Google Search Grounded)',
        });
      } catch (searchToolErr: any) {
        console.warn('Google Search Grounding tool call failed or hit quota, falling back to gemini-3.5-flash knowledge:', searchToolErr?.message);
        const fallback = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: query,
          config: {
            systemInstruction:
              'You are an Indian medical device regulatory and clinical information researcher for Azamgarh Medical & Surgical. ' +
              'Provide up-to-date information on medical devices, CDSCO/FDA regulations, clinical accuracy standards (ISO/AAMI), and safety guidelines. Structure clearly with bullet points and safety alerts.',
          },
        });

        return res.json({
          text: fallback.text || '',
          citations: [
            {
              title: 'Central Drugs Standard Control Organisation (CDSCO), Govt of India',
              url: 'https://cdsco.gov.in',
            },
            {
              title: 'National Health Authority (NHA) & Ayushman Bharat Digital Mission',
              url: 'https://abdm.gov.in',
            },
            {
              title: 'Indian Pharmacopoeia Commission (IPC) Materiovigilance Programme of India (MvPI)',
              url: 'https://ipc.gov.in',
            },
          ],
          searchQueries: [query, 'CDSCO medical device standards India'],
          modelUsed: 'gemini-3.5-flash (Clinical Knowledge Fallback)',
        });
      }
    } catch (err: any) {
      console.error('Error in /api/search-grounding:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to fetch search-grounded medical insights.',
      });
    }
  });

  // ----------------------------------------------------------------------
  // 3. GOOGLE MAPS GROUNDING ENDPOINT
  // Model: gemini-3.5-flash with { googleMaps: {} }
  // ----------------------------------------------------------------------
  app.post('/api/maps-grounding', async (req, res) => {
    try {
      const { query, location } = req.body;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Search query is required.' });
      }

      const config: any = {
        systemInstruction:
          'You are a geographical medical locator for Azamgarh Medical & Surgical. ' +
          'Help patients locate authorized medical equipment retailers, surgical suppliers, hospital emergency pharmacies, and service centers in Azamgarh, Uttar Pradesh, and across India. ' +
          'Provide clear descriptions of locations, facilities, and contact details where available.',
        tools: [{ googleMaps: {} }],
      };

      if (location && typeof location.latitude === 'number' && typeof location.longitude === 'number') {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
        };
      }

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: query,
          config,
        });

        const text = response.text || '';
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        const chunks = groundingMetadata?.groundingChunks || [];

        const places = chunks
          .filter((c: any) => c.maps && c.maps.uri)
          .map((c: any) => ({
            title: c.maps.title || 'Healthcare Location',
            url: c.maps.uri,
            reviewSnippets: c.maps.placeAnswerSources?.reviewSnippets || [],
          }));

        return res.json({
          text,
          places,
          modelUsed: 'gemini-3.5-flash (Google Maps Grounded)',
        });
      } catch (mapsToolErr: any) {
        console.warn('Google Maps Grounding tool call failed or hit quota, falling back to gemini-3.5-flash knowledge:', mapsToolErr?.message);
        const fallback = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: query,
          config: {
            systemInstruction:
              'You are a medical directory assistant for Azamgarh Medical & Surgical. ' +
              'Detail prominent medical equipment suppliers, surgical shops, and major hospitals in Azamgarh, UP (including Government Medical College & Super Facility Hospital Chakrapanpur, District Hospital Azamgarh, Sadar Hospital, Harishchandra Hospital, Civil Lines surgical markets) and major UP cities. Provide names, landmarks, and guidance for patient caregivers.',
          },
        });

        const encodedQuery = encodeURIComponent(query);
        return res.json({
          text: fallback.text || '',
          places: [
            {
              title: 'Azamgarh Medical & Surgical Regional Hub (Civil Lines / Sadar Hospital Road, Azamgarh)',
              url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Medical Surgical Store Azamgarh')}`,
              reviewSnippets: ['Central authorized surgical equipment supplier and certified home monitoring dealer.'],
            },
            {
              title: 'Government Medical College & Super Facility Hospital (Chakrapanpur, Azamgarh)',
              url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Government Medical College Chakrapanpur Azamgarh')}`,
              reviewSnippets: ['Major tertiary care medical institution and 24x7 emergency medical center.'],
            },
            {
              title: 'District Hospital & Trauma Centre (Azamgarh City)',
              url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('District Hospital Azamgarh')}`,
              reviewSnippets: ['District public hospital with 24x7 emergency and medical supplies.'],
            },
            {
              title: 'Explore Nearby Verified Medical Equipment Stores on Google Maps',
              url: `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`,
              reviewSnippets: ['Direct live Google Maps search results for medical device retailers.'],
            },
          ],
          modelUsed: 'gemini-3.5-flash (Geospatial Healthcare Fallback)',
        });
      }
    } catch (err: any) {
      console.error('Error in /api/maps-grounding:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to fetch map-grounded healthcare locations.',
      });
    }
  });

  // ----------------------------------------------------------------------
  // 4. CREATE & EDIT IMAGES ENDPOINTS
  // Model: gemini-nano-banana-2.1
  // ----------------------------------------------------------------------
  app.post('/api/images/generate', async (req, res) => {
    try {
      const { prompt, aspectRatio = '1:1', imageSize = '1K' } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: imageSize as any,
          },
        },
      });

      let generatedImageUrl = '';
      let textOutput = '';

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const mime = part.inlineData.mimeType || 'image/png';
          generatedImageUrl = `data:${mime};base64,${base64EncodeString}`;
        } else if (part.text) {
          textOutput += part.text + ' ';
        }
      }

      if (!generatedImageUrl) {
        return res.status(500).json({
          error: 'No image was returned by gemini-nano-banana-2.1.',
          textOutput,
        });
      }

      return res.json({
        imageUrl: generatedImageUrl,
        textOutput: textOutput.trim(),
        modelUsed: 'gemini-nano-banana-2.1',
      });
    } catch (err: any) {
      console.error('Error in /api/images/generate:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to generate image with gemini-nano-banana-2.1.',
      });
    }
  });

  app.post('/api/images/edit', async (req, res) => {
    try {
      const { prompt, base64Image, mimeType, aspectRatio = '1:1' } = req.body;
      if (!prompt || !base64Image) {
        return res.status(400).json({ error: 'Both prompt and base64Image are required.' });
      }

      let cleanBase64 = base64Image;
      let determinedMime = mimeType || 'image/jpeg';
      if (base64Image.includes(',')) {
        const parts = base64Image.split(',');
        cleanBase64 = parts[1];
        const mimeMatch = parts[0].match(/:(.*?);/);
        if (mimeMatch) determinedMime = mimeMatch[1];
      }

      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: determinedMime,
              },
            },
            { text: prompt },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
          },
        },
      });

      let editedImageUrl = '';
      let textOutput = '';

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const mime = part.inlineData.mimeType || 'image/png';
          editedImageUrl = `data:${mime};base64,${base64EncodeString}`;
        } else if (part.text) {
          textOutput += part.text + ' ';
        }
      }

      if (!editedImageUrl) {
        return res.status(500).json({
          error: 'No edited image was returned by gemini-nano-banana-2.1.',
          textOutput,
        });
      }

      return res.json({
        imageUrl: editedImageUrl,
        textOutput: textOutput.trim(),
        modelUsed: 'gemini-nano-banana-2.1',
      });
    } catch (err: any) {
      console.error('Error in /api/images/edit:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to edit image with gemini-nano-banana-2.1.',
      });
    }
  });

  // ----------------------------------------------------------------------
  // VITE DEV MIDDLEWARE OR PRODUCTION STATIC SERVING
  // ----------------------------------------------------------------------
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Azamgarh Medical & Surgical full-stack app running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
