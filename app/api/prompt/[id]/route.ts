import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read)
export const GET = async (request: NextApiRequest, { params }: { params: any }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response('Prompt not found', { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 });
    }
}

// PATCH (update)
export const PATCH = async (request: NextApiRequest, { params }: { params: any }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response('Prompt not found', { status: 404 });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        
        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
}

// DELETE (delete)
export const DELETE = async (request: NextApiRequest, { params }: { params: any }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findOneAndDelete({ _id: params.id });

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
}