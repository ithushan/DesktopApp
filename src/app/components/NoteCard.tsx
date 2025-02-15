import React from "react";
import { Note } from "@/types/main";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { blue, green, pink, yellow } from "@mui/material/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note: Note) => {
      if (note.category === "work") {
        return yellow[700];
      }
      if (note.category === "money") {
        return green[500];
      }
      if (note.category === "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
  test: {
    border: (note: Note) => {
      if (note.category === "work") {
        return "1px solid red";
      }
    },
  },
});

function NoteCard({
  note,
  handleDelete,
}: {
  note: Note;
  handleDelete: (id: number) => void;
}) {
  const classes = useStyles(note);
  
  return (
    <Card elevation={3}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {note.category[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton onClick={() => handleDelete(note.id)}>
            <DeleteOutline />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NoteCard;
