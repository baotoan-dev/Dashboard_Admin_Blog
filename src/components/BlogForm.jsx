import { Box, TextField, Button, Stack } from '@mui/material';

function BlogForm({ form, onChange, onSubmit }) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={onChange}
          required
          fullWidth
        />
        <TextField
          label="Content"
          name="content"
          value={form.content}
          onChange={onChange}
          required
          fullWidth
          multiline
          rows={6}
        />
        <TextField
          label="Image URL"
          name="image"
          value={form.image}
          onChange={onChange}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
}

export default BlogForm;
