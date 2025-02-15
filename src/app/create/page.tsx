"use client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
  Radio,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import file from '../../api/notes.ts';

export default function Create() {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("todos");

  const router = useRouter();
 

  const CategoryRadioVlues = [
    { value: "money", label: "Money" },
    { value: "todos", label: "Todos" },
    { value: "reminders", label: "Reminders" },
    { value: "work", label: "Work" },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (title && details && category) {
      const newNote = { title, details, category, id: Date.now() };
      fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          router.push("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Container>
      <Typography variant="h6" component={"h2"} color="gary">
        Create New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          error={titleError}
          onFocus={() => setTitleError(false)}
          sx={{ marginTop: 3, marginBottom: 3, display: "block" }}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          sx={{ marginTop: 3, marginBottom: 3, display: "block" }}
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          error={detailsError}
          onFocus={() => setDetailsError(false)}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
        />
        <FormControl sx={{ marginTop: 3, marginBottom: 3, display: "block" }}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CategoryRadioVlues.map((radio, index) => (
              <FormControlLabel
                key={index}
                value={radio.value}
                label={radio.label}
                control={<Radio color="secondary" />}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          size="large"
          startIcon={<SendIcon />}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
