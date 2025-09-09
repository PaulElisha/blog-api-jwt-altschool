import AiService from "../services/AiService.js";

class AiController {
    constructor() {
        this.aiService = new AiService();
    }

    generateBlogSummary = async (req, res) => {
        const { content } = req.body;
        try {
            const summary = await this.aiService.generateBlogSummary(content);
            res.status(200).json({ message: "Blog summary generated successfully", status: "ok", data: summary });
        } catch (error) {
            console.error("Error generating blog summary:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    generateBlog = async (req, res) => {
        const { title, tone } = req.body;
        try {
            const blog = await this.aiService.generateBlog({ title, tone });
            res.status(200).json({ message: "Blog generated successfully", status: "ok", data: blog });
        } catch (error) {
            console.error("Error generating blog:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    generateBlogIdeas = async (req, res) => {
        const { topic } = req.body;
        try {
            const ideas = await this.aiService.generateBlogIdeas(topic);
            res.status(200).json({ message: "Blog ideas generated successfully", status: "ok", data: ideas });
        } catch (error) {
            console.error("Error generating blog ideas:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }
}

export { AiController };