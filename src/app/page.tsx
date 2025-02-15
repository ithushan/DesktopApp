"use client";

import { useRouter } from "next/navigation";
// import data from "../../data/db.json";
import { useEffect, useState } from "react";
import { Note } from "@/types/main";
import Grid from "@mui/material/Grid";
import { Paper, Container } from "@mui/material";
import NoteCard from "./components/NoteCard";
import Masonry from "react-masonry-css";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Note[] = await res.json();
      setNotes(data);
    } catch (err) {
      setError("Failed to fetch notes");
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    const deleteJson = { id: id };
    fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteJson),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container maxWidth="lg">
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.length > 0 &&
          notes.map((note: Note) => (
            <div key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </div>
          ))}
      </Masonry>
    </Container>
  );
}
