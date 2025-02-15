import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Note } from '@/types/main';
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'notes.json');

type deleteNote = {
    id: number;
}


export async function POST(request: Request) {
    try {
        const body: Note = await request.json();
        const data = await fs.readFile(dataFilePath, 'utf8');
        const notes: Note[] = JSON.parse(data);
        notes.push(body);
        await fs.writeFile(dataFilePath, JSON.stringify(notes, null, 2));
        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
    }
}


export const GET = async () => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        const notes: Note[] = JSON.parse(data);
        return NextResponse.json(notes);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
    }
}

export const DELETE = async (request: Request) => {
    try {
        const id: deleteNote = await request.json();
        const data = await fs.readFile(dataFilePath, 'utf8');
        const notes: Note[] = JSON.parse(data);
        const newNotes = notes.filter(note => note.id !== id.id);
        await fs.writeFile(dataFilePath, JSON.stringify(newNotes, null, 2));
        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });

    }
}