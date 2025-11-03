##Inspiration:

​In today's complex financial world, many people feel overwhelmed by topics like taxes, retirement planning, and investing. Professional financial advice is often expensive and inaccessible. We were inspired by the power of Google's Gemini API to create Finbot, a free, accessible, and user-friendly AI assistant. Our goal was to democratize financial literacy and give everyone a powerful tool to ask complex questions about their financial future in plain English.

##​What it does:

​Finbot is an AI-powered financial management chatbot. It serves as a conversational guide for a wide range of personal finance topics, including:

.​Tax Management: Understanding deductions and filing procedures.
.​Entrepreneurship: Getting advice on starting a new business.
.​Budgeting: Planning for major expenses like education.
.​Long-term Planning: Creating retirement and health insurance plans.
​.Investing: Learning the basic principles of investment.
.​Debt Management: Strategies for handling loans and credit.
​.Users can type any question, and our secure backend passes the query to the Gemini API, which provides a detailed, expert-level response in real-time.

##​How we built it:

​Finbot is built on a modern, serverless stack, chosen for speed and scalability:
​Frontend: A clean and simple interface built with HTML, CSS, and vanilla JavaScript.
​Backend API: A serverless Node.js function running on Express. This single endpoint (/api/chat) securely receives user prompts.
​AI Core: The backend communicates directly with the Google Gemini API (@google/generative-ai SDK) to generate all financial advice. We crafted a detailed system prompt to give Finbot its expert persona.
​Deployment: The entire application is deployed globally using Vercel, with the GitHub repository connected for instant continuous deployment (CI/CD).

##​Challenges we ran into:

​Our biggest challenges were not in building the AI but in configuring the local development and deployment environment. We overcame a long series of complex setup hurdles:
​Environment Setup: We first had to debug local machine issues, including installing Node.js and npm correctly and fixing the Windows PowerShell ExecutionPolicy error that blocked npm commands.
​Vercel CLI Loop: Our biggest blocker was a recursive loop where npm run dev would call vercel dev, which in turn would call npm run dev. This created a "must not recursively invoke itself" error. We fixed this by going into the Vercel project settings and explicitly setting the "Development Command" to be blank, which broke the loop.
​Local Vercel Linking: The local Vercel CLI cached these bad settings. We had to force it to get the new, correct settings by running npx vercel link (and rmdir .vercel at one point) to re-link the project.
​404 Error on Production: After our first successful deployment, the live site showed a 404 NOT_FOUND error. We fixed this by adding a vercel.json configuration file to tell Vercel how to route traffic, properly separating our backend API (/api/chat.js) from our static frontend (index.html).
​Accomplishments that we're proud of
​We are incredibly proud of successfully debugging a complex series of real-world deployment and configuration issues. While the chatbot itself is powerful, our main accomplishment was building a fully functional, secure, and globally deployed web application from scratch. We didn't just build an app; we built the entire pipeline to support it.

##​What we learned:

​We learned that building an AI app is far more than just writing a prompt. The most critical (and difficult) part is the infrastructure. We learned:
​The Importance of .env: Never, ever commit API keys.
​How Vercel Works: We gained a deep understanding of Vercel's build, development, and routing settings.
​How to Debug Systematically: From npm errors to server loops to 404s, we learned how to isolate and fix one problem at a time.
​npx is a lifesaver: It allows you to run local packages like vercel without installing them globally.

##​What's next for Finbot:

​The next step for Finbot is to add memory. We plan to integrate a database (like Firebase Firestore) to allow users to save their conversation history. This would enable Finbot to provide even more personalized advice based on a user's past questions and financial situation, truly becoming a long-term financial companion.
