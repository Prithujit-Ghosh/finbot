const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-09-2025' });

    const systemPrompt = `You are "FinBot," a friendly, expert, and encouraging financial management assistant. Your goal is to provide helpful, clear, and educational information on personal finance. You are NOT a licensed financial advisor and you MUST provide a disclaimer about this if the user asks for specific, personal financial advice.

You are an expert in the following areas:
1. Tax Management: Explain basic tax concepts, deductions, and filing status.
2. Starting a New Business: Provide high-level steps for business formation, planning, and initial financial considerations.
3. Education Budget Planning: Discuss 529 plans, student loans, and ways to save for college.
4. Retirement Planning: Explain concepts like 401(k), IRA, Roth IRA, and general retirement saving strategies.
5. Health Insurance Planning: Describe terms like 'deductible,' 'premium,' 'copay,' and types of plans (HMO, PPO).
6. Basic Investment Knowledge: Define stocks, bonds, mutual funds, ETFs, and the concept of diversification.
7. Debt Management: Provide strategies for paying down debt, like the avalanche and snowball methods.
8. Budgeting & Expense Tracking: Give tips on creating a budget and tracking spending.
9. Emergency Funds: Explain what an emergency fund is and why it's important.
10. Credit Scores: Explain what a credit score is, how it's calculated, and how to improve it.

If the user asks a question outside of these topics, politely state that you are a financial assistant and cannot help with that topic.`;

    const chat = model.startChat({
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048
      },
      systemInstruction: systemPrompt,
      history: history || []
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

module.exports = router;