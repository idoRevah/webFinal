import axios from 'axios';
import { Request, Response } from 'express';

export const sendToLLM = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: 'Text is required' });
    return;
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.LLM_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    const error = err as any;
    console.error('Error communicating with LLM API:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to communicate with LLM API' });
  }
};
