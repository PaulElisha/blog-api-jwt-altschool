import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

class BlogService {

    generateBlogSummary = async (content) => {
        if (!content) {
            const error = new Error('Content is required to generate a summary');
            error.statusCode = 400;
            throw error;
        }

        const prompt = `Provide a succinct yet detailed summary of the content: ${content.substring(0, 100)}...`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt
        });
        const summary = response.text.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim();

        return JSON.parse(summary);
    }

    generateBlog = async ({ title, tone }) => {
        if (!title) {
            const error = new Error('Title is required to generate blog ideas');
            error.statusCode = 400;
            throw error;
        }

        const prompt = `Write a mark-down formatted blog post titled ${title}. Use a ${tone} tone. 
        Include an introduction, sub-headings, code examples if relevant, and a conclusion.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt
        });
        const blog = response.text;
        return blog;
    }

    generateBlogIdeas = async (topic) => {
        if (!topic) {
            const error = new Error('Topic is required to generate blog ideas');
            error.statusCode = 400;
            throw error;
        }

        const prompt = `Generate a list of 5 blog post ideas related to ${topic}. 
        For each blog post idea, provide:
        - a title,
        - a description about the post,
        - 3 relevant tags,
        - the tone (e.g. beginner-friendly, technical or casual).
        
        Return the result as an araay of JSON objects in this format:
        
        [
            {
                "title": "",
                "description": "",
                "tags": [],
                "tone": ""
            }
        ]

        Ensure the JSON is properly formatted and valid.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt
        });
        const ideas = response.text.split('\n').filter(idea => idea.trim() !== '').replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim();
        return JSON.parse(ideas);
    }
}

export default BlogService 