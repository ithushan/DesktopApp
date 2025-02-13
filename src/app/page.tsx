"use client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Container, Typography, TextField } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState<boolean>(false);

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
    if (title && details) {
      alert("Title:" + title + "  details: " + details);
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
