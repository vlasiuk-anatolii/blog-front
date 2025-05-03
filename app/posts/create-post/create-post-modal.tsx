import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { usePosts } from "../../store/usePosts";

const styles = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

interface CreatePostModalProps {
	open: boolean;
	onClose: () => void;
	initialData?: { title?: string; content?: string; urlImg?: string; id?: number };
}

export default function CreatePostModal({
	open,
	onClose,
	initialData,
}: CreatePostModalProps) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [urlImg, setUrlImg] = useState("");
	const [error, setError] = useState<{
		title?: string;
		content?: string;
		urlImg?: string;
	} | null>(null);

	const { createNewPost, updateExistingPost, loadPosts } = usePosts();

	useEffect(() => {
		if (initialData) {
			setTitle(initialData.title || "");
			setContent(initialData.content || "");
			setUrlImg(initialData.urlImg || "");
		}
	}, [initialData]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		if (!title || !content || !urlImg) {
			setError({
				...(title ? {} : { title: "Title is required" }),
				...(content ? {} : { content: "Content is required" }),
				...(urlImg ? {} : { urlImg: "URL image is required" }),
			});
			return;
		}

		try {
			if (initialData) {
				if (initialData.id !== undefined) {
					await updateExistingPost({ id: initialData.id, title, content, urlImg });
					loadPosts();
				} else {
					throw new Error("Post ID is required for updating.");
				}
			} else {
				await createNewPost({ title, content, urlImg });
			}
			handleClose();
		} catch (err: unknown) {
			setError({
				urlImg:
					(err as { message?: string })?.message ||
					"Error creating or updating post",
			});
		}
	};

	const handleClose = () => {
		setTitle("");
		setContent("");
		setUrlImg("");
		setError(null);
		onClose();
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={styles}>
				<form onSubmit={handleSubmit} className="w-full max-w-xs">
					<Stack spacing={2}>
						<TextField
							name="title"
							label="Title"
							variant="outlined"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							helperText={error?.title}
							error={!!error?.title}
						/>
						<TextField
							name="content"
							label="Content"
							variant="outlined"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							helperText={error?.content}
							error={!!error?.content}
						/>
						<TextField
							name="urlImg"
							label="URLImg"
							variant="outlined"
							value={urlImg}
							onChange={(e) => setUrlImg(e.target.value)}
							helperText={error?.urlImg}
							error={!!error?.urlImg}
						/>
						<Button type="submit" variant="contained">
							{initialData ? "Update post" : "Create a post"}
						</Button>
					</Stack>
				</form>
			</Box>
		</Modal>
	);
}
