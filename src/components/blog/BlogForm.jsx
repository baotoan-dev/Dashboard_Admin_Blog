import { Box, TextField, Button, Stack } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useMemo } from 'react';
import { uploadFile } from '../../api/upload';
import { useCallback } from 'react';

function BlogForm({ form, onChange, onSubmit }) {
  const quillRef = useRef();

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        uploadFile(file).then((url) => {
          const quill = quillRef.current.getEditor();
          let range = quill.getSelection();
          if (!range) {
            range = { index: quill.getLength(), length: 0 };
          }
          quill.insertEmbed(range.index, 'image', url);

          const newContent = quill.root.innerHTML;
          onChange('content', newContent);
        });
      }
    };
  }, [onChange]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler],
  );

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Stack spacing={1.5}>
        <TextField
          label="Title"
          name="title"
          value={form.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          required
          fullWidth
        />
        <Box sx={{ '.ql-container': { minHeight: 100 } }}>
          <ReactQuill
            ref={quillRef}
            value={form.content || ''}
            theme="snow"
            placeholder="Write your blog content here..."
            onChange={(content, delta, source, editor) => {
              onChange('content', editor.getHTML());
            }}
            modules={modules}
          />
        </Box>
        <TextField
          label="Image URL"
          name="image"
          value={form.image || ''}
          onChange={(e) => onChange('image', e.target.value)}
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
